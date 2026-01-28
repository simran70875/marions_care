import { Users, Calendar, AlertTriangle } from "lucide-react"; // Lucide icons for example
import { useNavigate } from "react-router";

export default function EcommerceMetrics() {
  const metrics = [
    {
      label: "Customers",
      value: 90,
      description: "Customers currently Active on System",
      icon: <Users className="text-gray-800 dark:text-white/90 w-6 h-6" />,
      link: "/customers",
    },
    {
      label: "Carers",
      value: 76,
      description: "Carers currently Active on System",
      icon: <Users className="text-gray-800 dark:text-white/90 w-6 h-6" />,
      link: "/carers",
    },
    {
      label: "Events Today",
      value: 231,
      description: "Events that have been clocked in and clocked out of",
      icon: <Calendar className="text-gray-800 dark:text-white/90 w-6 h-6" />,
    },
    {
      label: "Assessments Due",
      value: 46,
      description: "Assessment / Plans due between today and 07-Nov",
      icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    },
    {
      label: "HR Files Due",
      value: 0,
      description: "HR File due for renewal between today and 07-Nov",
      icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    },
    {
      label: "Groups",
      value: 12,
      description: "Groups currently Active on System",
      icon: <Users className="text-gray-800 dark:text-white/90 w-6 h-6" />,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="relative group rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {m.icon}
          </div>

          {/* Label and Value */}
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {m.label}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {m.value}
              </h4>
            </div>

            <div onClick={() => {
              navigate(m.link || "#");
            }} className="cursor-pointer">
              <span className="inline-block rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                View
              </span>
            </div>
          </div>

          {/* Hover Info Card */}
          <div className="absolute left-1/2 top-[2rem] w-max -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-xs shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 z-9999">
            {m.description}
          </div>
        </div>
      ))}
    </div>
  );
}
