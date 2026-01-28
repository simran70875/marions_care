import { Clock, LogIn, LogOut, AlertTriangle } from "lucide-react";

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      name: "Zeinab Mohammed",
      action: "Clocked In For Work With Sharon Neate",
      status: "Late Logging In By 0:42:09",
      timeAgo: "55 seconds ago",
      type: "in",
    },
    {
      id: 2,
      name: "Rhiannon Hussain",
      action: "Clocked In For Work With Alice Turner",
      status: "Early By 0:03:10",
      timeAgo: "2 minutes ago",
      type: "in",
    },
    {
      id: 3,
      name: "Mary Miah",
      action: "Clocked Out From Work With John Doe",
      status: "Late By 0:04:25",
      timeAgo: "5 minutes ago",
      type: "out",
    },
    {
      id: 4,
      name: "James Patel",
      action: "Clocked In For Work With Sarah Khan",
      status: "On Time",
      timeAgo: "10 minutes ago",
      type: "in",
    },
    {
      id: 5,
      name: "Fatima Ali",
      action: "Missed Scheduled Clock In With Michael Green",
      status: "No Check-In Recorded",
      timeAgo: "15 minutes ago",
      type: "alert",
    },
    {
      id: 6,
      name: "Omar Hassan",
      action: "Clocked Out From Work With Lucy Bennett",
      status: "Early Clock Out By 0:05:30",
      timeAgo: "20 minutes ago",
      type: "out",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "in":
        return <LogIn className="text-green-500" size={18} />;
      case "out":
        return <LogOut className="text-blue-500" size={18} />;
      default:
        return <AlertTriangle className="text-yellow-500" size={18} />;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4 flex items-center gap-2">
        <Clock className="text-primary" size={18} />
        Notifications
      </h3>

      <ul className="space-y-3 text-sm">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(n.type)}</div>
            <div className="flex flex-col">
              <div className="text-gray-900 dark:text-white font-medium">
                {n.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {n.action}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {n.status}
              </div>
              <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                {n.timeAgo}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
