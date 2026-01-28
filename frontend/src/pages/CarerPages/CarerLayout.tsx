import { Outlet } from "react-router";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import AppHeader from "../../layout/AppHeader";
import CarerSidebar from "./CarerSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <CarerSidebar />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded || isHovered ? "lg:ml-[250px]" : "lg:ml-[90px]"} ${isMobileOpen ? "ml-0" : ""}`}>
        <AppHeader />
        <div className="p-5" style={{
            overflow:'scroll',
            height:'92vh'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const CarerLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default CarerLayout;
