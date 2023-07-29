import React from 'react'

const MapZoo = () => {
  return (
    <div className="p-5 bg-yellow-200">
      <iframe 
        title="Pipli Mini Zoo map" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.820524207384!2d76.89042751431768!3d29.98458752835447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e46ea8677b9b9%3A0x1e767c697ac7b48b!2sPipli%20Mini%20Zoo!5e0!3m2!1sen!2sin!4v1674157966021!5m2!1sen!2sin" 
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

export default MapZoo
