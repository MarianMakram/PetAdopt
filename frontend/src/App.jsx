import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OwnerPets from './pages/owner-admin/OwnerPets';
import AdminApprovals from './pages/owner-admin/AdminApprovals';
import AddEditPet from './pages/owner-admin/AddEditPet';
import UserApprovalsPage from './pages/UserApprovalsPage';
import HomePage from './pages/HomePage';
import BrowsePetsPage from './pages/BrowsePetsPage';
import PetDetailsPage from './pages/PetDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<BrowsePetsPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/owner/pets" element={<OwnerPets />} />
        <Route path="/owner/pets/add" element={<AddEditPet />} />
        <Route path="/owner/pets/edit/:id" element={<AddEditPet />} />
        <Route path="/admin/approvals" element={<AdminApprovals />} />
        <Route path="/admin/users/pending" element={<UserApprovalsPage />} />
        <Route path="*" element={<div className="p-12 text-center text-xl font-bold">Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
