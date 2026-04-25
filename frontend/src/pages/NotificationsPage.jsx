import React, { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
// If the above fails, Vite might need a cache clear.

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getTypeStyles = (type) => {
    switch (type) {
      case 'Success': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Warning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Error': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Success': return 'check_circle';
      case 'Warning': return 'warning';
      case 'Error': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-[#e9f9ff] pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-headline font-black text-[#00343e] mb-2">Notifications</h1>
            <p className="text-[#2c6370] font-medium">
              You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-[#00656f] font-bold text-sm hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white/50 border border-cyan-100/50 rounded-[2rem] p-20 text-center">
              <span className="material-symbols-outlined text-6xl text-cyan-200 mb-4">notifications_off</span>
              <p className="text-[#2c6370] font-medium">All quiet here! We'll notify you when something happens.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => !notif.is_read && markAsRead(notif.id)}
                className={`group relative p-6 rounded-[2rem] border transition-all cursor-pointer ${
                  notif.is_read 
                    ? 'bg-white/40 border-cyan-100/30' 
                    : 'bg-white border-cyan-200 shadow-lg scale-[1.01]'
                }`}
              >
                <div className="flex gap-6 items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${getTypeStyles(notif.type)}`}>
                    <span className="material-symbols-outlined">{getIcon(notif.type)}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-bold ${notif.is_read ? 'text-[#2c6370]' : 'text-[#00343e]'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-[#5c8a95] font-medium">
                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className={`leading-relaxed ${notif.is_read ? 'text-[#5c8a95]' : 'text-[#2c6370]'}`}>
                      {notif.message}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <div className="absolute top-6 right-6 w-2 h-2 bg-[#00656f] rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
