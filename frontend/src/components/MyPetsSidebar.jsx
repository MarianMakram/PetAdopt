export default function Sidebar({ activePage, setActivePage, children }) {
  return null;
}

export function SidebarUserCard() {
  return (
    <div className="flex items-center gap-3 mt-6 p-2 rounded-full" style={{ background: "#d9f6ff" }}>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBj_OhneQDhMkuFJBOjSHbJcRZZv_q1R_Q4qZdAwCmOwZEAps5NlUH3tcfzjW5JwAszZQ_nwrKzYUIrOkWfVBumE-KiLcUicvh28lC79JdRU9zbFxGaVQUpdC1Oi8tOGavaRvk0o7PWy0tiScs5wxR1Zoc9hqtVk8GuQ4euqyKQ0ACjClbQb0R8S7Cdi24sr3xO6KLdDDC4qMoNRVMnSVkrUyQcI6JVZ-cfs0-48GYSEu8bPHm1WA9euZi9ILx7xjY9dHIhtecKo"
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
