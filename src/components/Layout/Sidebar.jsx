"use client";

import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  Calendar,
  FileText,
  Settings,
  Link2,
  MapPin,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/leads", icon: Users, label: "Leads" },
    { path: "/projects", icon: Building, label: "Projects" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/site-visits", icon: MapPin, label: "Site Visits" },
    { path: "/documents", icon: FileText, label: "Documents" },
    { path: "/integrations", icon: Link2, label: "Integrations" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed z-30 h-screen ${
          isOpen
            ? isMobile
              ? "w-64 left-0"
              : "w-64"
            : isMobile
            ? "-left-64 w-64"
            : "w-20"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {isOpen ? (
            <h1 className="text-xl font-bold text-gray-800 truncate">
              PropertyCRM
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-gray-800 mx-auto">P</h1>
          )}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${!isOpen && "justify-center"}`}
                  title={!isOpen ? item.label : ""}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            className={`flex items-center w-full px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors ${
              !isOpen && "justify-center"
            }`}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="ml-3 truncate">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
