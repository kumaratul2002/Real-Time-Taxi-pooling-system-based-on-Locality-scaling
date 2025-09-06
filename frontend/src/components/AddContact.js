import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from "@auth0/auth0-react";

const Add = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    time: "",
    phone: "",
    place: "",
  });

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  // Auto-populate name when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && user.name && !input.name) {
      setInput(prev => ({ ...prev, name: user.name }));
    }
  }, [isAuthenticated, user, input.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check authentication first
    if (!isAuthenticated || !user) {
      toast.error("Please log in to join a pool");
      return;
    }
    
    if (!input.name || !input.time || !input.phone || !input.place) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate departure time is in the future
    const departureTime = new Date(input.time);
    const currentTime = new Date();
    
    if (departureTime <= currentTime) {
      toast.error("Departure time must be in the future");
      return;
    }

    setIsLoading(true);
    try {
      // Include Auth0 user ID in the request
      const poolData = {
        ...input,
        userId: user.sub // Auth0 unique user identifier
      };
      
      await axios.post("http://localhost:9000/api/v1/users", poolData);
      setRender(!render);
      setInput({
        name: "",
        time: "",
        phone: "",
        place: "",
      });
      toast.success("Successfully created your pool! 🎉");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create pool. Please try again.");
      }
      console.error('Error creating pool:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Get minimum datetime (current time) for the datetime-local input
  const getMinDateTime = () => {
    const now = new Date();
    // Add 5 minutes to current time to give some buffer
    now.setMinutes(now.getMinutes() + 5);
    return now.toISOString().slice(0, 16);
  };

  // Show loading while Auth0 is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-6xl mb-6">🔐</div>
            <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
            <p className="text-white/70 mb-6">
              You need to be logged in to create a pool. Please log in to continue.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300">
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create a <span className="text-yellow-400">Pool</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Start your journey by creating a new ride pool. Connect with fellow travelers heading in the same direction.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block mb-3 text-sm font-medium text-white">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block mb-3 text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={input.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Destination Field */}
            <div>
              <label htmlFor="place" className="block mb-3 text-sm font-medium text-white">
                Destination
              </label>
              <select
                id="place"
                name="place"
                value={input.place}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              >
                <option value="" className="bg-gray-800 text-white">Select your destination</option>
                <option value="zoo" className="bg-gray-800 text-white">Zoo (Peepli)</option>
                <option value="Bus" className="bg-gray-800 text-white">Bus Stand</option>
                <option value="kesal" className="bg-gray-800 text-white">Kesal</option>
                <option value="Station" className="bg-gray-800 text-white">Railway Station</option>
                <option value="Divine" className="bg-gray-800 text-white">Divine</option>
                <option value="Iskon" className="bg-gray-800 text-white">Iskon</option>
                <option value="Jyotisar" className="bg-gray-800 text-white">Jyotisar</option>
                <option value="Peepli" className="bg-gray-800 text-white">Peepli</option>
              </select>
            </div>

            {/* Departure Time Field */}
            <div>
              <label htmlFor="time" className="block mb-3 text-sm font-medium text-white">
                Departure Time
              </label>
              <input
                type="datetime-local"
                id="time"
                name="time"
                value={input.time}
                onChange={handleInputChange}
                min={getMinDateTime()}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <p className="text-white/50 text-sm mt-2">
                Select when you plan to depart for your destination
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    Creating Pool...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🚗 Create Pool
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-white mb-2">Save Money</h3>
            <p className="text-white/70 text-sm">Split travel costs with other passengers</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-lg font-semibold text-white mb-2">Eco Friendly</h3>
            <p className="text-white/70 text-sm">Reduce carbon footprint by sharing rides</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold text-white mb-2">Meet People</h3>
            <p className="text-white/70 text-sm">Connect with like-minded travelers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
