import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OwnerPets from './pages/owner-admin/OwnerPets';
import AdminApprovals from './pages/owner-admin/AdminApprovals';
import AddEditPet from './pages/owner-admin/AddEditPet';
import UserApprovalsPage from './pages/UserApprovalsPage';
import HomePage from './pages/HomePage';
import BrowsePetsPage from './pages/BrowsePetsPage';
import PetDetailsPage from './pages/PetDetailsPage';
<<<<<<< HEAD
import LoginForm from './pages/Login';
import Register from './pages/Register';
=======
>>>>>>> 4054b8c0664a2fe1971e1d5003228c4a9d2222ad
import FavoritesPage from './pages/FavoritesPage';
import AdopterRequestsPage from './pages/AdopterRequestsPage';
import RequestsDashboard from './pages/owner-admin/RequestsDashboard';
<<<<<<< HEAD
=======
import LoginForm from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/Profile';

>>>>>>> 4054b8c0664a2fe1971e1d5003228c4a9d2222ad

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<BrowsePetsPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/requests" element={<AdopterRequestsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/owner/pets" element={<OwnerPets />} />
        <Route path="/owner/pets/add" element={<AddEditPet />} />
        <Route path="/owner/pets/edit/:id" element={<AddEditPet />} />
        <Route path="/owner/requests" element={<RequestsDashboard />} />
        <Route path="/admin/approvals" element={<AdminApprovals />} />
        <Route path="/admin/users/pending" element={<UserApprovalsPage />} />
        <Route path="*" element={<div className="p-12 text-center text-xl font-bold">Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
