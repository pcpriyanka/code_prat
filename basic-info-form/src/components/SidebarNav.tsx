import React from "react";
import { FaHome, FaUserCircle, FaUserFriends, FaCog, FaUser, FaChartBar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface SidebarNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ collapsed, onToggle }) => (
  <div style={{ display: "flex", height: "100vh", background: '#f5f7fa' }}>
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
      <SideNavIcon icon={<FaUserFriends size={20} />} />
      <SideNavIcon icon={<FaChartBar size={20} />} />
      <SideNavIcon icon={<FaCog size={20} />} />
    </nav>
    {/* Main Sidebar */}
    <aside
      style={{
        width: collapsed ? 72 : 260,
        background: '#fff',
        color: '#23235b',
        height: 'calc(100vh - 0px)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        borderRight: '1px solid #e5e5e5',
        minWidth: collapsed ? 72 : 260,
        boxShadow: collapsed ? 'none' : '2px 0 8px #e5e5e5',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        transition: 'width 0.3s, min-width 0.3s, box-shadow 0.3s',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 0
      }}
    >
      {/* Collapsible Button and Header with profile image and dropdown */}
      <div style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        paddingLeft: collapsed ? 0 : 32,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: 0.5,
        borderBottom: "1px solid #e5e5e5",
        justifyContent: collapsed ? "center" : "flex-start",
        position: "relative",
        background: '#fff'
      }}>
        {!collapsed && <span>Profile</span>}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "none",
            borderRadius: 8,
            boxShadow: "0 2px 8px #e5e5e5",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
            transition: "right 0.3s"
          }}
        >
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#23235b" }}>
            {collapsed ? "→" : "←"}
          </span>
        </button>
      </div>
      <nav style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        marginTop: 24,
        paddingLeft: collapsed ? 0 : 8,
        paddingRight: collapsed ? 0 : 8
      }}>
        <SidebarItem icon={<FaUserCircle size={18} />} label="Profile setup" active collapsed={collapsed} />
        <SidebarItem icon={<FaUser size={18} />} label="View profile" collapsed={collapsed} />
        <SidebarItem 
          icon={<FaChartBar size={18} />} 
          label="Insights" 
          collapsed={collapsed}
          dropdown
        />
      </nav>
      {/* Footer removed as per new design */}
    </aside>
  </div>
);

interface SideNavIconProps {
  icon: React.ReactNode;
  active?: boolean;
  white?: boolean;
}

const SideNavIcon: React.FC<SideNavIconProps> = ({ icon, active, white }) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: active ? (white ? '#23235b' : '#fff') : 'none',
      color: active ? (white ? '#fff' : '#23235b') : (white ? '#23235b' : '#fff'),
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
  dropdown?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, collapsed, dropdown }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: collapsed ? "12px 0" : "12px 20px",
      background: active ? "#f5f7fa" : "none",
      color: collapsed ? "#232323" : (active ? "#23235b" : "#232323"),
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      borderRadius: 8,
      margin: collapsed ? "0 auto 6px auto" : "0 8px 6px 8px",
      fontSize: 15,
      width: collapsed ? 48 : undefined,
      justifyContent: collapsed ? "center" : "flex-start",
      transition: "background 0.2s, color 0.2s, width 0.3s, padding 0.3s, margin 0.3s"
    }}
  >
    {icon}
    {!collapsed && <span>{label}</span>}
    {!collapsed && dropdown && (
      <FaChevronDown style={{ marginLeft: 8, fontSize: 14, color: '#23235b', verticalAlign: 'middle' }} />
    )}
  </div>
);

export { SidebarNav };
