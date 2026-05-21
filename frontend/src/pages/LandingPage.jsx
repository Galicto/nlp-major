import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingPage({ onEnter }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '350vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>
      
      {/* Sticky Hero Section Wrapper */}
      <div style={{ height: '150vh', position: 'relative', zIndex: 0 }}>
        <motion.div 
          style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            opacity: opacity,
            scale: scale,
            backgroundImage: 'url(/3d-assets/3d_dashboard_bg_1779371762561.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '50px', borderRadius: '40px', backdropFilter: 'blur(30px)' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="title-large"
              style={{ textAlign: 'center' }}
            >
              UrbanMind.
              <br />
              <span style={{ fontSize: '3rem', fontWeight: 500, color: '#86868B' }}>Intelligence at scale.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ marginTop: '24px', fontSize: '1.2rem', color: '#E5E5EA', letterSpacing: '-0.01em', textAlign: 'center' }}
            >
              Scroll to explore the architecture.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Parallax Content Section */}
      <div style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(to bottom, transparent, #000 10%)', padding: '120px 20px', marginTop: '50vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '150px' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="feature-row"
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Spatial-Temporal Networks.</h2>
              <p style={{ fontSize: '1.2rem', color: '#86868B', lineHeight: '1.6' }}>
                Powered by ST-GCN, UrbanMind models city nodes in a dynamic graph, predicting crowd anomalies 60 minutes before they occur. It’s not just data. It’s foresight.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img src="/3d-assets/3d_network_nodes_1779371717057.png" alt="Neural Network" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(41, 151, 255, 0.2)' }} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="feature-row-reverse"
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Multi-Modal Vision.</h2>
              <p style={{ fontSize: '1.2rem', color: '#86868B', lineHeight: '1.6' }}>
                Seamlessly fusing YOLOv8 camera feeds with DistilBERT NLP sentiment analysis. We understand the physical movement and the human context simultaneously.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img src="/3d-assets/3d_vision_eye_1779371735215.png" alt="Computer Vision Eye" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(255, 149, 0, 0.2)' }} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="feature-row"
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Proactive AI Core.</h2>
              <p style={{ fontSize: '1.2rem', color: '#86868B', lineHeight: '1.6' }}>
                Multi-Agent Deep Q-Networks automatically re-route transit fleets. UrbanMind doesn't just alert you to a problem—it solves it before you even notice.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img src="/3d-assets/3d_ai_core_1779371749847.png" alt="Quantum AI Core" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(255, 59, 48, 0.2)' }} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Final CTA Section */}
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: '#000', 
        borderTop: '1px solid #333',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Cinematic Smart City Background */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url(/3d-assets/3d_landing_end_1779372401975.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
        
        <div className="cta-box">
          <h2 style={{ fontSize: '5rem', marginBottom: '40px', fontWeight: 600 }}>Ready to deploy.</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="apple-btn"
            style={{ fontSize: '1.5rem', padding: '20px 50px' }}
          >
            Enter Dashboard
          </motion.button>
        </div>
      </div>

    </div>
  );
}
