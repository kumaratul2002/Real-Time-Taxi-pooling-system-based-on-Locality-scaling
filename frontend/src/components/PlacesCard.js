import React from 'react';
import { Link } from 'react-router-dom';

const PlacesCards = ({ places }) => {
  const getPlaceIcon = (name) => {
    const icons = {
      'zoo': '🦁',
      'Bus': '🚌', 
      'kesal': '🏘️',
      'Station': '🚂',
      'Divine': '⛪',
      'Iskon': '🕉️',
      'Jyotisar': '🌟',
      'Peepli': '🏞️'
    };
    return icons[name] || '📍';
  };

  const getGradientColor = (index) => {
    const gradients = [
      'from-yellow-400 to-orange-500',
      'from-green-400 to-teal-500', 
      'from-blue-400 to-indigo-500',
      'from-purple-400 to-pink-500',
      'from-teal-400 to-cyan-500',
      'from-orange-400 to-red-500',
      'from-pink-400 to-rose-500',
      'from-indigo-400 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-yellow-400">Destination</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Select from available destinations and find your perfect ride pool
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {places.map((place, index) => (
            <Link 
              key={place.id} 
              to={`/PoolMemberDetails/${place.name}`}
              className="group block transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:border-white/30">
                {/* Card Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${getGradientColor(index)} relative overflow-hidden`}>
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
                    <div className="absolute top-4 right-4 text-3xl drop-shadow-lg">
                      {getPlaceIcon(place.name)}
                    </div>
                  </div>
                  
                  {/* Pool indicator */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Active Pools
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {place.name}
                    </h3>
                    <div className="flex items-center text-white/60">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-4 text-sm leading-relaxed">
                    {place.location}
                  </p>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60 font-medium">
                      View Pool Members
                    </span>
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-400/20 rounded-full group-hover:bg-yellow-400/30 transition-colors duration-300">
                      <svg className="w-4 h-4 text-yellow-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`h-1 bg-gradient-to-r ${getGradientColor(index)}`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don't see your destination?
            </h3>
            <p className="text-white/70 mb-6">
              Create a new pool for your desired location and let others join you
            </p>
            <Link 
              to="/addPools"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
            >
              🚗 Create New Pool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesCards;
