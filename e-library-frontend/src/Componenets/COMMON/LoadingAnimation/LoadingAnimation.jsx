// src/Components/COMMON/LoadingAnimation/LoadingAnimation.jsx

import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => (
  <motion.div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '2rem',
      fontWeight: 'bold',
    }}
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      Loading
    </motion.span>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.1
      }}
    >
      .
    </motion.span>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.2
      }}
    >
      .
    </motion.span>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.3
      }}
    >
      .
    </motion.span>
  </motion.div>
);

export default LoadingAnimation;
