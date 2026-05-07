import {
  DashboardIcon,
  MyPetsIcon,
  RequestsIcon,
  ApprovalsIcon,
  SettingsIcon
} from "./Sidebar";
import user from "../assets/images/unnamed (20).png";

const menuItems = [
  { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
  { id: "my-pets", label: "My Pets", Icon: MyPetsIcon },
  { id: "requests", label: "Requests", Icon: RequestsIcon },
  { id: "approvals", label: "Approvals", Icon: ApprovalsIcon },
  { id: "settings", label: "Settings", Icon: SettingsIcon },
];

export default function SidebarUser({ activePage, setActivePage }) {

  const isActive = (id) => activePage === id;

  const btnStyle = (id) => ({
    fontWeight: isActive(id) ? 600 : 500,
    color: isActive(id) ? "white" : "#4A7E8D",
    background: isActive(id)
      ? "linear-gradient(90deg, #0193a0, #03cae4)"
      : "transparent",
  });

  return (
    <aside className="flex flex-col w-[200px] min-h-screen shrink-0 bg-[#EBF8F9]">

      <div className="px-5 pt-5 pb-4">
        <p className="text-[15px] font-bold text-cyan-900">PetAdopt</p>
        <p className="text-[9px] font-semibold tracking-widest uppercase text-cyan-600/60">
          Shelter Portal
        </p>
      </div>

      <div className="px-3 pb-4 flex flex-col gap-0.5">
        {menuItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            onMouseEnter={e => {
              if (!isActive(id)) e.currentTarget.style.background = "#bfe4e8";
            }}
            onMouseLeave={e => {
              if (!isActive(id)) e.currentTarget.style.background = "transparent";
            }}
            className="flex items-center gap-2.5 px-3 py-[9px] rounded-full text-[12px] w-full text-left"
            style={btnStyle(id)}
          >
            <Icon color={isActive(id) ? "white" : "#00818d"} isActive={isActive(id)} />
            {label}
          </button>
        ))}

        <div
          className="flex items-center gap-2 px-2 py-2.5 mt-3 rounded-full"
          style={{ backgroundColor: "#D6F0F2" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1A1A2E" }}
          >
            <img alt="User profile" className="w-10 h-10 rounded-full object-cover border-2 border-white" src={user} />
          </div>
          <div>
            <p className="text-[11px] font-semibold" style={{ color: "#003F47" }}>
              Alex Rivera
            </p>
            <p
              className="text-[9px] font-semibold tracking-widest uppercase"
              style={{ color: "#4A7E8D" }}
            >
              System Admin
            </p>
          </div>
        </div>

        <button
          className="flex items-center justify-center gap-1.5 w-full mt-2 py-[9px] rounded-full text-[12px] font-semibold text-[#5a2e2a]"
          style={{ background: "#f4a897" }}
        >
          Add New Pet
        </button>
      </div>
    </aside>
  );
}
