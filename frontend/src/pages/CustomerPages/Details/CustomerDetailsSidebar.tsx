import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BoxCubeIcon,
  UserIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from "../../../icons";
import {
  Calendar,
  Clipboard,
  Edit,
  File,
  List,
  LocateIcon,
  Pill,
  ProjectorIcon,
  Users,
  Wallet,
} from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  pro?: boolean;
  new?: boolean;
  subItems?: NavItem[];
};

const assessmentsSubMenu = [
  { name: "Assessment Dates", path: "/customer/assessments/dates" },
  { name: "Assessment Calendar", path: "/customer/assessments/calendar" },
  { name: "Body Assessment", path: "/customer/assessments/body" },
  {
    name: "Body Assessment History",
    path: "/customer/assessments/body/history",
  },
  { name: "Skin Assessment", path: "/customer/assessments/skin" },
  {
    name: "Skin Assessment History",
    path: "/customer/assessments/skin/history",
  },
];

const digitalTasksSubMenu = [
  { name: "Task Tracker", path: "/customer/tasks/tracker" },
  { name: "Digital Task History", path: "/customer/tasks/history" },
];

const plansSubMenu = [
  { name: "Plan Details", path: "/customer/plans/details" },
];

const editClientSubMenu = [
  { name: "Details", path: "/customer/edit/details" },
  { name: "Contacts", path: "/customer/edit/contacts" },
  { name: "About Me", path: "/customer/edit/about-me" },
];

/** @type {NavItem[]} */

const clientDetailsSidebarItems = [
  { icon: <BoxCubeIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <UserIcon />, name: "All Customers", path: "/customers/all" },
  { icon: <UserIcon />, name: "Customer", path: "/customer/view" },
  { icon: <LocateIcon />, name: "Customer Details", path: "/customer/details" }, // Main current view
  { icon: <Calendar />, name: "Customer Schedule", path: "/customer/schedule" },
  {
    icon: <Edit />,
    name: "Edit Customer",
    path: "/customer/edit",
    subItems: editClientSubMenu,
  },
  {
    icon: <Clipboard />,
    name: "Assessments",
    path: "/customer/assessments",
    subItems: assessmentsSubMenu,
  },
  { icon: <Pill />, name: "Medication", path: "/customer/medication" },
  {
    icon: <List />,
    name: "Digital Tasks",
    path: "/customer/tasks",
    subItems: digitalTasksSubMenu,
  },
  {
    icon: <File />,
    name: "Plans",
    path: "/customer/plans",
    subItems: plansSubMenu,
  },
  {
    icon: <Users />,
    name: "Customer Participation",
    path: "/customer/participation",
  },
  {
    icon: <ProjectorIcon />,
    name: "Customer Family Access",
    path: "/customer/family",
  },
  { icon: <Wallet />, name: "Customer Wallet", path: "/customer/wallet" },
  {
    icon: <EnvelopeIcon />,
    name: "Customer Letters",
    path: "/customer/letters",
  },
];

const CustomerSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const location = useLocation();

  // track dropdowns per item, not global
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  const handleMenuClick = (item: NavItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [item.name]: !prev[item.name],
      }));
    }
  };

  const renderMenu = (menu: NavItem[]) => {
    return (
      <ul className={`flex flex-col ml-1 mt-2`}>
        {menu.map((item) => (
          <li key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => handleMenuClick(item)}
                  className="menu-item flex items-center w-full text-left"
                >
                  <span className="menu-item-icon-size">{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text flex-1">{item.name}</span>
                  )}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      openDropdowns[item.name] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`ml-8 mt-2 flex flex-col gap-2 transition-all duration-300 overflow-hidden ${
                    openDropdowns[item.name]
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path || ""}
                      className={`text-sm pl-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        isActive(sub.path || "")
                          ? "text-brand-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.path || "#"}
                className={`menu-item ${
                  isActive(item.path || "") ? "menu-item-active" : ""
                }`}
              >
                <span className="menu-item-icon-size">{item.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const { firstName, lastName } = useSelector( (state: RootState) => state.selectedCustomer);

  return (
    <aside
      className={`fixed top-0 left-0 bg-white dark:bg-gray-900 h-screen border-r border-gray-200 z-50 transition-all duration-300
      ${isExpanded || isHovered || isMobileOpen ? "w-[250px]" : "w-[90px]"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="p-6 border-b border-gray-200 flex items-center justify-between"
        style={{
          height: "8vh",
        }}
      >
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="text-lg font-bold">MarionsCare</span>
          )}
        </Link>
      </div>

      {/* Customer Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center">
        <img
          src={
            "https://atscaleconference.com/wp-content/uploads/2022/08/image-placeholder-person.jpg"
          }
          alt={firstName}
          className="w-14 h-14 rounded-full border-4 border-blue-500 shadow-md mb-2"
        />
        {(isExpanded || isHovered || isMobileOpen) && (
          <div className="text-center font-bold text-lg text-gray-800 dark:text-white">
            {firstName} {lastName}
          </div>
        )}
      </div>

      {renderMenu(clientDetailsSidebarItems)}
    </aside>
  );
};

export default CustomerSidebar;
