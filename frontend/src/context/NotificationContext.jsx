import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuth } from './AuthContext';
import apiClient from '../services/apiClient';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connection, setConnection] = useState(null);
  const [lastDataUpdate, setLastDataUpdate] = useState(Date.now());

  // Fetch initial notifications
  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get('/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // SignalR Connection
  useEffect(() => {
    if (user) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl('/hubs/notifications', {
          accessTokenFactory: () => localStorage.getItem('accessToken')
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    } else {
      if (connection) {
        connection.stop();
        setConnection(null);
      }
    }
  }, [user]);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to SignalR Notification Hub');
          
          connection.on('ReceiveNotification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
            
            // Trigger a data refresh for components listening to real-time changes
            setLastDataUpdate(Date.now());

            if (Notification.permission === 'granted') {
              new Notification(notification.title, { body: notification.message });
            }
          });

          // Specific data-change events if the backend supports them separately
          connection.on('DataChanged', () => {
            setLastDataUpdate(Date.now());
          });
        })
        .catch(error => console.error('SignalR Connection Error: ', error));

      return () => {
        connection.off('ReceiveNotification');
        connection.off('DataChanged');
        connection.stop();
      };
    }
  }, [connection]);

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
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      fetchNotifications,
      lastDataUpdate
    }}>
      {children}
    </NotificationContext.Provider>
  );

};
