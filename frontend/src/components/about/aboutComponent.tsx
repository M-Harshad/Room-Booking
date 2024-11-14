import { Link } from 'react-router-dom';

const AboutComponent = () => {
  return (
    <div className="min-h-screen bg-dark-background flex justify-center items-center">
      <div className="w-full large:flex large:items-center large:justify-center large:flex-col large:p-20 medium:flex medium:items-center medium:justify-center medium:flex-col p-6 bg-dark-background">
        <h2 className="text-4xl font-bold text-center text-dark-white pb-10 mb-5">About RoomBooking</h2>
        <p className="text-center text-dark-white mb-10 text-sm sm:text-base md:text-lg lg:text-xl lg:max-w-4xl mx-auto">
          At RoomBooking, we are passionate about connecting you with the perfect accommodations for your stay. Whether you're looking for a quick business trip or a luxurious getaway, our platform offers a wide variety of rooms that cater to all kinds of travelers. 
        </p>
        <p className="text-center text-dark-white mb-10 text-sm sm:text-base md:text-lg lg:text-xl lg:max-w-4xl mx-auto">
          Our mission is simple: to provide a seamless and user-friendly experience for our customers. With our vast selection of rooms, flexible payment options, and instant booking confirmations, we ensure that your journey starts off right. Our team works tirelessly to maintain a collection of rooms at competitive prices, so you can enjoy comfort without breaking the bank.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/contact"
            className="p-3 bg-purple-pink-gradient text-white rounded-xl hover:bg-blue-700 w-full min-w-[280px] large:w-[700px] medium:w-[500px] text-center"
          >
            Contact Us
          </Link>
          <Link
            to="/rooms"
            className="p-3 text-dark-white border border-dark-light-border rounded-xl hover:bg-dark-light w-full min-w-[280px] large:w-[700px] medium:w-[500px] text-center"
          >
            Browse Available Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
