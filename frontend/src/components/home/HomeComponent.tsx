import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <div className="min-h-screen bg-dark-background flex justify-center items-center">
      <div className="w-full large:flex large:items-center large:justify-center large:flex-col large:p-20 medium:flex medium:items-center medium:justify-center medium:flex-col p-6 bg-dark-background">
        <h2 className="text-4xl font-bold text-center text-dark-white pb-10 mb-5">Welcome to RoomBooking</h2>
        <p className="text-center text-dark-white mb-10 text-sm sm:text-base md:text-lg lg:text-xl lg:max-w-4xl mx-auto ">
            Find the best rooms at the most affordable prices. Whether you’re traveling for business or leisure, we offer rooms to suit every need. From luxurious suites to cozy single rooms, we have something for everyone. Our platform makes booking simple, with instant confirmations and flexible payment options. Book your room now and experience comfort, convenience, and a seamless booking process!
        </p>



        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/rooms"
            className="p-3 bg-purple-pink-gradient text-white rounded-xl hover:bg-blue-700 w-full min-w-[280px] large:w-[700px] medium:w-[500px] text-center"
          >
            Browse Rooms
          </Link>
          <Link
            to="/about"
            className="p-3 text-dark-white border border-dark-light-border rounded-xl hover:bg-dark-light w-full min-w-[280px] large:w-[700px] medium:w-[500px] text-center"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;