import React from 'react';
import GradientButton from './GradientButton.jsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const textContainer = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const HeroSection = ({ onGetStarted }) => {
  const navigate = useNavigate();
  return (
    <section className="pt-8 pb-12 text-center">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={textContainer}
        custom={0}
        className="font-extrabold leading-tight tracking-tight text-6xl md:text-[4.5rem] lg:text-[5.5rem]"
      >
        <span className="gradient-text">Focus</span>
        <span className="text-white">Mate</span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={textContainer}
        custom={1}
        className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-[#bdbdbf]"
      >
        Stay accountable, beat procrastination, and get more done with calm focus.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={(onGetStarted)}>Get Started</GradientButton>
      </motion.div>
    </section>
  );
};

export default HeroSection;