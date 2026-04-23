const [isLoggedIn, setIsLoggedIn] = useState(false);

{isLoggedIn && (
  <button
    onClick={() => setIsLoggedIn(false)}
    className="text-gray-700 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-red-500"
  >
    Logout
  </button>
)}
