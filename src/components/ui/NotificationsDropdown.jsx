import { Calendar, User, FileText } from "lucide-react";

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 1,
      type: "lead",
      message: "New lead assigned: John Smith",
      time: "10 minutes ago",
      icon: User,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "reminder",
      message: "Follow-up reminder: Call Sarah about Parkview",
      time: "1 hour ago",
      icon: Calendar,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      type: "document",
      message: "Document uploaded: Parkview Contract",
      time: "3 hours ago",
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          <span className="text-xs text-blue-600 cursor-pointer">
            Mark all as read
          </span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-full ${notification.color} mr-3`}>
                <notification.icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 break-words">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-gray-200 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
