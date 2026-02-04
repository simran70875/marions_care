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
  Clock,
  Users,
} from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: NavItem[];
};

/* ---------------- SUB MENUS ---------------- */

const editCarerSubMenu: NavItem[] = [
  { name: "Details", path: "/carer/edit/details" },
  { name: "Contacts", path: "/carer/edit/contacts" },
  { name: "Availability", path: "/carer/edit/availability" },
  { name: "Bank Details", path: "/carer/edit/bank-details" },
  { name: "Contract Details", path: "/carer/edit/contract-details" },
  { name: "Contract Hours", path: "/carer/edit/contract-hours" },
];

const plansSubMenu: NavItem[] = [
  { name: "Plan Details", path: "/carer/plans/details" },
];

/* ---------------- MAIN MENU ---------------- */

const carerSidebarItems: NavItem[] = [
  { icon: <BoxCubeIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <Users />, name: "All Carers", path: "/carers/all" },
  { icon: <UserIcon />, name: "Carer", path: "/carer/view" },
  { icon: <UserIcon />, name: "Carer Details", path: "/carer/details" },
  { icon: <Calendar />, name: "Carer Schedule", path: "/carer/schedule" },
  { icon: <Calendar />, name: "Holiday Calendar", path: "/carer/holidays/calendar" },

  {
    icon: <Edit />,
    name: "Edit Carer",
    subItems: editCarerSubMenu,
  },

  {
    icon: <Clipboard />,
    name: "Plans",
    subItems: plansSubMenu,
  },

  { icon: <File />, name: "HR Files", path: "/carer/hr-files" },
  { icon: <Clock />, name: "Time Clock", path: "/carer/time-clock" },
  {
    icon: <EnvelopeIcon />,
    name: "Carer Letters",
    path: "/carer/letters",
  },
];

/* ---------------- COMPONENT ---------------- */

const CarerSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const handleMenuClick = (item: NavItem) => {
    if (item.subItems?.length) {
      setOpenDropdowns((prev) => ({
        ...prev,
        [item.name]: !prev[item.name],
      }));
    }
  };

  const renderMenu = (menu: NavItem[]) => (
    <ul className="flex flex-col ml-1 mt-2">
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

    const { firstName, lastName } = useSelector(
      (state: RootState) => state.selectedCarer,
    );

  /* Mock Carer Profile */
  const carer = {
    name: `${firstName} ${lastName}`,
    profileImage:
      "https://atscaleconference.com/wp-content/uploads/2022/08/image-placeholder-person.jpg",
  };

  

  return (
    <aside
      className={`fixed top-0 left-0 bg-white dark:bg-gray-900 h-screen border-r border-gray-200 z-50 transition-all duration-300
      ${isExpanded || isHovered || isMobileOpen ? "w-[250px]" : "w-[90px]"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className="p-6 border-b border-gray-200 flex items-center"
        style={{ height: "8vh" }}
      >
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="text-lg font-bold">MarionsCare</span>
          )}
        </Link>
      </div>

      {/* Carer Profile */}
      <div className="p-4 border-b border-gray-200 flex flex-col items-center">
        <img
          src={carer.profileImage}
          alt={carer.name}
          className="w-14 h-14 rounded-full border-4 border-purple-500 shadow-md mb-2"
        />
        {(isExpanded || isHovered || isMobileOpen) && (
          <div className="text-center font-bold text-lg text-gray-800 dark:text-white">
            {carer.name}
          </div>
        )}
      </div>

      {renderMenu(carerSidebarItems)}
    </aside>
  );
};

export default CarerSidebar;
