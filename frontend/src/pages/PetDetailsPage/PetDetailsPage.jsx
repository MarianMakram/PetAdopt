import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';

import PetGalleryVisuals from './PetGalleryVisuals';
import PetProfileHeader from './PetProfileHeader';
import PetAttributesGrid from './PetAttributesGrid';
import PetNarrativeStory from './PetNarrativeStory';
import PetPrimaryActions from './PetPrimaryActions';
import PetFeedbackReviews from './PetFeedbackReviews';
import PetAdoptionInquiryModal from './PetAdoptionInquiryModal';

import PetDetailsLoadingState from './PetDetailsLoadingState';
import PetDetailsNotFoundState from './PetDetailsNotFoundState';

import dog from "../../assets/images/dog1.jpg";

export default function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [adoptMessage, setAdoptMessage] = useState("");
  const [whyThisPet, setWhyThisPet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPetDetails();
    fetchReviews();
    if (user) checkFavorite();
  }, [id, user]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/pets/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object' && data.id) {
        setPet(data);
      } else {
        setPet(null);
      }
    } catch (err) {
      console.error("Error fetching pet details:", err);
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/pet/${id}`);
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await apiClient.get(`/favorites`);
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) {
        setIsFavorite(data.some(f => f.petId === parseInt(id)));
      }
    } catch (err) {
      console.error("Error checking favorite:", err);
    }
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setIsSubmitting(true);
    try {
      await apiClient.post(`/adoption-requests`, {
        petId: parseInt(id),
        message: adoptMessage,
        whyThisPet: whyThisPet
      });
      setSuccess(true);
      setAdoptMessage("");
      setWhyThisPet("");
      setTimeout(() => {
        setIsAdoptModalOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      if (isFavorite) {
        await apiClient.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await apiClient.post(`/favorites`, { petId: parseInt(id) });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Favorite toggle failed", err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      const response = await apiClient.post(`/reviews`, {
        petId: parseInt(id),
        rating: newReview.rating,
        comment: newReview.comment
      });
      const data = response.data?.data || response.data;
      setReviews([data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      alert(err.response?.data || "Only adopters who adopted this pet can leave a review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <PetDetailsLoadingState />;

  if (!pet || !pet.name) return <PetDetailsNotFoundState />;


  const images = pet.imageUrls ? pet.imageUrls.split(',') : [dog];

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-cyan-100">
      <main className="pb-24 px-8 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <PetGalleryVisuals 
            pet={pet} 
            user={user} 
            isFavorite={isFavorite} 
            toggleFavorite={toggleFavorite} 
            images={images} 
          />

          <div className="flex flex-col justify-center">
            <PetProfileHeader pet={pet} />
            <PetAttributesGrid pet={pet} />
            <PetNarrativeStory pet={pet} />
            <PetPrimaryActions 
              pet={pet} 
              user={user} 
              navigate={navigate} 
              setIsAdoptModalOpen={setIsAdoptModalOpen} 
            />
          </div>
        </div>

        <PetFeedbackReviews 
          pet={pet} 
          user={user} 
          reviews={reviews} 
          newReview={newReview} 
          setNewReview={setNewReview} 
          submitReview={submitReview} 
          submittingReview={submittingReview} 
        />
      </main>

      <PetAdoptionInquiryModal 
        pet={pet} 
        isAdoptModalOpen={isAdoptModalOpen} 
        setIsAdoptModalOpen={setIsAdoptModalOpen} 
        success={success} 
        handleAdoptSubmit={handleAdoptSubmit} 
        adoptMessage={adoptMessage} 
        setAdoptMessage={setAdoptMessage} 
        whyThisPet={whyThisPet} 
        setWhyThisPet={setWhyThisPet} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
