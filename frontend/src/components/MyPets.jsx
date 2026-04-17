import Layout from "./Layout";
import { SidebarUserCard } from "./MyPetsSidebar";

const PETS = [
  {
    id: 1,
    name: "Cooper",
    breed: "Beagle",
    age: "2 years old",
    status: "approved",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7sQNWCjNug-gjgfVgROVfp2Z5EoSdSFBHfJTd9u5MzfP0vl1ZGiAam0rjGnngdabz4LVglMiyudZXxlbGVcGsFjEvi4pOf59DV2vhFR5gt1axM-9dwgBjrE_51KvUzjr-gqNGaObEb4zc20Tm4VmqgbNCX8lWjziaGOTBI_wIETg44mXbJCwwCYCKotgoIxNildk-mRK9vqR2wZWGHTFYEu6rmREa-JFGUIgX_S1KUyN2-h2hpV9IW6z9NXsXWtW2LZEUapYLhD0",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Domestic Shorthair",
    age: "1 year old",
    status: "pending-admin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbj6pz-mYfztmV3cHr6dbyA8bh8xGkUjqAMj-lP59u4MHIEYBmtX2T2LTdBOB-Fq_Ts4UMtBb5rD2QWbOA-SbIsvDEPlfGoUV29h8newybqwPvV2j8TvZqTxRFoZWTwC3ohQtsOo8ooNl-K6AL_BuPvNYTUZDKTLyZtK39avXJ5ppSk-rMXkMRPtjTDzShns84Btk4EtpU6U9jnbfEE7OB4c14nAuaDmZ8OgoXAAwRDwhmXWRzM8ZbsRZuF0ZpDui9mdS9PyK26Wk",
  },
  {
    id: 3,
    name: "Barnaby",
    breed: "Golden Retriever",
    age: "4 years old",
    status: "adopted",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLKaGlC86iwJykZTgFq6jj3NrmHEyPzNgeWhD3liNbqv9UaoC2yQP4570L_aH4ZZZwe9DoCN_mYy1fRS_m9gIjZggISIZTKmGSwxBxnnJzFoctEiuQw2poGMCGELxsrv8xY04fx6S8Jok1f6M_II5lscg_xfZq_zJ4VS6KhN-zOA_ljaVY2ClSjW-Y5dKJ_yrjgZFJFkktrEk7OfhML8SXAri48Tv2oEUDJD2aT7yqODA7FpH9quX4IWr3sAjUW4jrWfXOYMaysJI",
    grayscale: true,
  },
  {
    id: 4,
    name: "Pippin",
    breed: "Frenchie",
    age: "3 years old",
    status: "rejected",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzi_kp-DrA59E4lCKroOtpICMnMhgpp-_4M55NxUTz0cGZIaXra-W1mel3MCzFIr8yDveer62V4ucmjK5tW7a9TPZDJXYR0nQslZgTDDfQT4bAy9ovrm8xOaGdqNsRRsYvBfbg3KPhoWI91gkh8Htvx1qFM-J9UkwbNCz_z6jlwzPrEx5TBTraUepGdORtIr4G34cghQLX1QBi77MrK6zi6pG-Q6TPOD_LFlC1SPVv5fKhvKyWQrIKPGPYS8FofcVdY_ASdRPWfTk",
  },
];

const STATUS_CONFIG = {
  approved:        { label: "Approved",      bg: "rgba(0,101,111,0.9)",  color: "#d4f9ff" },
  "pending-admin": { label: "Pending Admin", bg: "rgba(253,211,77,0.9)", color: "#463600" },
  adopted:         { label: "Adopted",       bg: "rgba(155,62,32,0.9)",  color: "#fff"    },
  rejected:        { label: "Rejected",      bg: "rgba(179,27,37,0.9)",  color: "#ffefee" },
};

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#00656f" stroke="#00656f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#e74c3c" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="#00656f"/>
    <circle cx="12" cy="12" r="3" fill="white"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#00656f"/>
    <circle cx="12" cy="8" r="1" fill="white"/>
    <line x1="12" y1="11" x2="12" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#00656f" />

    <line x1="12"y1="8"x2="12"y2="16"stroke="#d9f6ff"strokeWidth="2"strokeLinecap="round"/>
    <line x1="8"y1="12"x2="16"y2="12"stroke="#d9f6ff"strokeWidth="2"strokeLinecap="round"/>
  </svg>
);

