import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/owner-admin/Sidebar';
import AddPets from '../../components/owner-admin/AddPets';
import apiClient from '../../services/apiClient';

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
        const data = await apiClient.get(`/shelter/pets/${id}`);
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
        await apiClient.put(`/shelter/pets/${id}`, formData);
      } else {
        await apiClient.post('/shelter/pets', formData);
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#e9f9ff]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <Sidebar activeTab="My Pets" />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-cyan-800 font-bold">
          Loading pet details...
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-error font-bold">
          {error}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddPets 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
