import React from "react";

const home = ({ automation }) => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col justify-center items-center px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="logo text-4xl md:text-5xl font-bold text-white mb-2">
            Auto<span className="text-yellow-400">Pool</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Save your <span className="text-yellow-400">MONEY</span>,
              <span className="text-green-400"> ENERGY</span> &
              <span className="text-blue-400"> ENVIRONMENT</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join the future of smart transportation! Share rides, reduce
              costs, and help save our planet.
            </p>

            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Connect with fellow travelers and make every journey more
              sustainable and affordable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn1 group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                🌐 Visit our Webpage
              </span>
            </button>

            <button className="btn2 group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                🔐 LOGIN
              </span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
            <div className="text-center space-y-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="text-4xl">💰</div>
              <p className="text-white/80 font-medium">Save Money</p>
              <p className="text-white/60 text-sm">Split costs with others</p>
            </div>
            <div className="text-center space-y-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="text-4xl">🌱</div>
              <p className="text-white/80 font-medium">Eco Friendly</p>
              <p className="text-white/60 text-sm">Reduce carbon footprint</p>
            </div>
            <div className="text-center space-y-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="text-4xl">🤝</div>
              <p className="text-white/80 font-medium">Meet People</p>
              <p className="text-white/60 text-sm">Connect with travelers</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default home;
