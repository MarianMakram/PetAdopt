import React, { useState, useEffect } from "react";
import SidebarUser from "../components/UserApprovalSiderbar";

// --- Custom Colors ---
// Primary: #004D56 (Dark Teal)
// Surface: #F4FBFC (Very Light Blue)
// Card Bg: #FFFFFF
// Accent Light: #DDF5F8
// Text Muted: #5A8C98
// Red/Reject: #FF6B6B
// Green/Approve: #257F86
// Brown/Warning: #A04A22

const Badge = ({ children, colorClass }) => (
  <span className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full ${colorClass}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  let variantStyle = "";
  if (variant === "primary") {
    variantStyle = "bg-[#257F86] text-white hover:bg-[#1E696F]";
  } else if (variant === "error") {
    variantStyle = "bg-[#FF6B6B] text-white hover:bg-[#E55A5A]";
  } else if (variant === "outline") {
    variantStyle = "bg-white text-[#004D56] hover:bg-gray-50 border border-transparent shadow-sm";
  }

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

const StatCard = ({ title, count, countColor }) => (
  <div className="bg-white px-6 py-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-w-[140px]">
    <h3 className="text-[#5A8C98] font-bold text-[11px] uppercase tracking-widest mb-2">{title}</h3>
    <div className={`text-[32px] font-bold leading-none ${countColor}`}>{count}</div>
  </div>
);

const SearchBar = ({ search, setSearch }) => (
  <div className="flex flex-1 max-w-md items-center bg-[#DDF5F8] rounded-full px-5 py-2.5">
    <svg className="w-5 h-5 text-[#5A8C98] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
    <input
      type="text"
      placeholder="Search by name, email or role..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-transparent outline-none text-[14px] font-[Be_Vietnam_Pro] text-[#004D56] placeholder:text-[#5A8C98]"
    />
  </div>
);

const UserRow = ({ user, onApprove, onReject }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const getRoleColor = (role) => {
    if (role.toLowerCase().includes("shelter")) return "bg-[#A7EAEF] text-[#004D56]";
    return "bg-[#C4E9ED] text-[#004D56]";
  };

  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#E3F6F8] text-[#004D56] flex items-center justify-center font-bold text-[14px] shrink-0">
            {getInitials(user.name)}
          </div>
          <div>
            <span className="font-bold text-[#004D56] text-[15px] block mb-0.5">{user.name}</span>
            <a href="#" className="flex items-center gap-1 text-[12px] font-semibold text-[#5A8C98] hover:text-[#004D56]">
              View Registration Details
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </td>
      <td className="p-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[#004D56] text-[14px]">{user.email}</span>
          <span className="text-[13px] text-[#5A8C98] font-medium">{user.phone}</span>
        </div>
      </td>
      <td className="p-6 text-[14px] font-medium text-[#5A8C98]">{user.location}</td>
      <td className="p-6">
        <Badge colorClass={getRoleColor(user.role)}>{user.role}</Badge>
      </td>
      <td className="p-6">
        <div className="flex items-center gap-3">
          <Button variant="error" onClick={() => onReject(user.id)}>Reject</Button>
          <Button variant="primary" onClick={() => onApprove(user.id)}>Approve</Button>
        </div>
      </td>
    </tr>
  );
};

