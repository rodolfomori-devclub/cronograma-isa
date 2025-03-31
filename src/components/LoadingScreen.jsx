import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Criando seu cronograma personalizado');
  const loadingMessages = [
    'Criando seu cronograma personalizado',
    'Adaptando ao seu nível de conhecimento',
    'Ajustando para seus objetivos',
    'Calculando carga horária ideal',
    'Preparando recursos didáticos',
    'Finalizando seu plano de estudos'
  ];

  useEffect(() => {
    // Change the loading message every 2.5 seconds
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        const currentIndex = loadingMessages.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8 flex flex-col items-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-32 h-32 mb-8 relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#E0E0E0"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#37E359"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{ pathLength: 0.8, pathOffset: 0.8 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 8px rgba(55, 227, 89, 0.7))" }}
          />
        </svg>
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-primary"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-secondary dark:text-white mb-2"
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {loadingText}
      </motion.h2>

      <motion.div
        className="mt-4 flex space-x-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((dot, index) => (
          <motion.div
            key={dot}
            className="w-3 h-3 bg-primary rounded-full"
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="mt-8 text-text-muted-light dark:text-text-muted-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Estamos criando um plano de estudos personalizado com base nas suas respostas.
        <br />
        Isso pode levar alguns segundos...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;