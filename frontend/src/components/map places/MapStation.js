import React from 'react'

const MapStation = () => {
  return (
    <div>
      <iframe 
        title="Kurukshetra Junction map" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.348136713961!2d76.84980901431727!3d29.969423429069348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e4739da7b66f3%3A0x39aaca0cf824c6f2!2sKurukshetra%20Junction!5e0!3m2!1sen!2sin!4v1674157833761!5m2!1sen!2sin" 
        width="600" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default MapStation
