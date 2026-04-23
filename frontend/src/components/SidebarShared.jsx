import { useState } from "react";

export const DashboardIcon = ({ color }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <rect x="3"  y="3"  width="7" height="7" rx="1" />
    <rect x="14" y="3"  width="7" height="7" rx="1" />
    <rect x="3"  y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const MyPetsIcon = ({ color }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <ellipse cx="5"  cy="5"   rx="1.5" ry="2" />
    <ellipse cx="9"  cy="3.5" rx="1.5" ry="2" />
    <ellipse cx="15" cy="3.5" rx="1.5" ry="2" />
    <ellipse cx="19" cy="5"   rx="1.5" ry="2" />
    <path d="M12 9c-3 0-5.5 2-5.5 5 0 3.2 2.5 5 5.5 5s5.5-1.8 5.5-5C17.5 11 15 9 12 9z" />
  </svg>
);

export const RequestsIcon = ({ color, isActive }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" fill={isActive ? "#00A8B5" : color} />
    <line x1="9" y1="13" x2="15" y2="13" stroke={isActive ? "#006770" : "#DFF5F6"} strokeWidth="1.5" />
    <line x1="9" y1="17" x2="13" y2="17" stroke={isActive ? "#006770" : "#DFF5F6"} strokeWidth="1.5" />
  </svg>
);

export const ApprovalsIcon = ({ color, isActive }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline
      points="9 12 11 14 15 10"
      fill="none"
      stroke={isActive ? "#006770" : "#DFF5F6"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5"  y1="12" x2="19" y2="12" />
  </svg>
);

const menuItems = [
  { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
  { id: "my-pets",   label: "My Pets",   Icon: MyPetsIcon    },
  { id: "requests",  label: "Requests",  Icon: RequestsIcon  },
  { id: "approvals", label: "Approvals", Icon: ApprovalsIcon },
];

const navButtonStyle = (isActive) => ({
  fontWeight: isActive ? "600" : "500",
  color: isActive ? "white" : "#4A7E8D",
  background: isActive
    ? "linear-gradient(90deg, #0193a0 0%, #03cae4 100%)"
    : "transparent",
});

export default function Sidebar({ activePage, setActivePage, sidebarBottom, title, subtitle }) {
  return (
    <aside className="flex flex-col w-[200px] h-100 shrink-0 bg-cyan-50">

      <div className="px-5 pt-5 pb-4">
        <p
          className="text-[15px] font-bold text-cyan-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {title || "PetAdopt"}
        </p>
        <p className="text-[9px] font-semibold tracking-widest uppercase text-cyan-600/60">
          {subtitle || "Shelter Portal"}
        </p>
      </div>

      <div className="px-3 pb-4 flex flex-col">
        {menuItems.map(({ id, label, Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#bee3ef" }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
              className="flex items-center gap-2.5 px-3 py-[9px] rounded-full text-[12px] w-full text-left transition-all"
              style={navButtonStyle(isActive)}
            >
              <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full shrink-0">
                <Icon color={isActive ? "white" : "#00818d"} isActive={isActive} />
              </div>
              {label}
            </button>
          );
        })}

  <div className="mt-[420px] mb-2">
    {sidebarBottom}
  </div>
        <button
          className="flex items-center justify-center gap-1.5 w-full mt-2 py-[9px] rounded-full text-[12px] font-semibold text-white transition-all"
          style={{ background: "#007984" }}
          onMouseEnter={e => e.currentTarget.style.background = "#005f6a"}
          onMouseLeave={e => e.currentTarget.style.background = "#007984"}
        >
          <PlusIcon />
          Add New Pet
        </button>

        {(() => {
          const isActive = activePage === "logout";
          return (
            <button
              onClick={() => setActivePage("logout")}
              onMouseEnter={e => e.currentTarget.style.background = "#c44545"}
              onMouseLeave={e => e.currentTarget.style.background = "#d27070"}
              className="flex items-center gap-2.5 px-3 py-[9px] rounded-full text-[18px] w-full h-[40px] text-white text-left transition-all pl-14 mt-3 mb-2" 
              style={{background:"#d27070"}}
            >
              Logout
            </button>
          );
        })()}
      </div>
    </aside>
  );
}
