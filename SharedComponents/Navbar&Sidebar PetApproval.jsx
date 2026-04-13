import { useState } from "react";

const DashboardIcon = ({ color }) => (
<svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
<rect x="3"  y="3"  width="7" height="7" rx="1" />
<rect x="14" y="3"  width="7" height="7" rx="1" />
<rect x="3"  y="14" width="7" height="7" rx="1" />
<rect x="14" y="14" width="7" height="7" rx="1" />
</svg>
);

const MyPetsIcon = ({ color }) => (
<svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
<ellipse cx="5"  cy="5"   rx="1.5" ry="2" />
<ellipse cx="9"  cy="3.5" rx="1.5" ry="2" />
<ellipse cx="15" cy="3.5" rx="1.5" ry="2" />
<ellipse cx="19" cy="5"   rx="1.5" ry="2" />
<path d="M12 9c-3 0-5.5 2-5.5 5 0 3.2 2.5 5 5.5 5s5.5-1.8 5.5-5C17.5 11 15 9 12 9z" />
</svg>
);

const RequestsIcon = ({ color, isActive }) => (
<svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
<polyline points="14 2 14 8 20 8" fill={isActive ? "#00A8B5" : color} />
<line x1="9" y1="13" x2="15" y2="13" stroke={isActive ? "#006770" : "#DFF5F6"} strokeWidth="1.5" />
<line x1="9" y1="17" x2="13" y2="17" stroke={isActive ? "#006770" : "#DFF5F6"} strokeWidth="1.5" />
</svg>
);

const ApprovalsIcon = ({ color, isActive }) => (
<svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
<polyline points="9 12 11 14 15 10" fill="none"
stroke={isActive ? "#006770" : "#DFF5F6"}
strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</svg>
);

const SettingsIcon = ({ color, isActive }) => (
<svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
<circle cx="12" cy="12" r="3" fill={isActive ? "#006770" : "white"} />
</svg>
);

const BellIcon = () => (
<svg width="18" height="18" viewBox="0 0 24 24"fill="#5492a3" >
<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
<path d="M13.73 21a2 2 0 0 1-3.46 0" />
</svg>
);

const HeartIcon = () => (
<svg width="18" height="18" viewBox="0 0 24 24" fill="#5492a3">
<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
</svg>
);

const SearchIcon = () => (
<svg width="10" height="12" viewBox="0 0 24 24" fill="none" 
 stroke="#003035" strokeWidth="2" strokeLinecap="round"
>
<circle cx="11" cy="11" r="8" />
<line x1="21" y1="21" x2="16.65" y2="16.65" />
</svg>
);

const PlusIcon = () => (
<svg width="13" height="13" viewBox="0 0 24 24" fill="none"  
stroke="white" strokeWidth="2.5" strokeLinecap="round">
<line x1="12" y1="5" x2="12" y2="19" />
<line x1="5" y1="12" x2="19" y2="12" />
</svg>
);

const ClipboardIcon = () => (
<svg width="16" height="16" viewBox="0 0 24 24" fill="#00838F">
<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
<rect x="8" y="2" width="8" height="4" rx="1" />
</svg>
);

