import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Target, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--page-fg)]">
      {/* Background elements */}
      <div className="bg-blob left" />
      <div className="bg-blob right" />
      <div className="floating-dots" />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Navbar />

        <main className="relative z-10 px-6">
          <HeroSection onGetStarted={() => navigate('/dashboard')} />

          <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Target}
              title="Deep Focus"
              desc="Structured sessions to eliminate distractions and enter flow."
              delay={0.05}
            />
            <FeatureCard
              icon={Users}
              title="Accountability"
              desc="Work alongside others to keep momentum and stay consistent."
              delay={0.1}
            />
            <FeatureCard
              icon={Clock}
              title="Ritual & Rhythm"
              desc="Build sustainable habits with flexible, time-boxed routines."
              delay={0.15}
            />
            <FeatureCard
              icon={Sparkles}
              title="Calm Productivity"
              desc="A soothing interface that helps you do more with less stress."
              delay={0.2}
            />
          </section>
        </main>
      </motion.div>
    </div>
  );
};

export default Landing;