import { useCallback, useState, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDownIcon } from "../../icons";
import { useSidebar } from "../../context/SidebarContext";
import { NavItem } from "../../layout/AppSidebar";
import { carerSubMenu } from "../../config/clientMenu";

// --- UPDATED COMPONENT ---
const CarerSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();
  const location = useLocation();

  // Use the new menu structure
  const currentMenu = useMemo(() => carerSubMenu, []);

  // track dropdowns per item, not global
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  // Set initial open state for submenus if a subitem is active
  useMemo(() => {
    const initialOpen: Record<string, boolean> = {};
    currentMenu.forEach((item) => {
      if (item.subItems) {
        const isActiveSubItem = item.subItems.some(
          (sub) => location.pathname.startsWith(sub.path || "") && (sub.path?.length || 0) > 1
        );
        if (isActiveSubItem) {
          initialOpen[item.name] = true;
        }
      }
    });
    setOpenDropdowns(initialOpen);
  }, [location.pathname, currentMenu]); // Recalculate if route changes

  const isActive = useCallback(
    (path: string) => location.pathname.startsWith(path),
    [location.pathname]
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
                  // NOTE: Updated class name for dropdown parent to support active state logic
                  className={`menu-item flex items-center w-full text-left ${isActive(item.path || "") ? "menu-item-active" : ""}`}>
                  <span className="menu-item-icon-size">{item.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text flex-1">{item.name}</span>
                  )}
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${openDropdowns[item.name] ? "rotate-180" : "rotate-0"}`}/>
                </button>

                <div className={`ml-8 mt-2 flex flex-col gap-2 transition-all duration-300 overflow-hidden ${openDropdowns[item.name] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path || ""}
                      className={`text-sm pl-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === sub.path ? "text-brand-600 font-medium" : "text-gray-600" }`}>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.path || "#"}
                className={`menu-item ${location.pathname === item.path ? "menu-item-active" : ""}`}>
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
      className={`fixed top-0 left-0 bg-white dark:bg-gray-900 h-screen border-r border-gray-200 z-50 transition-all duration-300 ${isExpanded || isHovered || isMobileOpen ? "w-[250px]" : "w-[90px]"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between"  style={{
          height: "8vh",
        }}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span className="text-lg font-bold">MarionsCare</span>
          )}
        </Link>
      </div>



      <div className="overflow-y-auto h-full">
        {renderMenu(currentMenu)}
      </div>
    </aside>
  );
};

export default CarerSidebar;