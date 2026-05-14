import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from './AuthContext';
import apiClient from '../services/apiClient';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);


export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastDataUpdate, setLastDataUpdate] = useState(Date.now());
  const connectionRef = useRef(null);

  // -----------------------------
  // Fetch notifications (REST API)
  // -----------------------------
  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get('/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // -----------------------------
  // SignalR Connection
  // -----------------------------
  useEffect(() => {
    let isMounted = true;

    if (!user) {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
      return;
    }

    const startConnection = async () => {
      try {
        if (!connectionRef.current) {
          const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('/api/hubs/notifications', {
              accessTokenFactory: () => localStorage.getItem('accessToken')
            })
            .withAutomaticReconnect()
            .build();

          newConnection.on('ReceiveNotification', (notification) => {
            if (!isMounted) return;
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
            setLastDataUpdate(Date.now());

            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
              new Notification(notification.title, {
                body: notification.message
              });
            }
          });

          newConnection.on('DataChanged', () => {
            if (!isMounted) return;
            setLastDataUpdate(Date.now());
          });

          connectionRef.current = newConnection;
        }

        const conn = connectionRef.current;

        if (conn.state === signalR.HubConnectionState.Disconnected) {
          await conn.start();
          if (isMounted) {
            console.log('Connected to SignalR Notification Hub');
          }
        }
      } catch (error) {
        // Ignore AbortError caused by React Strict Mode or fast unmounting
        if (error.name === 'AbortError' || error.message?.includes('stopped during negotiation')) {
          return;
        }
        console.error('SignalR Connection Error:', error);
      }
    };

    startConnection();

    return () => {
      isMounted = false;
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, [user]);

  // -----------------------------
  // Actions
  // -----------------------------
  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.put('/notifications/read-all');

      setNotifications(prev =>
        prev.map(n => ({ ...n, is_read: true }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
        lastDataUpdate
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};