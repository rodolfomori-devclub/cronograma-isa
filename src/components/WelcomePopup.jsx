import React from 'react';
import { motion } from 'framer-motion';
import Isa from '../assets/isa.png'

const WelcomePopup = ({ startApp }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl w-full max-w-xl p-8 flex flex-col items-center text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div 
        className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <img 
          src={Isa} 
          alt="Isa - DevClub Assistant" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold text-secondary dark:text-white mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Olá! Eu sou a Isa
      </motion.h2>
      
      <motion.p 
        className="text-text-muted-light dark:text-text-muted-dark mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Sua assistente pessoal do DevClub. Estou aqui para te ajudar a criar um cronograma de estudos de programação personalizado, feito sob medida para suas necessidades e objetivos.
      </motion.p>
      
      <motion.div
        className="w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <button
          onClick={startApp}
          className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
        >
          Vamos Criar Seu Cronograma
        </button>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-sm text-text-muted-light dark:text-text-muted-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <p>Apenas alguns minutos e você terá um plano de estudos completo!</p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePopup;