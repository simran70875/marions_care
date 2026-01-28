import {
  Pill, // Used for the main section icon
  ChevronRight,
  Notebook,
  View,
  File,
} from "lucide-react";
import { useNavigate } from "react-router";

// --- Data Structure for Menu Items ---
const medicationMenuItems = [
  {
    title: "Notes",
    description: "Report of client notes",
    icon: Notebook,
    route: "/all-notes",
  },
  {
    title: "Medication & Task Overview",
    description: "Overview of medication and tasks",
    icon: Pill,
    route: "/medication-tasks-overview",
  },
  {
    title: "EMAR Review",
    description: "Review when an EMAR was last generated for each client",
    icon: View,
    route: "/emar-overview",
  },
];

// --- Reusable Menu Item Component ---
const MenuItem = ({
  title,
  description,
  icon: Icon,
  route,
}: (typeof medicationMenuItems)[0]) => {
  const navigate = useNavigate();
  // Note: In a real app, this would use useNavigate or an <a> tag for navigation.
  const handleClick = () => {
    console.log(`Navigating to: ${route}`);
    navigate(`/customers/audit${route}`);
    // Example using React Router: useNavigate().push(route);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-4 md:p-5 bg-white rounded-lg shadow-sm border border-gray-200 mb-2 cursor-pointer transition-all hover:bg-blue-50 hover:shadow-md"
    >
      <div className="flex items-center">
        {/* Icon (Optional - added for better UX) */}
        <div className="p-2 bg-blue-100 text-blue-700 rounded-full mr-4 hidden sm:block">
          <Icon size={20} />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            {/* Title matching the bolded format in the image */}
            {title}
            <ChevronRight size={18} className="ml-2 text-blue-500" />
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {/* Description matching the sub-text format */}
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function AuditPages() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* Main Header Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl mb-6 border-l-4 border-blue-600">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
          <File size={30} className="mr-3 text-blue-600" />
          Audits
        </h1>
      </div>

      {/* Menu Items Container */}
      <div className="space-y-4">
        {medicationMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            route={item.route}
          />
        ))}
      </div>

      {/* Note: The original screenshot background is very light gray/off-white. 
                 The MenuItem component styles mimic the clickable card style. */}
    </div>
  );
}
