'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Bell, X, Check } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'order' | 'driver' | 'system';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

// Mock notifications - nanti bisa diganti dengan real data dari Firestore
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order',
    message: 'Order #1234 from Ahmad',
    time: new Date(Date.now() - 5 * 60000), // 5 mins ago
    read: false,
  },
  {
    id: '2',
    type: 'driver',
    title: 'Driver Status',
    message: 'Driver Fatima is now available',
    time: new Date(Date.now() - 15 * 60000), // 15 mins ago
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'Dashboard updated successfully',
    time: new Date(Date.now() - 60 * 60000), // 1 hour ago
    read: true,
  },
];

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'driver':
        return '🚗';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notifications Panel */}
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        !notif.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm">{notif.title}</p>
                            {!notif.read && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatRelativeTime(notif.time)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t text-center">
                <button className="text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}