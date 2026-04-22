const http = require('http');

let mockPets = [
  { id: 1, name: "Barnaby", breed: "Golden Retriever", species: 0, age: 2, ageUnit: 1, gender: 0, status: 2, location: "Portland, OR", health: "Vaccinated", description: "Barnaby is more than just a pet; he's a companion.", imageUrls: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJNcQNaUeruQXRhJCIKYw24rLGBBNHfIdt8fWs4zvgXkHWqEVSADfAs0KI9QRG59E8F_ryatVM2ktVk-2-M6OSY4ITovd2WqqUVd5qchN7rBYd2CS4pDx6Obpr5QdTeFnaN22PPhdKLbFxGuz6d2M36ZIc2uGG-Z3Mo-2MC1t31Uq4KXXGJT3tzJgiyEGTTCfAyS9NykACMdfjeZUESOHC6E_3YHq3AcNuAy8pZns45MkSbbo75L5_IpljvJ0JTDzAzM6W_Xn5sbA,https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6vuGnTOmW9TeE9hLhoiY9kzuEroTVCoxmvBt4LUey-LYP1OPMjtQH8M1RfE-tJ53jLoCWQ5zqEMMJIyeeseDqbRcR5U0jOo-Y_HyZLa0LOFfQYsdloH5D6DDiKRXXObi8H4R5zxDp08DXJ7Pwr8e7REhTPnRYzdtBvUefCsztKTAjZLqHUfSG0kNTaqJH7U6EW8zMn3fxZ7GKDa-rIGqete35rTUeYmr6qke10u6E94AHBbcub5vJ-GWK87isDha6NkBOd0qe-Q", ownerId: 101, fee: "$350" },
  { id: 2, name: "Midnight", breed: "Bombay Cat", species: 1, age: 6, ageUnit: 0, gender: 1, status: 2, location: "Seattle, WA", description: "Quiet shadow.", imageUrls: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjbO8eRySLmdFdTL9aEsCy136_szJigYHGQ_8MKM_lOKe9WVE8b7G2B6T9mKQpBoOIPam2L4ydB5_h8AqKh62qpQZ0_kOHeClTSNR9KpyxvaouuLagJFL68U6OBoMExR4Pq_IOpkoTnezFVH9VMPXLitM1C-wOQWejvvgZRrKA-y5Gk8-Wxaox_BSqTl9O3CHYZ5bU4AgpGny6tOBDa7_T93fdbXfxdaLBcSUvf0qHKHM6y739cXZvMWP57PMIDSAErYI0u57GHBE", ownerId: 101 },
  { id: 3, name: "Luna", breed: "Frenchie", species: 0, age: 1, ageUnit: 1, gender: 1, status: 1, location: "Austin, TX", description: "Small package.", imageUrls: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdKrAYTlEilblYozCaYdp8p264YQT7mVFqXhmmehF-AB3X5enbWMtqT35u7THdVzxaovoxEJQBBv9UIV_zehgJhVCOQm9bp5PCzuC2dtQU5fd3sEOdqA7CEL9bCUaOK38FcFVKIperWBIjAPvm0nPZnDOPgWf-EdsdIVex-lzJTOganx93lm0ND9GZl82mcx4eMc59_slfzYZW6awcnVsxjmdWHK4kejyd4v9EDI9xprn4cAKv2kVDTfgDivQ2cTzwAFLfi4yRPeE", ownerId: 102 }
];

let mockRequests = [
  { id: 1, petId: 1, adopterId: 101, requestedAt: new Date().toISOString(), status: 0, pet: mockPets[0], adopter: { id: 101, name: "Eleanor Vance" } },
  { id: 2, petId: 2, adopterId: 102, requestedAt: new Date().toISOString(), status: 0, pet: mockPets[1], adopter: { id: 102, name: "Marcus Sterling" } }
];

let mockFavorites = [];
let mockReviews = [];
let mockUsers = [
  { id: 101, firstName: "Eleanor", lastName: "Vance", account_status: 2, role: 1 },
  { id: 102, firstName: "Marcus", lastName: "Sterling", account_status: 1, role: 1 }
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // Pets API (Public)
  if (path === '/api/pets' && req.method === 'GET') {
    const search = url.searchParams.get('search')?.toLowerCase();
    const species = url.searchParams.get('species');
    let filtered = mockPets.filter(p => p.status === 2); // Only approved
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.breed.toLowerCase().includes(search));
    if (species) filtered = filtered.filter(p => p.species === parseInt(species));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: filtered.length, data: filtered }));
  } 
  else if (path.match(/\/api\/pets\/(\d+)/) && req.method === 'GET') {
    const id = parseInt(path.split('/').pop());
    const pet = mockPets.find(p => p.id === id);
    if (pet) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(pet)); }
    else { res.writeHead(404); res.end(); }
  }

  // Pet API (Owner/Admin - CRUD)
  else if (path === '/api/Pet' && req.method === 'GET') {
    const status = url.searchParams.get('status');
    let filtered = mockPets;
    if (status !== 'all') filtered = mockPets.filter(p => p.status === 2);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filtered));
  }
  else if (path === '/api/Pet' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const pet = JSON.parse(body);
      pet.id = Date.now();
      pet.status = 1; // Pending
      mockPets.push(pet);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pet));
    });
  }
  else if (path.match(/\/api\/Pet\/(\d+)/) && req.method === 'GET') {
    const id = parseInt(path.split('/').pop());
    const pet = mockPets.find(p => p.id === id);
    if (pet) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(pet)); }
    else { res.writeHead(404); res.end(); }
  }
  else if (path.match(/\/api\/Pet\/(\d+)/) && req.method === 'PUT') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const id = parseInt(path.split('/').pop());
      const petIndex = mockPets.findIndex(p => p.id === id);
      if (petIndex > -1) {
        mockPets[petIndex] = { ...mockPets[petIndex], ...JSON.parse(body) };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockPets[petIndex]));
      } else { res.writeHead(404); res.end(); }
    });
  }
  else if (path.match(/\/api\/Pet\/(\d+)/) && req.method === 'DELETE') {
    const id = parseInt(path.split('/').pop());
    mockPets = mockPets.filter(p => p.id !== id);
    res.writeHead(204); res.end();
  }

  // Adoption Requests API
  else if (path === '/api/adoption-requests' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockRequests.filter(r => r.adopterId === 2 || r.adopterId === 101)));
  }
  else if (path === '/api/adoption-requests' && req.method === 'POST') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      const { petId, message } = JSON.parse(body);
      const pet = mockPets.find(p => p.id === petId);
      const reqObj = { id: Date.now(), petId, adopterId: 2, message, status: 0, requestedAt: new Date().toISOString(), pet };
      mockRequests.push(reqObj);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(reqObj));
    });
  }

  // Shelter Requests (B3)
  else if (path === '/api/shelter/requests' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockRequests));
  }
  else if (path.match(/\/api\/shelter\/requests\/(\d+)\/accept/) && req.method === 'PATCH') {
    const match = path.match(/\/api\/shelter\/requests\/(\d+)\/accept/);
    const id = parseInt(match[1]);
    const r = mockRequests.find(x => x.id === id);
    if (r) { r.status = 1; const p = mockPets.find(x => x.id === r.petId); if (p) p.status = 3; }
    res.writeHead(200); res.end(JSON.stringify({ success: true }));
  }
  else if (path.match(/\/api\/shelter\/requests\/(\d+)\/reject/) && req.method === 'PATCH') {
    const match = path.match(/\/api\/shelter\/requests\/(\d+)\/reject/);
    const id = parseInt(match[1]);
    const r = mockRequests.find(x => x.id === id);
    if (r) r.status = 2;
    res.writeHead(200); res.end(JSON.stringify({ success: true }));
  }

  // Admin Users / Approvals (B1)
  else if (path === '/api/AdminUsers/pending-pets' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockPets.filter(p => p.status === 1)));
  }
  else if (path.match(/\/api\/AdminUsers\/approve-pet\/(\d+)/) && req.method === 'POST') {
    const id = parseInt(path.split('/').pop());
    const p = mockPets.find(x => x.id === id);
    if (p) p.status = 2;
    res.writeHead(200); res.end(JSON.stringify({ message: "Approved" }));
  }
  else if (path.match(/\/api\/AdminUsers\/reject-pet\/(\d+)/) && req.method === 'POST') {
    const id = parseInt(path.split('/').pop());
    const p = mockPets.find(x => x.id === id);
    if (p) p.status = 4;
    res.writeHead(200); res.end(JSON.stringify({ message: "Rejected" }));
  }
  else if (path === '/api/AdminUsers/pending-user' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockUsers.filter(u => u.account_status === 1)));
  }
  else if (path.match(/\/api\/AdminUsers\/approve-user\/(\d+)/) && req.method === 'PATCH') {
    const id = parseInt(path.split('/').pop());
    const u = mockUsers.find(x => x.id === id);
    if (u) u.account_status = 2;
    res.writeHead(200); res.end(JSON.stringify({ message: "Approved" }));
  }
  else if (path.match(/\/api\/AdminUsers\/reject-user\/(\d+)/) && req.method === 'PATCH') {
    const id = parseInt(path.split('/').pop());
    const u = mockUsers.find(x => x.id === id);
    if (u) u.account_status = 4;
    res.writeHead(200); res.end(JSON.stringify({ message: "Rejected" }));
  }

  // Favorites & Reviews
  else if (path === '/api/favorites' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockFavorites));
  }
  else if (path === '/api/favorites' && req.method === 'POST') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      const { petId } = JSON.parse(body);
      const pet = mockPets.find(p => p.id === petId);
      const f = { id: Date.now(), petId, userId: 2, pet };
      mockFavorites.push(f);
      res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(f));
    });
  }
  else if (path.match(/\/api\/favorites\/(\d+)/) && req.method === 'DELETE') {
    const petId = parseInt(path.split('/').pop());
    mockFavorites = mockFavorites.filter(f => f.petId !== petId);
    res.writeHead(204); res.end();
  }
  else if (path.startsWith('/api/reviews/pet/') && req.method === 'GET') {
    const petId = parseInt(path.split('/').pop());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockReviews.filter(r => r.petId === petId)));
  }
  else if (path === '/api/reviews' && req.method === 'POST') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      const r = JSON.parse(body); r.id = Date.now(); r.createdAt = new Date().toISOString();
      r.adopter = { firstName: "Mock", lastName: "User" };
      mockReviews.push(r);
      res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(r));
    });
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

server.listen(5251, () => {
  console.log('Mock server listening on port 5251');
});