const menuItems = [
{ id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
{ id: "my-pets",   label: "My Pets",   Icon: MyPetsIcon    },
{ id: "requests",  label: "Requests",  Icon: RequestsIcon  },
{ id: "approvals", label: "Approvals", Icon: ApprovalsIcon },
];

export default function Layout({ activePage, setActivePage, children }) {
const [search, setSearch] = useState("");

return (
<div className="flex min-h-screen" style={{ backgroundColor: "#EBF8F9", fontFamily: "'Be Vietnam Pro', sans-serif" }}>

  <aside  
    className="flex flex-col w-[200px] h-fit shrink-0 bg-cyan-50"     
  >  
    <div className="px-5 pt-5 pb-4">  
      <p className="text-[15px] font-bold text-cyan-900 " style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>  
        PetAdopt  
      </p>  
      <p className="text-[9px] font-semibold tracking-widest uppercase text-cyan-600/60 " >  
        Shelter Portal  
      </p>  
    </div>  

    <div className="px-3 pb-4 flex flex-col">  

      {menuItems.map(({ id, label, Icon }) => {  
        const isActive = activePage === id;  
        return (  
          <button  
            key={id}  
            onClick={() => setActivePage(id)}  
            className="flex items-center gap-2.5 px-3 py-[9px] rounded-full text-[12px] w-full text-left transition-all"  
            style={{  
              fontWeight: isActive ? "600" : "500",  
              color: isActive ? "white" : "#4A7E8D",  
              background: isActive
                  ? "linear-gradient(90deg, #0193a0 0%, #03cae4 100%)"
                  : "transparent",   
            }} >  
            <div  
  className="flex items-center justify-center w-[24px] h-[24px] rounded-full shrink-0 transition-all"  
  style={{ backgroundColor: "transparent" }}  
>
  <Icon color={isActive ? "white" : "#00818d"} isActive={isActive} />
</div> 
            {label}  
          </button>  
        );  
      })}  

      {(() => {  
        const isActive = activePage === "settings";  
        return (  
          <button  
            onClick={() => setActivePage("settings")}  
            className="flex items-center gap-2.5 px-3 py-[9px] rounded-full text-[12px] w-full text-left transition-all "  
            style={{  
              fontWeight: isActive ? "600" : "500",  
              color: isActive ? "white" : "#4A7E8D",  
              background: activePage === "settings"
              ? "linear-gradient(90deg, #0193a0 0%, #03cae4 100%)"
              : "transparent",  
            }}  >  
             
             <div  
  className="flex items-center justify-center w-[24px] h-[24px] rounded-full shrink-0 transition-all" 
  style={{ backgroundColor: "transparent" }}
>
  <SettingsIcon color={isActive ? "white" : "#00818d"} isActive={isActive} />
</div> 
            Settings  
          </button>  
        );  
      })()}  

      <button  
        className="flex items-center justify-center gap-1.5 w-full mt-2 py-[9px] rounded-full text-[12px] font-semibold text-white transition-all" 
         style={{ background:" #007984"}}>  
        <PlusIcon />  
        Add New Pet  
      </button>  

      <div className="flex items-center gap-2 px-1 mt-2 py-1">  
        <img  
          src="https://i.pravatar.cc/150?img=68"  
          alt="Admin"  
          className="w-[30px] h-[30px] rounded-full object-cover shrink-0"  
          style={{ border: "2px solid #00A8B5" }}  
        />  
        <div>  
          <p className="text-[11px] font-semibold leading-tight" style={{ color: "#003F47" }}>  
            Admin User  
          </p>  
          <p className="text-[9px]" style={{ color: "#4A7E8D" }}>  
            Manage your sanctuary  
          </p>  
        </div>  
      </div>  

    </div>  
  </aside>  

  <div className="flex flex-col flex-1">  
 
    <header  
      className="flex items-center justify-between px-5 py-2.5 bg-cyan-50/70">  
      <div className="flex items-center gap-5  ">  
        {["Browse", "Shelters", "Stories"].map((item) => (  
          <button key={item}  
            className="text-[12px] font-medium transition-all text-cyan-700/70 hover:text-cyan-900">  
            {item}  
          </button>  
        ))}  
      </div>  

      <div className="flex items-center gap-3">  
        <div  
          className="flex items-center gap-2 px-3 py-1.5 rounded-full "  
           style={{ backgroundColor:"#a0e6f9"}}
        >  
          <SearchIcon />  
          <input  
            type="text"  
            placeholder="Search approvals..."  
            value={search}  
            onChange={(e) => setSearch(e.target.value)}  
            className="text-[11px] outline-none bg-transparent w-[130px] h-[25px] ml-1.5 focus:ring-0 placeholder:text-gray-500" 
          />  
        </div>  

        <button className="flex items-center justify-center w-7 h-7 rounded-full transition-all">  
          <BellIcon />  
        </button>  

        <button className="flex items-center justify-center w-7 h-7 rounded-full transition-all ">  
          <HeartIcon />  
        </button>  

        <div style={{ width: "1px", height: "20px", backgroundColor: "#B0DDE2" }} />  

        <button  
          className="flex items-center gap-2 px-2 py-1 rounded-full text-[12px] font-semibold transition-all"  
          style={{ color: "#005860" }}  >
          Profile  
        </button>  
      </div>  
    </header>  

  </div>  
</div>

);
}
