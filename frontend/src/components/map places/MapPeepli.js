import React from 'react'

const MapPeepli = () => {
  return (
    <div>
      <iframe 
        title="Pipli map" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27647.161218883655!2d76.87731763940813!3d29.98244306466771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e46c69b69ea09%3A0x455edd3e77b0ecae!2sPipli%2C%20Kurukshetra%2C%20Haryana!5e0!3m2!1sen!2sin!4v1674156059885!5m2!1sen!2sin" 
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

export default MapPeepli
