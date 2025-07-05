import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SidebarNav } from "./components/SidebarNav";
import { ProfileSetup } from "./features/profile"; // Your form entry point
import { FaBell } from "react-icons/fa";
import "./App.css";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <div style={{ display: "flex", minHeight: "100vh", background: "#f4f4f6" }}>
        <SidebarNav collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div
          style={{
            marginLeft: collapsed ? 80 : 250,
            transition: "margin-left 0.3s",
            width: "100%",
            minHeight: "100vh",
            background: "#f4f4f6",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              height: 56,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontWeight: 500, fontSize: 18 }}>Profile setup</span>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <FaBell color="#888" size={20} />
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: -10,
                  marginTop: 14,
                  fontSize: 18,
                  color: "#23235b",
                  cursor: "pointer"
                }}
              >
                ▼
              </span>
            </div>
          </div>
          {/* Main content */}
          <div style={{ padding: "40px 0", minHeight: "calc(100vh - 56px)" }}>
            <ProfileSetup />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
