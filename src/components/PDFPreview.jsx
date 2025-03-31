import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PDFPreview = ({ pdfUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden bg-white dark:bg-secondary-light shadow-lg ${
        isExpanded ? 'fixed inset-0 z-50 m-4 sm:m-8 lg:m-16' : 'w-full'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-100 dark:bg-secondary p-2 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-secondary dark:text-white">Cronograma_de_Estudos_DevClub.pdf</span>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={toggleExpand}
            className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-dark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
          
          <motion.a
            href={pdfUrl}
            download="Cronograma_de_Estudos_DevClub.pdf"
            className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-dark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </div>
      
      <div className={`relative ${isExpanded ? 'h-full' : 'h-96'}`}>
        {pdfUrl ? (
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0`} 
            className="w-full h-full border-none"
            title="PDF Preview"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-secondary-dark">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-text-muted-light dark:text-text-muted-dark">Carregando o PDF...</p>
            </div>
          </div>
        )}
        
        {/* Overlay controls when expanded */}
        {isExpanded && (
          <motion.button
            onClick={toggleExpand}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-secondary-dark shadow-lg text-secondary dark:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PDFPreview;