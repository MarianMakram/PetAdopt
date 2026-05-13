import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import dog from "../../assets/images/dog.png";
import cat from "../../assets/images/cat.png";
import Hand from "../../assets/images/unnamed (4).png";
import Walking from "../../assets/images/Walking .png";

import HomeHero from './HomeHero';
import HomeFeaturedPets from './HomeFeaturedPets';
import HomeShelterCTA from './HomeShelterCTA';
import HomeStories from './HomeStories';
import HomeFooter from './HomeFooter';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ species: '', breed: '', age: '' });
  const [featuredPets, setFeaturedPets] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    apiClient.get('/pets')
      .then(response => {
        const data = response.data?.data || response.data;
        if (Array.isArray(data)) setFeaturedPets(data);
      })
      .catch(err => console.error("Error fetching pets:", err));

    if (user?.role === 'Adopter') {
      apiClient.get('/favorites')
        .then(response => setFavoriteIds(response.data.map(f => f.petId)))
        .catch(err => console.error("Error fetching favorites:", err));
    }
  }, [user]);

  const toggleFavorite = async (petId) => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'Adopter') return;
    const isFav = favoriteIds.includes(petId);
    try {
      if (isFav) {
        await apiClient.delete(`/favorites/${petId}`);
        setFavoriteIds(favoriteIds.filter(id => id !== petId));
      } else {
        await apiClient.post('/favorites', { petId });
        setFavoriteIds([...favoriteIds, petId]);
      }
    } catch (err) { console.error("Error toggling favorite:", err); }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchParams.species && searchParams.species !== 'All Animals') params.append('species', searchParams.species);
    if (searchParams.breed) params.append('breed', searchParams.breed);
    if (searchParams.age && searchParams.age !== 'Any Age') {
      if (searchParams.age === 'Puppy/Kitten') params.append('ageMax', '1');
      else if (searchParams.age === 'Adult') { params.append('ageMin', '1'); params.append('ageMax', '5'); }
      else if (searchParams.age === 'Senior') params.append('ageMin', '6');
    }
    navigate(`/pets?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <main className="">
        <HomeHero user={user} navigate={navigate} searchParams={searchParams} setSearchParams={setSearchParams} handleSearch={handleSearch} dog={dog} />
        <HomeFeaturedPets featuredPets={featuredPets} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} user={user} cat={cat} />
        <HomeShelterCTA Hand={Hand} />
        <HomeStories Walking={Walking} />
      </main>
      <HomeFooter />
    </div>
  );
}