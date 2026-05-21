import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Connecting to UrbanMind Core...");

  useEffect(() => {
    const sequence = [
      { p: 20, msg: "Initializing Spatial-Temporal Networks...", delay: 600 },
      { p: 45, msg: "Synchronizing Multi-Modal Vision Feeds...", delay: 1800 },
      { p: 70, msg: "Calibrating NLP Sentiment Stream...", delay: 3000 },
      { p: 90, msg: "Starting Multi-Agent RL Optimizer...", delay: 4200 },
      { p: 100, msg: "Systems Online.", delay: 5500 }
    ];

    sequence.forEach((step) => {
      setTimeout(() => {
        setProgress(step.p);
        setStatus(step.msg);
        if (step.p === 100) {
          setTimeout(onComplete, 1200);
        }
      }, step.delay);
    });
  }, [onComplete]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',
      color: '#F5F5F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic 3D Core Image */}
      <motion.img 
        src="/3d-assets/3d_loading_core_1779372417293.png"
        alt="Quantum Core"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          objectFit: 'cover',
          filter: 'blur(4px) drop-shadow(0 0 40px rgba(41,151,255,0.4))',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div style={{ 
        width: '90%',
        maxWidth: '500px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.6)',
        padding: '40px 20px',
        borderRadius: '30px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Apple-style spinning loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#2997FF',
            marginBottom: '40px',
            boxShadow: '0 0 15px rgba(41,151,255,0.5)'
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{ 
              marginBottom: '30px', 
              fontSize: '1.2rem', 
              color: '#F5F5F7', 
              fontWeight: 500, 
              letterSpacing: '-0.01em',
              textAlign: 'center'
            }}
          >
            {status}
          </motion.div>
        </AnimatePresence>
        
        <div style={{ 
          height: '4px', 
          width: '100%', 
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #2997FF 0%, #34C759 100%)',
              boxShadow: '0 0 10px rgba(52, 199, 89, 0.5)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
