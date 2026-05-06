import admin from "../assets/images/ava.png";

export default function Sidebar({ activePage, setActivePage, children }) {
  return null;
}

export function SidebarUserCard() {
  return (
    <div className="flex items-center gap-3 mt-6 p-2 rounded-full" style={{ background: "#d9f6ff" }}>
      <img
        src={admin}
        alt="Admin"
        className="w-[40px] h-[40px] rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-tight" style={{ color: "#003F47", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Alex Rivers
        </span>
        <span className="text-[10px]" style={{ color: "#2c6370" }}>Admin Profile</span>
      </div>
    </div>
  );
}
