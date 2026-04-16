import Sidebar from "./Sidebar";
import Header from "./Header";

export { BellIcon, HeartIcon, SearchIcon } from "./Header";

export default function Layout({
  activePage,
  setActivePage,
  sidebarBottom,
  sidebarTitle,
  sidebarSubtitle,
  headerLeft,
  headerRight,
  children,
}) {
  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#EBF8F9", fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarBottom={sidebarBottom}
        title={sidebarTitle}
        subtitle={sidebarSubtitle}
      />

      <div className="flex flex-col flex-1">
        <Header headerLeft={headerLeft} headerRight={headerRight} />
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
