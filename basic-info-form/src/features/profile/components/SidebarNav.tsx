import React from "react";
import { FaUser, FaUserCircle, FaChartBar, FaBars } from "react-icons/fa";

interface SidebarNavProps {
  collapsed: boolean;
  onToggle: () => void;
}


import { FaHome, FaUserFriends, FaCog } from "react-icons/fa";

export const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed, onToggle }) => (
  <div style={{ display: "flex", height: "100vh" }}>
    {/* Side Navigation (Logo + 4 icons) */}
    <nav
      style={{
        width: 72,
        background: "#23235b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        borderRight: "1px solid #e5e5e5",
        zIndex: 20,
      }}
    >
      {/* Logo */}
      <div style={{ width: 32, height: 32, marginBottom: 32 }}>
        <img src="/logo192.png" alt="Logo" style={{ width: 32, height: 32 }} />
      </div>
      {/* Navigation icons */}
      <SideNavIcon icon={<FaHome size={20} />} active />
      <SideNavIcon icon={<FaUserCircle size={20} />} />
      <SideNavIcon icon={<FaUserFriends size={20} />} />
      <SideNavIcon icon={<FaCog size={20} />} />
    </nav>
    {/* Main Sidebar */}
    <aside
      style={{
        width: 260,
        background: "#23235b",
        color: "#fff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        borderRight: "1px solid #e5e5e5",
        minWidth: 260,
        boxShadow: "2px 0 8px #e5e5e5"
      }}
    >
      <div style={{ height: 56, display: "flex", alignItems: "center", paddingLeft: 32, fontWeight: 700, fontSize: 18, letterSpacing: 0.5, borderBottom: "1px solid #353575" }}>
        Profile
      </div>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, marginTop: 16 }}>
        <SidebarItem icon={<FaUserCircle size={18} />} label="Profile setup" active />
        <SidebarItem icon={<FaUser size={18} />} label="View profile" />
        <SidebarItem icon={<FaChartBar size={18} />} label="Insights" />
      </nav>
      <div style={{ flex: 0, padding: 24, borderTop: "1px solid #353575", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#353575", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FaUserCircle size={18} color="#fff" />
        </div>
        <div style={{ fontWeight: 500, fontSize: 15 }}>John Doe</div>
      </div>
    </aside>
  </div>
);

interface SideNavIconProps {
  icon: React.ReactNode;
  active?: boolean;
}

const SideNavIcon: React.FC<SideNavIconProps> = ({ icon, active }) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: active ? "#fff" : "none",
      color: active ? "#23235b" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      cursor: "pointer",
      boxShadow: active ? "0 2px 8px #e5e5e5" : undefined,
      transition: "background 0.2s, color 0.2s"
    }}
  >
    {icon}
  </div>
);

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "14px 32px",
      background: active ? "#fff" : "none",
      color: active ? "#23235b" : "#fff",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      borderRadius: 8,
      margin: "0 16px 8px 16px",
      fontSize: 15,
      transition: "background 0.2s, color 0.2s"
    }}
  >
    {icon}
    <span>{label}</span>
  </div>
);
