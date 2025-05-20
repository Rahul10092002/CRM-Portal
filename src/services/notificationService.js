import { simulateDelay, generateId, createResponse } from './api';

// In-memory store for notifications
let notifications = [
  {
    id: '1',
    type: 'lead',
    message: 'New lead assigned to you: John Doe',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    relatedId: '1'
  },
  {
    id: '2',
    type: 'site-visit',
    message: 'Upcoming site visit with Sarah Smith tomorrow at 2 PM',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    relatedId: '3'
  },
  {
    id: '3',
    type: 'project',
    message: 'Project "Horizon Heights" status updated to "In Progress"',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    relatedId: '2'
  },
  {
    id: '4',
    type: 'document',
    message: 'New document uploaded: Floor Plan - Tower A',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    relatedId: '1'
  },
  {
    id: '5',
    type: 'lead',
    message: 'Follow-up reminder: Call Michael Johnson',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    relatedId: '5'
  }
];

// Get all notifications
export const getAllNotifications = async () => {
  await simulateDelay();
  return createResponse(notifications);
};

// Get unread notifications
export const getUnreadNotifications = async () => {
  await simulateDelay();
  const unread = notifications.filter(notification => !notification.isRead);
  return createResponse(unread);
};

// Mark notification as read
export const markAsRead = async (id) => {
  await simulateDelay();
  
  const notification = notifications.find(n => n.id === id);
  
  if (!notification) {
    return createResponse(null, false, 'Notification not found');
  }
  
  notification.isRead = true;
  return createResponse(notification);
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  await simulateDelay();
  
  notifications = notifications.map(notification => ({
    ...notification,
    isRead: true
  }));
  
  return createResponse(notifications);
};

// Create a new notification
export const createNotification = async (notificationData) => {
  await simulateDelay();
  
  const newNotification = {
    id: generateId(),
    isRead: false,
    createdAt: new Date().toISOString(),
    ...notificationData
  };
  
  notifications.unshift(newNotification); // Add to the beginning of the array
  return createResponse(newNotification);
};

// Delete a notification
export const deleteNotification = async (id) => {
  await simulateDelay();
  
  const initialLength = notifications.length;
  notifications = notifications.filter(notification => notification.id !== id);
  
  if (notifications.length === initialLength) {
    return createResponse(null, false, 'Notification not found');
  }
  
  return createResponse({ id }, true, 'Notification deleted successfully');
};

// Simulate push notification (for polling)
export const pollNewNotifications = async (lastCheckedTime) => {
  await simulateDelay();
  
  // 20% chance of getting a new notification when polling
  const shouldCreateNew = Math.random() < 0.2;
  
  if (shouldCreateNew) {
    const notificationTypes = ['lead', 'site-visit', 'project', 'document'];
    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    let message = '';
    switch (randomType) {
      case 'lead':
        message = 'New lead created: Potential client from website';
        break;
      case 'site-visit':
        message = 'Site visit rescheduled for next week';
        break;
      case 'project':
        message = 'Project milestone completed: Foundation work';
        break;
      case 'document':
        message = 'Contract document needs your review';
        break;
      default:
        message = 'New notification';
    }
    
    const newNotification = {
      id: generateId(),
      type: randomType,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      relatedId: Math.floor(Math.random() * 10 + 1).toString()
    };
    
    notifications.unshift(newNotification);
    return createResponse([newNotification]);
  }
  
  return createResponse([]);
};
