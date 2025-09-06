import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth0 } from "@auth0/auth0-react";

const ContactList = ({ id, contacts, deleteContact, selectContact }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:9000/api/v1/users");
        setUsers(res.data);
      } catch (error) {
        toast.error('Failed to load pool members');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [render]);

  const handelDelete = async (poolId, memberUserId) => {
    // Double check permissions before deleting
    if (!isAuthenticated) {
      toast.error('You must be logged in to perform this action');
      return;
    }
    
    if (user.sub !== memberUserId) {
      toast.error('You can only delete pools that you created');
      return;
    }

    // Confirm deletion with more specific message
    const confirmMessage = `Are you sure you want to delete your pool entry for ${id}?\n\nThis will remove your pool from the system and other members won't be able to see it anymore.\n\nThis action cannot be undone.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:9000/api/v1/users/${poolId}`);
      const newUsers = users.filter((item) => {
        return item._id !== poolId;
      });
      setUsers(newUsers);
      toast.success(`Successfully deleted your pool for ${id}! 🗑️`);
    } catch (error) {
      toast.error('Failed to delete pool. Please try again.');
      console.error('Error deleting pool:', error);
    }
  };

  const isCurrentUserPool = (memberUserId) => {
    return isAuthenticated && user && user.sub === memberUserId;
  };

  const getDestinationIcon = (place) => {
    const icons = {
      'zoo': '🦁',
      'Bus': '🚌', 
      'kesal': '🏘️',
      'Station': '🚉',
      'Divine': '🏛️',
      'Iskon': '🕉️',
      'Jyotisar': '🌸',
      'Peepli': '🌾',
      'kkr': '🏙️'
    };
    return icons[place] || '📍';
  };

  const getTimeStatus = (departureTime) => {
    const now = new Date();
    const departure = new Date(departureTime);
    const timeDiff = departure - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 1) {
      return { status: 'urgent', label: 'Leaving Soon!', color: 'text-red-600 bg-red-100' };
    } else if (hoursDiff < 3) {
      return { status: 'soon', label: 'Leaving Soon', color: 'text-orange-600 bg-orange-100' };
    } else if (hoursDiff < 24) {
      return { status: 'today', label: 'Today', color: 'text-blue-600 bg-blue-100' };
    } else {
      return { status: 'future', label: 'Future', color: 'text-green-600 bg-green-100' };
    }
  };

  // Filter users by destination and exclude expired pools
  const filteredUsers = users.filter(user => {
    const departureTime = new Date(user.time);
    const currentTime = new Date();
    return user.place === id && departureTime > currentTime;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pool members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mr-4">
              <span className="text-3xl">{getDestinationIcon(id)}</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Pool Members for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {id}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} heading to this destination
              </p>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{filteredUsers.length}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.floor(filteredUsers.length / 4) || 1}
                </div>
                <div className="text-sm text-gray-600">Available Pools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Pool Members Yet</h3>
            <p className="text-gray-600 mb-8">Be the first to join a pool to this destination!</p>
            <Link
              to="/addPools"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Join a Pool
            </Link>
          </div>
        ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredUsers.map((member) => {
               const isOwner = isCurrentUserPool(member.userId);
               const timeStatus = getTimeStatus(member.time);
               return (
                 <div
                   key={member._id}
                   className={`bg-white rounded-3xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group ${
                     isOwner 
                       ? 'border-green-200 ring-2 ring-green-100' 
                       : 'border-gray-100'
                   }`}
                 >
                   {/* Card Header */}
                   <div className={`p-6 text-white relative ${
                     isOwner 
                       ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                       : 'bg-gradient-to-r from-blue-500 to-purple-600'
                   }`}>
                     {/* Owner Badge */}
                     {isOwner && (
                       <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                         <span className="text-xs font-semibold">Your Pool</span>
                       </div>
                     )}
                     
                     {/* Time Status Badge */}
                     {!isOwner && (
                       <div className={`absolute top-2 right-2 backdrop-blur-sm rounded-full px-3 py-1 ${timeStatus.color}`}>
                         <span className="text-xs font-semibold">{timeStatus.label}</span>
                       </div>
                     )}
                     
                     <div className="flex items-center justify-between">
                       <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                         {isOwner ? (
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         ) : (
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                           </svg>
                         )}
                       </div>
                       <div className="text-right">
                         <span className="text-2xl">{getDestinationIcon(member.place)}</span>
                       </div>
                     </div>
                     <h3 className="text-xl font-bold mt-4 mb-1">{member.name}</h3>
                     <p className="text-white/80 text-sm">
                       {isOwner ? 'Pool Creator (You)' : 'Pool Member'}
                     </p>
                   </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                                         <div>
                       <p className="text-sm text-gray-500">Departure Time</p>
                       <p className="font-semibold">
                         {new Date(member.time).toLocaleString('en-US', {
                           weekday: 'short',
                           month: 'short', 
                           day: 'numeric',
                           hour: '2-digit',
                           minute: '2-digit'
                         })}
                       </p>
                       <p className={`text-xs ${timeStatus.color.split(' ')[0]} font-medium`}>
                         {timeStatus.label}
                       </p>
                     </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-semibold">{member.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold">{member.place}</p>
                    </div>
                  </div>
                </div>

                                 {/* Card Footer - Delete Pool Button for Owner */}
                 {isOwner && (
                   <div className="px-6 pb-6">
                     <div className="bg-red-50 rounded-2xl p-4 mb-4">
                       <div className="flex items-center text-red-800 mb-2">
                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                         </svg>
                         <span className="text-sm font-semibold">Pool Creator Actions</span>
                       </div>
                       <p className="text-red-600 text-xs">
                         You created this pool. You can delete it at any time.
                       </p>
                     </div>
                     <button
                       onClick={() => handelDelete(member._id, member.userId)}
                       className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group relative overflow-hidden"
                     >
                       <span className="relative z-10 flex items-center justify-center">
                         <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                         Delete My Pool
                       </span>
                       <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                     </button>
                   </div>
                 )}
               </div>
               )
             })}
           </div>
         )}
       </div>

      {/* Bottom Action */}
      {filteredUsers.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12 text-center">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join This Destination?</h3>
            <p className="text-gray-600 mb-6">Connect with fellow travelers and save money!</p>
            <Link
              to="/addPools"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Join a Pool
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
