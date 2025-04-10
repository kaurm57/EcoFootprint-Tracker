import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Cloud.css'; // Import your custom cloud styles
import background from '../assets/background.png'; // Adjust path as needed

// Define the floating animation for the clouds
const cloudAnimation = {
  y: [0, -15, 0], // Cloud moves up 15px and back
  transition: {
    duration: 12,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/form');
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#e6e5d1] to-[green-400]">
      {/* Background image positioned at the bottom behind content */}
      <img 
        src={background} 
        alt="Bottom Decoration" 
        className="absolute bottom-0 left-0 w-full"
      />

      {/* Animated Cloud Elements with adjusted positions */}
      <motion.div
        className="cloud"
        style={{ top: '5%', left: '20%' }}  // Moved up from 10% to 5%
        animate={cloudAnimation}
      />
      <motion.div
        className="cloud"
        style={{ top: '25%', left: '70%' }}  // Moved up from 30% to 25%
        animate={cloudAnimation}
      />
      <motion.div
        className="cloud"
        style={{ top: '55%', left: '40%' }}  // Moved up from 60% to 55%
        animate={cloudAnimation}
      />

      {/* Main Content shifted upward */}
      <div className="relative z-10 text-center p-4 transform -translate-y-24">
        <h1 className="text-4xl md:text-6xl font-bold text-[#335029] mb-4">
          EcoFootprint Tracker
        </h1>
        <p className="text-xl md:text-2xl text-[#335029] mb-8">
          Discover your impact on the environment.
        </p>
        <button 
          onClick={handleClick}
          className="bg-[#335029] hover:bg-[rgba(51,80,41,0.9)] hover:cursor-pointer text-white font-semibold py-3 px-6 rounded shadow transition-colors duration-400"
        >
          Take the Quiz
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
