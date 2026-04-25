import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../shared/PetCard';
import apiClient from '../../services/apiClient';

export default function PetGrid({ pets, loading, error, setPets }) {
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await apiClient.delete(`/shelter/pets/${id}`);
        // Remove pet from local state after successful deletion
        setPets(prevPets => prevPets.filter(pet => pet.id !== id));
      } catch (err) {
        console.error("Failed to delete pet", err);
        alert("Failed to delete pet. Please try again.");
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-cyan-800">Loading pets...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;

  return (
    <div id="pets-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pets.length > 0 ? (
        pets.map(pet => (
          <PetCard key={pet.id} pet={pet} onDelete={handleDelete} />
        ))
      ) : (
        <div className="col-span-full p-8 text-center text-cyan-800 bg-surface-container rounded-xl">
          No pets found. Why not add one?
        </div>
      )}
      
      {/* Empty State / Add New Card */}
      <Link to="/shelter/pets/new" className="group relative border-2 border-dashed border-outline-variant/50 rounded-xl p-4 flex flex-col items-center justify-center gap-4 hover:bg-surface-container-low hover:border-primary transition-all duration-300 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-4xl">add_circle</span>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-on-surface mb-1">Add Another Pet</p>
          <p className="text-on-surface-variant text-sm">Share another story with the world</p>
        </div>
      </Link>
    </div>
  );
}
