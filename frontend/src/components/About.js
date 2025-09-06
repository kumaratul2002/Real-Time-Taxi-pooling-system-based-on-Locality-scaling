import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* How It Works Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It <span className="text-yellow-400">Works</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Get started with AutoPool in just a few simple steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 - Register */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl text-gray-900 font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  ✋
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Register</h3>
              <p className="text-white/70 leading-relaxed">
                Create your account and join our community of smart travelers
              </p>
            </div>

            {/* Step 2 - Login */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-3xl text-gray-900 font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  👤
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Login</h3>
              <p className="text-white/70 leading-relaxed">
                Sign in securely and access your personalized dashboard
              </p>
            </div>

            {/* Step 3 - Find Pools */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  🗺️
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Find Nearby Pools</h3>
              <p className="text-white/70 leading-relaxed">
                Discover available pools in your area and choose your ride
              </p>
            </div>

            {/* Step 4 - Board Safely */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  🚗
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Board Safely</h3>
              <p className="text-white/70 leading-relaxed">
                Connect with verified travelers and enjoy your safe journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                About <span className="text-yellow-400">Us</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                AutoPool is revolutionizing the way people travel by connecting 
                like-minded individuals who want to share rides, reduce costs, 
                and minimize their environmental impact.
              </p>
              <p className="text-base text-white/70 leading-relaxed">
                Our platform uses advanced locality-based scaling to ensure you 
                find the most convenient and efficient ride-sharing options in 
                your area. Join thousands of users who are already saving money 
                and helping the environment.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1000+</div>
                  <div className="text-white/70">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">50+</div>
                  <div className="text-white/70">Cities Covered</div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🌍</div>
                  <h3 className="text-2xl font-bold text-white">Making Travel Sustainable</h3>
                  <p className="text-white/70">One ride at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
