import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OwnerPets from './pages/owner-admin/OwnerPets';
import AdminApprovals from './pages/owner-admin/AdminApprovals';
import AddEditPet from './pages/owner-admin/AddEditPet';
import UserApprovalsPage from './pages/UserApprovalsPage';
import HomePage from './pages/HomePage/HomePage';
import BrowsePetsPage from './pages/BrowsePetsPage';
import PetDetailsPage from './pages/PetDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage/About Page';
import NotificationsPage from './pages/NotificationsPage';
import AdopterRequestsPage from './pages/AdopterRequestsPage';
import RequestsDashboard from './pages/owner-admin/RequestsDashboard';
import LoginForm from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/Profile';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Navbar from './components/shared/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20 w-full overflow-x-hidden"> {/* Add padding to account for fixed navbar */}
        <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/shelter" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<BrowsePetsPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/unauthorized" element={<div className="p-12 text-center text-xl font-bold">Unauthorized Access</div>} />

        {/* ADOPTER ROUTES */}
        <Route path="/favorites" element={
          <ProtectedRoute requiredRole="Adopter">
            <FavoritesPage />
          </ProtectedRoute>
        } />
        <Route path="/my-requests" element={
          <ProtectedRoute requiredRole="Adopter">
            <AdopterRequestsPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        {/* SHELTER ROUTES */}
        <Route path="/shelter/pets" element={
          <ProtectedRoute requiredRole="Shelter">
            <OwnerPets />
          </ProtectedRoute>
        } />
        <Route path="/shelter/pets/new" element={
          <ProtectedRoute requiredRole="Shelter">
            <AddEditPet />
          </ProtectedRoute>
        } />
        <Route path="/shelter/pets/:id/edit" element={
          <ProtectedRoute requiredRole="Shelter">
            <AddEditPet />
          </ProtectedRoute>
        } />
        <Route path="/shelter/requests" element={
          <ProtectedRoute requiredRole="Shelter">
            <RequestsDashboard />
          </ProtectedRoute>
        } />

        {/* ADMIN ROUTES */}
        <Route path="/admin/users" element={
          <ProtectedRoute requiredRole="Admin">
            <UserApprovalsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/pets" element={
          <ProtectedRoute requiredRole="Admin">
            <AdminApprovals />
          </ProtectedRoute>
        } />

        <Route path="*" element={<div className="p-12 text-center text-xl font-bold">Page Not Found</div>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
