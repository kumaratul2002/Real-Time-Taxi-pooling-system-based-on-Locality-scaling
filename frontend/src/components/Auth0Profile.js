import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from 'react-avatar';

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) { 
    return <div>Loading ...</div>;
  }

  if (error) {
    console.error('Auth0 Error:', error);
    return <div>Auth0 Error: {error.message}</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  // Debug logging
  console.log('Auth0 User:', user);

  return (
    <div className="">
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">                            
        <Avatar 
          color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} 
          name={user?.name || 'User'} 
          size={30} 
          round="14px"
        />
        <h3>{user?.name || 'Unknown User'}</h3>
      </button>
    </div>
  );
};

export default Profile;