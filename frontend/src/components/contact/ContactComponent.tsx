import { Link } from 'react-router-dom';

const ContactComponent = () => {
  return (
    <div className="min-h-screen bg-dark-background flex justify-center items-center">
      <div className="w-full large:flex large:items-center large:justify-center large:flex-col large:p-20 medium:flex medium:items-center medium:justify-center medium:flex-col p-6 bg-dark-background">
        <h2 className="text-4xl font-bold text-center text-dark-white pb-10 mb-5">Contact Us</h2>
        
        <p className="text-center text-dark-white mb-10 text-sm sm:text-base md:text-lg lg:text-xl lg:max-w-4xl mx-auto">
          We're here to help! Whether you have questions, feedback, or need assistance with your booking, feel free to reach out to us. Our support team is available 24/7 to assist you.
        </p>

        <div className="flex flex-col items-center space-y-6 lg:max-w-4xl mx-auto">
          <div className="flex flex-col space-y-4 text-dark-white text-lg">
            <p><strong>Email:</strong> support@roombooking.com</p>
            <p><strong>Phone:</strong> +1 234 567 8901</p>
            <p><strong>Address:</strong> 123 Booking St, Suite 100, City, Country</p>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full max-w-[600px]">
            <h3 className="text-xl font-semibold text-dark-white text-center mb-4">Or Get In Touch with Us Directly</h3>
            <form className="w-full space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="p-3 w-full bg-dark-light text-dark-white border border-dark-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="p-3 w-full bg-dark-light text-dark-white border border-dark-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea 
                placeholder="Your Message" 
                className="p-3 w-full bg-dark-light text-dark-white border border-dark-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
              <button 
                type="submit" 
                className="p-3 bg-purple-pink-gradient text-white rounded-xl hover:bg-blue-700 w-full text-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-6">
          <Link
            to="/"
            className="p-3 text-dark-white border border-dark-light-border rounded-xl hover:bg-dark-light w-full min-w-[280px] large:w-[700px] medium:w-[500px] text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
