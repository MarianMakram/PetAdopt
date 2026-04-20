import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarAdd from '../../components/owner-admin/SidebarAdd';
import AddPets from '../../components/owner-admin/AddPets';
import { apiClient } from '../../services/apiClient';

export default function AddEditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      if (!isEditMode) return;
      try {
        const data = await apiClient.get(`/api/Pet/${id}`);
        setInitialData(data);
      } catch (err) {
        console.error("Failed to fetch pet", err);
        setError("Failed to load pet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await apiClient.put(`/api/Pet/${id}`, formData);
      } else {
        await apiClient.post('/api/Pet', formData);
      }
      navigate('/owner/pets');
    } catch (err) {
      console.error("Failed to save pet", err);
      alert("Failed to save pet. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate('/owner/pets');
  };

  // Sidebar props required by SidebarAdd
  const sidebarBottom = (
    <div className="mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#bff0ff]/60">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzJJN_uXhQWoDsvZyNEx9yFSEE9ZwaJNrxpCa1dR_28YaC5y1pG-VZ6fi8NoPdm8cu4Nw3Szqa-kNa0MknxISWYv6PUVrWK18fetYy07pxqSb26tlrHOBRm4VJaMcH8G_edy6KGwRgeE1f-vTfDO8XMx-WgkfQNOg0wgoJldIMGClNI0_eVx2vWPYmfamk3Jv9p7LyjIH_jFNuzX44GBtUMPANBw9eXtko0mALDiQbTkR67sbfn27NIAdhQ_kFbgqVJsiKbya9Atg" alt="Admin" className="w-8 h-8 rounded-full object-cover shrink-0" />
      <div className="overflow-hidden">
        <p className="text-[11px] font-bold text-[#00343e] truncate">Admin User</p>
        <p className="text-[10px] text-[#2c6370]">Admin</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#e9f9ff]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <SidebarAdd
        activePage="my-pets"
        sidebarBottom={sidebarBottom}
        title="Shelter Portal"
        subtitle="Manage your sanctuary"
      />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-cyan-800 font-bold">
          Loading pet details...
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-error font-bold">
          {error}
        </div>
      ) : (
        <AddPets 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}
