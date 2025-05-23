import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check once on mount
  useEffect(() => {
    const isNowMobile = window.innerWidth < 1024;
    setIsMobile(isNowMobile);
    setSidebarOpen(!isNowMobile);
  }, []);

  // Add resize listener separately
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      setSidebarOpen(!isNowMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  console.log("isMobile:", isMobile);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      <div
        className={`flex flex-col flex-1 w-full transition-all duration-300 ease-in-out ${
          sidebarOpen && !isMobile ? "md:ml-64" : isMobile ? "ml-0" : "md:ml-20"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
