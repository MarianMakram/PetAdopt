import { useState } from "react";
import Layout, { SearchIcon, BellIcon, HeartIcon } from "./Layout";
import { NavLinks } from "./NavbarShared";

export default function AddPetPage({ activePage, setActivePage, children }) {
  const [search, setSearch] = useState("");
  const sidebarBottom = (
    <div className="flex items-center gap-2 px-1 mt-2 py-1">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzJJN_uXhQWoDsvZyNEx9yFSEE9ZwaJNrxpCa1dR_28YaC5y1pG-VZ6fi8NoPdm8cu4Nw3Szqa-kNa0MknxISWYv6PUVrWK18fetYy07pxqSb26tlrHOBRm4VJaMcH8G_edy6KGwRgeE1f-vTfDO8XMx-WgkfQNOg0wgoJldIMGClNI0_eVx2vWPYmfamk3Jv9p7LyjIH_jFNuzX44GBtUMPANBw9eXtko0mALDiQbTkR67sbfn27NIAdhQ_kFbgqVJsiKbya9Atg"
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
  );

  const headerLeft = (
    <>
 <NavLinks activePage={activePage} setActivePage={setActivePage} />
    </>
  );

  const headerRight = (
    <>
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ backgroundColor: "#a0e6f9" }}
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

      <button className="flex items-center justify-center w-7 h-7 rounded-full transition-all">
        <HeartIcon />
      </button>

      <div style={{ width: "1px", height: "20px", backgroundColor: "#B0DDE2" }} />

      <button
        className="flex items-center gap-2 px-2 py-1 rounded-full text-[12px] font-semibold transition-all"
        style={{ color: "#005860" }}
      >
        Profile
      </button>
    </>
  );

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
      sidebarBottom={sidebarBottom}
      headerLeft={headerLeft}
      headerRight={headerRight}
    >
      {children}
    </Layout>
  );
}
