import React from 'react'

const MapBus = () => {
  return (
    <div>
      <iframe 
        title="Bus Stand map" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.957049971124!2d76.81471031431833!3d30.00938962718439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e397344d83a1f%3A0x492e490a2a4ca0d3!2sBus%20stand!5e0!3m2!1sen!2sin!4v1674158411651!5m2!1sen!2sin" 
        width="100%" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

)
}

export default MapBus