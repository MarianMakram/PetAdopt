import Layout, { BellIcon, HeartIcon } from "./Layout";
import { NavLinks } from "./NavbarShared"

export default function RequestsPage({ activePage, setActivePage, children }) {

  const headerLeft = (
    <span
      className="text-2xl font-bold tracking-tighter text-cyan-900 ml-[580px]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      PetAdopt
    </span>
  );

  const headerRight = (
    <>
      <NavLinks activePage={activePage} setActivePage={setActivePage} />

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
        <div className="w-7 h-7 rounded-full overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIfohqwvv6uC5tx-WYqqegSGX8ywuxbJ054PEKUchyK_uQtFD2zUXcFUpqPz8Jll2om-1zE7QKWwibM1ckfPfO8KxMX4VNBfjBOu-OqqjYetNZXS0fru53QGO2xmzivAVwT9gD1bdggjPq_brK-S6gIsXgWH8D1vFFvPLC3ZwZCJbNQv4m6v3AAMKCQ4xDN7zVwOXRmGLi5LEtab2PbGVVycEgbCK7GPFYxLJCzsFXg9evLB7-JKm8CmEvKhcM-_WXMPAayy9Dlq4"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        Profile
      </button>
    </>
  );

  return (
    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
      sidebarTitle="Shelter Portal"
      sidebarSubtitle="Manage your sanctuary"
      headerLeft={headerLeft}
      headerRight={headerRight}
    >
      {children}
    </Layout>
  );
}