const UserTable = ({ users, onApprove, onReject, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 bg-white rounded-3xl shadow-sm">
        <div className="w-10 h-10 border-4 border-[#E3F6F8] border-t-[#004D56] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-20 text-[#5A8C98] bg-white rounded-3xl shadow-sm">
        <p className="font-bold text-xl text-[#004D56]">No users found</p>
        <p className="text-[14px] mt-2">There are no pending registrations matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[#5A8C98] font-bold text-[11px] uppercase tracking-widest border-b border-gray-100">
            <th className="px-6 py-5">Full Name</th>
            <th className="px-6 py-5">Contact Information</th>
            <th className="px-6 py-5">Location</th>
            <th className="px-6 py-5">Role</th>
            <th className="px-6 py-5 text-right pr-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onApprove={onApprove} onReject={onReject} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TrustScoreCard = () => (
  <div className="bg-[#DDF5F8] rounded-[32px] p-8 flex-1 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
    <div className="relative z-10 max-w-md">
      <h3 className="text-[#004D56] font-[Plus_Jakarta_Sans] text-[22px] font-bold mb-3">Trust Score Summary</h3>
      <p className="text-[#004D56] text-[14px] font-medium leading-relaxed mb-6">
        Automated background checks have been completed for 92% of this week's registrants. Review flagged accounts immediately.
      </p>
      <a href="#" className="inline-flex items-center gap-2 text-[#004D56] font-bold text-[15px] hover:opacity-80 transition-opacity">
        View Fraud Report
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
    </div>
    {/* Decorative shape */}
    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C8EEF2] rounded-full opacity-50 flex items-center justify-center transform rotate-12">
      <svg className="w-32 h-32 text-[#EBF8F9] opacity-40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  </div>
);

const AwaitingReviewCard = () => (
  <div className="bg-[#F2F6F7] rounded-[32px] p-8 w-full md:w-[320px] flex flex-col justify-center min-h-[200px]">
    <h3 className="text-[#A04A22] font-bold text-[11px] uppercase tracking-widest mb-6">Awaiting Review</h3>
    <div className="text-[54px] font-[Plus_Jakarta_Sans] font-bold text-[#A04A22] leading-none mb-2">48h</div>
    <p className="text-[#004D56] text-[14px] font-bold">Average response time</p>
  </div>
);

export default function UserApprovalsPage() {
  const [activePage, setActivePage] = useState("approvals");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/adminusers/pending-user", {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const mappedData = data.map(user => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim() || 'Unknown User',
          email: user.email,
          phone: user.phone || 'N/A',
          location: [user.city, user.country].filter(Boolean).join(', ') || 'Unknown Location',
          role: user.role === 'shelter_owner' ? 'SHELTER ADMIN' : user.role === 'admin' ? 'SYSTEM ADMIN' : 'PRIVATE OWNER',
          status: user.account_status,
        }));
        setUsers(mappedData);
      } catch (err) {
        console.error("Failed to fetch pending users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/adminusers/approve-user/${id}`, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== id));
      showToast("User approved successfully!", "success");
    } catch (error) {
      console.error("Failed to approve user:", error);
      showToast("Failed to approve user.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`/api/adminusers/reject-user/${id}`, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== id));
      showToast("User rejected successfully.", "success");
    } catch (error) {
      console.error("Failed to reject user:", error);
      showToast("Failed to reject user.", "error");
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#F4FBFC] font-[Be_Vietnam_Pro]">
      {/* Use the provided SidebarUser Component */}
      <SidebarUser activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <main className="flex-1 px-10 py-12 overflow-y-auto max-w-[1200px]">
        {toast && (
          <div className={`fixed top-8 right-8 px-5 py-3 rounded-xl shadow-lg z-50 text-white font-bold text-[14px] transition-all duration-300 animate-fade-in-down ${toast.type === "success" ? "bg-[#257F86]" : "bg-[#FF6B6B]"}`}>
            {toast.message}
          </div>
        )}

        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-2xl">
            <h1 className="text-[36px] font-[Plus_Jakarta_Sans] font-bold text-[#004D56] tracking-tight mb-3">
              User Approvals
            </h1>
            <p className="text-[15px] text-[#5A8C98] font-medium leading-relaxed max-w-[480px]">
              Verify and manage registrations for shelters and independent pet owners joining the sanctuary ecosystem.
            </p>
          </div>
          <div className="flex gap-4">
            <StatCard title="PENDING" count={users.length > 0 ? users.length + 11 : 14} countColor="text-[#004D56]" />
            <StatCard title="FLAGGED" count={3} countColor="text-[#FF6B6B]" />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex justify-between items-center mb-8">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="flex items-center gap-3">
            <Button variant="outline">All Roles</Button>
            <Button variant="outline">Latest First</Button>
          </div>
        </div>

        {/* Table */}
        <UserTable users={filteredUsers} onApprove={handleApprove} onReject={handleReject} loading={loading} />

        {/* Bottom Cards */}
        <div className="flex flex-col md:flex-row gap-8">
          <TrustScoreCard />
          <AwaitingReviewCard />
        </div>
      </main>
    </div>
  );
}