function StatCard({ value, label, valueColor }) {
  return (
    <div
      className="flex flex-col justify-center px-6 py-6 rounded-xl"
      style={{ backgroundColor: "#d9f6ff", border: "1px solid rgba(129,181,197,0.15)" }}
    >
      <span
        className="text-3xl font-bold block mb-2"
        style={{ color: valueColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {value}
      </span>
      <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "#2c6370" }}>
        {label}
      </span>
    </div>
  );
}

function PetActions({ status }) {
  const btnBase = {
    width: 40, height: 40, borderRadius: "50%", border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s",
  };
  const primaryBtn = { ...btnBase, background: "#bff0ff", color: "#00656f" };
  const dangerBtn  = { ...btnBase, background: "#bff0ff", color: "#b31b25" };

  if (status === "adopted") return (
    <button style={primaryBtn}><EyeIcon /></button>
  );
  if (status === "rejected") return (
    <div className="flex gap-2">
      <button style={primaryBtn}><InfoIcon /></button>
      <button style={primaryBtn}><EditIcon /></button>
    </div>
  );
  return (
   <div className="flex gap-2">
      <button style={primaryBtn}><EditIcon /></button>
      <button style={primaryBtn}><TrashIcon /></button>
    </div>
  );
}

function PetCard({ pet }) {
  const badge = STATUS_CONFIG[pet.status];
  return (
    <div
      className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 h-[420px] "
      style={{
        background: "#fff",
        border: "1px solid rgba(129,181,197,0.2)",
        boxShadow: "0 2px 10px rgba(0,103,112,0.05)",
        padding: 16,
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,101,111,0.12)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,103,112,0.05)"}
    >
      <div
        className="relative w-full  overflow-hidden rounded-3xl"
        style={{ height: 360, marginBottom: 24 }}
      >
        <img
          src={pet.img}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ filter: pet.grayscale ? "grayscale(100%)" : "none" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      <span
          className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{
            background: badge.bg,
            color: badge.color,
            backdropFilter: "blur(8px)",
          }}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-2xl font-bold"
            style={{ color: "#00343e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {pet.name}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "#2c6370" }}>
            {pet.breed} • {pet.age}
          </p>
        </div>
        <PetActions status={pet.status} />
      </div>
    </div>
  );
}

function AddPetCard() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl cursor-pointer transition-all duration-300"
      style={{
        border: "2px dashed rgba(129,181,197,0.5)",
        minHeight: 400,
        background: "transparent",
        padding: 16,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#d9f6ff";
        e.currentTarget.style.borderColor = "#00656f";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "rgba(129,181,197,0.5)";
      }}
    >
      <div
        className="flex items-center justify-center rounded-full transition-transform"
        style={{ width: 64, height: 64, background: "rgba(137,233,246,0.3)" }}
      >
        <PlusCircleIcon />
      </div>
      <div className="text-center">
        <p className="text-xl font-bold mb-1" style={{ color: "#00343e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          List Another Pet
        </p>
        <p className="text-sm" style={{ color: "#2c6370" }}>Share another story with the world</p>
      </div>
    </div>
  );
}


export default function MyPetsPage({ activePage, setActivePage }) {

  const sidebarBottom = <SidebarUserCard />;

  return (
    <Layout
      activePage={activePage ?? "my-pets"}
      setActivePage={setActivePage ?? (() => {})}
      sidebarBottom={sidebarBottom}
    >
        
        <div className="grid grid-cols-3 gap-8" >
          {PETS.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
          <AddPetCard />
        </div>

    </Layout>
  );
}
