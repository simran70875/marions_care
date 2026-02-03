import { Outlet } from "react-router";
import { SidebarProvider, useSidebar } from "../../../context/SidebarContext";
import AppHeader from "../../../layout/AppHeader";
import Backdrop from "../../../layout/Backdrop";
import CarerSidebar from "./CarerDetailsSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <CarerSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[250px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-5" style={{
          height:"92vh",
          overflow:'auto'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const CarerDetailsLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default CarerDetailsLayout;
