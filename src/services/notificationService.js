import { simulateLatency } from "./api";
import { mockNotifications } from "./mockData";

// In-memory store for notifications
let notifications = [mockNotifications];
// Get all notifications
const createResponse = (data) => ({
  status: 200,
  data,
  message: "Success",
});

let nextNotificationId = notifications.length + 1;
export const getAllNotifications = async () => {
  await simulateLatency();
  return createResponse(notifications);
};

// Get unread notifications
export const getUnreadNotifications = async () => {
  await simulateLatency();
  const unread = notifications.filter((notification) => !notification.isRead);
  return createResponse(unread);
};

// Mark notification as read
export const markAsRead = async (id) => {
  await simulateLatency();

  const notification = notifications.find((n) => n.id === id);

  if (!notification) {
    return createResponse(null, false, "Notification not found");
  }

  notification.isRead = true;
  return createResponse(notification);
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  await simulateLatency();

  notifications = notifications.map((notification) => ({
    ...notification,
    isRead: true,
  }));

  return createResponse(notifications);
};

// Create a new notification
export const createNotification = async (notificationData) => {
  await simulateLatency();

  const newNotification = {
    id: nextNotificationId,
    isRead: false,
    createdAt: new Date().toISOString(),
    ...notificationData,
  };

  notifications.unshift(newNotification); // Add to the beginning of the array
  return createResponse(newNotification);
};

// Delete a notification
export const deleteNotification = async (id) => {
  await simulateLatency();

  const initialLength = notifications.length;
  notifications = notifications.filter(
    (notification) => notification.id !== id
  );

  if (notifications.length === initialLength) {
    return createResponse(null, false, "Notification not found");
  }

  return createResponse({ id }, true, "Notification deleted successfully");
};

// Simulate push notification (for polling)
export const pollNewNotifications = async () => {
  await simulateLatency();

  // 20% chance of getting a new notification when polling
  const shouldCreateNew = Math.random() < 0.2;

  if (shouldCreateNew) {
    const notificationTypes = ["lead", "site-visit", "project", "document"];
    const randomType =
      notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

    let message = "";
    switch (randomType) {
      case "lead":
        message = "New lead created: Potential client from website";
        break;
      case "site-visit":
        message = "Site visit rescheduled for next week";
        break;
      case "project":
        message = "Project milestone completed: Foundation work";
        break;
      case "document":
        message = "Contract document needs your review";
        break;
      default:
        message = "New notification";
    }

    const newNotification = {
      id: nextNotificationId,
      type: randomType,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      relatedId: Math.floor(Math.random() * 10 + 1).toString(),
    };

    notifications.unshift(newNotification);
    return createResponse([newNotification]);
  }

  return createResponse([]);
};
