import { useState } from "react";
import { Link } from "react-router-dom";

const teal = "#00838F", lt = "#4A7E8D", bg = "#DFF5F6", card = "#C4E8EB", dark = "#003F47";
const font = "'Be Vietnam Pro', sans-serif";
const grad = "linear-gradient(90deg, #00838F 0%, #00A8B5 100%)";

const Paw = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#006770">
    <ellipse cx="5.5" cy="4.5" rx="1.7" ry="2.2"/><ellipse cx="9.5" cy="2.8" rx="1.7" ry="2.2"/>
    <ellipse cx="14.5" cy="2.8" rx="1.7" ry="2.2"/><ellipse cx="18.5" cy="4.5" rx="1.7" ry="2.2"/>
    <path d="M12 8.5c-3.5 0-6.5 2.2-6.5 5.8 0 3.8 3 6.2 6.5 6.2s6.5-2.4 6.5-6.2C18.5 10.7 15.5 8.5 12 8.5z"/>
  </svg>
);

const icons = {
  dashboard: (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  "my-pets": (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill={c}><ellipse cx="5" cy="5" rx="1.5" ry="2"/><ellipse cx="9" cy="3.5" rx="1.5" ry="2"/><ellipse cx="15" cy="3.5" rx="1.5" ry="2"/><ellipse cx="19" cy="5" rx="1.5" ry="2"/><path d="M12 9c-3 0-5.5 2-5.5 5 0 3.2 2.5 5 5.5 5s5.5-1.8 5.5-5C17.5 11 15 9 12 9z"/></svg>,
  requests: (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>,
  approvals: (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  settings: (c) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

const menu = [
  { id: "dashboard", label: "Dashboard", path: "/shelter/pets" },
  { id: "my-pets",   label: "My Pets", path: "/shelter/pets#pets-grid" },
  { id: "requests",  label: "Requests"  },
  { id: "approvals", label: "Approvals", path: "/admin/approvals" },
];

const NavBtn = ({ id, label, active, onClick, path }) => {
  const on = active === id;
  const c = on ? "white" : lt;
  
  const btn = (
    <button onClick={() => onClick && onClick(id)}
      className="flex items-center gap-3 px-4 py-[10px] rounded-full text-[13px] w-full text-left transition-all"
      style={{ fontFamily: font, fontWeight: on ? 600 : 500, color: c, background: on ? grad : "transparent" }}
      onMouseEnter={e => { if (!on) e.currentTarget.style.backgroundColor = "#B8E4E8"; }}
      onMouseLeave={e => { if (!on) e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      {icons[id](c)}{label}
    </button>
  );

  if (path) {
    return <Link to={path} className="block w-full">{btn}</Link>;
  }
  return btn;
};

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="flex flex-col w-[215px] h-full overflow-y-auto shrink-0 bg-cyan-50">
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#6fdee8" }}>
            <Paw />
          </div>
          <div>
            <p className="text-[13px] font-bold leading-tight text-cyan-900 text-md">Shelter Portal</p>
            <p className="text-[9px] font-semibold tracking-wider uppercase leading-tight" style={{ color: lt, fontFamily: font }}>Manage Your<br />Sanctuary</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-full px-3 py-2.5" style={{ backgroundColor: "#b9edf1"}}>
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: teal }}>
         <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold leading-tight" style={{ color: dark, fontFamily: font }}>Sarah Jenkins</p>
            <p className="text-[10px]" style={{ color: lt, fontFamily: font }}>Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
       {menu.map(({ id, label, path }) => <NavBtn key={id} id={id} label={label} active={activePage} onClick={setActivePage} path={path} />)}
      </nav>

      <div className="px-3 pb-6">
        <NavBtn id="settings" label="Settings" active={activePage} onClick={setActivePage} />
      </div>
    </aside>
  );
}