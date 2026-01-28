import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { clientSubMenu } from "../config/clientMenu";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  pro?: boolean;
  new?: boolean;
  subItems?: NavItem[];
};

// ----------------- MAIN MENU -----------------
const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Main Dashboard", path: "/dashboard" },
  {
    icon: <UserCircleIcon />,
    name: "Customers",
    path: "/customers/all",
    subItems: clientSubMenu,
  },
  { icon: <UserCircleIcon />, name: "Carers", path: "/carers/all" },
  { icon: <ListIcon />, name: "Notes", path: "/notes" },
  { icon: <CalenderIcon />, name: "Messages", path: "/messages" },
  { icon: <PageIcon />, name: "Noticeboard", path: "/noticeboard" },
  { icon: <PieChartIcon />, name: "Reports", path: "/reports" },
  { icon: <TableIcon />, name: "Finance", path: "/finance" },
  { icon: <BoxCubeIcon />, name: "Post-It", path: "/post-it" },
  { icon: <ListIcon />, name: "All Forms", path: "/all-forms" },
  { icon: <PageIcon />, name: "Custom Pages", path: "/custom-pages" },
  { icon: <CalenderIcon />, name: "Time Confirm", path: "/time-confirm" },
  { icon: <TableIcon />, name: "Filing Cabinet", path: "/filing-cabinet" },
  { icon: <BoxCubeIcon />, name: "PPE Unit Management", path: "/ppe-unit" },
  { icon: <GridIcon />, name: "Locations", path: "/locations" },
  { icon: <PlugInIcon />, name: "Company Settings", path: "/company-settings" },
];

// ----------------- OTHER SECTION -----------------
// const othersItems: NavItem[] = [
//   { icon: <PlugInIcon />, name: "Support Desk", path: "/support-desk" },
//   { icon: <PlugInIcon />, name: "Help", path: "/help" },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const location = useLocation();

  // track dropdowns per item, not global
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const navigate = useNavigate();
  const handleMenuClick = (item: NavItem) => {
    navigate(item.path || "/dashboard");
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
                  // NOTE: Updated class name for dropdown parent to support active state logic
                  className={`menu-item flex items-center w-full text-left ${
                    isActive(item.path || "") ? "menu-item-active" : ""
                  }`}
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
              </>
            ) : (
              <Link
                to={item.path || "#"}
                className={`menu-item ${
                  location.pathname === item.path ? "menu-item-active" : "" // Adjusted logic to match path exactly
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

      {renderMenu(navItems)}
    </aside>
  );
};

export default AppSidebar;
