import React, { useState, useEffect } from "react";
import Sidebar from "../components/owner-admin/Sidebar";
import Header from "../components/owner-admin/Header";
import BottomNav from "../components/owner-admin/BottomNav";
import apiClient from "../services/apiClient";

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
    if (role?.toLowerCase().includes("shelter")) return "bg-[#A7EAEF] text-[#004D56]";
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
            <span className="text-[12px] font-semibold text-[#5A8C98]">User Verification</span>
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
      <td className="p-6 whitespace-nowrap">
        <div className="flex items-center justify-end gap-3 pr-4">
          {user.status === "Pending" ? (
            <>
              <Button variant="primary" onClick={() => onApprove(user.id)}>Approve</Button>
              <Button variant="error" onClick={() => onReject(user.id)}>Reject</Button>
            </>
          ) : user.status === "Approved" ? (
             <span className="text-[#257F86] font-bold text-[13px]">Approved</span>
          ) : (
             <span className="text-[#FF6B6B] font-bold text-[13px]">Rejected</span>
          )}
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

export default function UserApprovalsPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('Pending');
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/admin/users/status/${filter}`);
      const dataArray = response.data || [];
      const mappedData = dataArray.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
        phone: user.phone || 'N/A',
        location: [user.city, user.country].filter(Boolean).join(', ') || 'Unknown',
        role: user.role === "Shelter" ? 'SHELTER' : 'ADOPTER',
        status: user.account_status,
      }));
      setUsers(mappedData);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id) => {
    try {
      await apiClient.patch(`/admin/users/${id}/approve`);
      fetchUsers();
      showToast("User approved successfully!", "success");
    } catch (error) {
      showToast("Failed to approve user.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.patch(`/admin/users/${id}/reject`);
      fetchUsers();
      showToast("User rejected successfully.", "success");
    } catch (error) {
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
    <div className="flex">
      <Sidebar activeTab="User Approvals" />
      <main className="flex-1 min-h-screen pb-24 md:pb-12 overflow-y-auto bg-[#F4FBFC] font-[Be_Vietnam_Pro] w-full relative">
        <Header />
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        {toast && (
          <div className={`fixed top-8 right-8 px-5 py-3 rounded-xl shadow-lg z-50 text-white font-bold text-[14px] transition-all duration-300 animate-fade-in-down ${toast.type === "success" ? "bg-[#257F86]" : "bg-[#FF6B6B]"}`}>
            {toast.message}
          </div>
        )}
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-2xl">
            <h1 className="text-[36px] font-[Plus_Jakarta_Sans] font-bold text-[#004D56] tracking-tight mb-3">User Approvals</h1>
            <p className="text-[15px] text-[#5A8C98] font-medium leading-relaxed max-w-[480px]">
              Verify and manage registrations for shelters and independent pet owners joining the sanctuary ecosystem.
            </p>
          </div>
          <div className="flex gap-4">
            <StatCard title="CURRENT VIEW" count={users.length} countColor="text-[#004D56]" />
          </div>
        </div>
        <div className="flex justify-between items-center mb-8 gap-4">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#A7EAEF]/30">
            {['Pending', 'Approved', 'Rejected'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === t ? 'bg-[#257F86] text-white shadow-md' : 'text-[#257F86] hover:bg-[#F4FBFC]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <UserTable users={filteredUsers} onApprove={handleApprove} onReject={handleReject} loading={loading} />
        </div>
      </main>
      <BottomNav activeTab="Approvals" />
    </div>
  );
}
