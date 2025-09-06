import React from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-yellow-400">Us</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Got a technical issue? Want to send feedback about a feature? Need details about our service? Let us know.
          </p>
        </div>

        {/* Contact Form */}
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
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-3 text-sm font-medium text-white">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="username@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block mb-3 text-sm font-medium text-white">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="How can we help you?"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block mb-3 text-sm font-medium text-white">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  📧 Send Message
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
            <p className="text-white/70 text-sm">AutoPool Headquarters<br />Tech City, Innovation District</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-white/70 text-sm">support@autopool.com<br />hello@autopool.com</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
            <p className="text-white/70 text-sm">+1 (555) 123-4567<br />Mon-Fri 9AM-6PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
