import React from 'react';
import HeroOne from 'public/hero1.jpg';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative">
      <motion.img
        src={HeroOne}
        alt=""
        className="w-full h-auto"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.h1
        className="absolute top-1/3 left-3/4 -translate-x-1/2 transform text-black text-6xl w-[500px] font-bold text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        ALIMAMA.
      </motion.h1>

      <motion.h1
        className="absolute top-1/3 pt-16 left-3/4 -translate-x-1/2 transform  text-black text-2xl font-light"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Define yourself in your unique way.
      </motion.h1>

      <motion.button
        className="text-white bg-black rounded-md text-2xl absolute top-[60%] left-3/4 -translate-x-1/2 transform px-6 py-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        SHOP NOW
      </motion.button>
    </div>
  );
};

export default Hero;
