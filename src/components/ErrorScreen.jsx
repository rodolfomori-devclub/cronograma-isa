import React from 'react';
import { motion } from 'framer-motion';

const ErrorScreen = ({ error, retrySubmit }) => {
  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-4 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold text-secondary dark:text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Ops! Algo deu errado
        </motion.h2>
        
        <motion.p
          className="text-text-muted-light dark:text-text-muted-dark mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Não foi possível gerar seu cronograma de estudos. Por favor, tente novamente.
        </motion.p>
        
        <motion.div
          className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-lg mb-8 text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">Detalhes do erro:</h3>
          <p className="text-sm text-red-600 dark:text-red-400 font-mono">
            {error?.message || "Erro de conexão com o servidor"}
          </p>
        </motion.div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={retrySubmit}
          className="py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Tentar Novamente
        </motion.button>
        
        <motion.a
          href="mailto:suporte@devclub.com?subject=Erro%20na%20geração%20de%20cronograma"
          className="py-3 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-secondary-light dark:hover:bg-secondary text-secondary dark:text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contactar Suporte
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ErrorScreen;