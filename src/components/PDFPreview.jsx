import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PDFPreview = ({ pdfUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    // Reset state when URL changes
    if (pdfUrl) {
      console.log('PDF URL provided to PDFPreview:', pdfUrl);
      setIsLoading(true);
      setError(null);
      setPdfLoaded(false);
      
      // For blob URLs, we don't need to check accessibility
      if (pdfUrl.startsWith('blob:')) {
        setIsLoading(false);
      } else {
        // For remote URLs, verify they're accessible
        fetch(pdfUrl, { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              throw new Error(`PDF URL returned status ${response.status}`);
            }
            setIsLoading(false);
          })
          .catch(err => {
            console.error('Error checking PDF URL:', err);
            setError(`Could not access PDF. Error: ${err.message}`);
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(false);
      setError('PDF URL is not available');
    }
  }, [pdfUrl]);

  const handleIframeLoad = () => {
    console.log('PDF iframe loaded successfully');
    setPdfLoaded(true);
    setIsLoading(false);
  };

  const handleIframeError = (e) => {
    console.error('Error loading PDF in iframe:', e);
    setError('Failed to load PDF preview');
    setIsLoading(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleDownload = () => {
    if (!pdfUrl) return;
    
    try {
      // Create a hidden link and click it
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = "Cronograma_de_Estudos_DevClub.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error initiating download:', error);
      // Fallback: open in new tab
      window.open(pdfUrl, '_blank');
    }
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
          <span className="font-medium text-secondary dark:text-white">Cronograma de Estudos DevClub</span>
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
          
          <motion.button
            onClick={handleDownload}
            className="p-1 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-dark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!pdfUrl || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      <div className={`relative ${isExpanded ? 'h-full' : 'h-96'}`}>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-secondary-dark">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-text-muted-light dark:text-text-muted-dark">Carregando o PDF...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-secondary-dark">
            <div className="text-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-2">Erro ao carregar o PDF</p>
              <p className="text-sm text-red-500">{error}</p>
              <div className="mt-4">
                <button 
                  onClick={handleDownload}
                  className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center"
                  disabled={!pdfUrl}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Baixar diretamente
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <iframe 
              src={pdfUrl}
              className="w-full h-full border-none"
              title="PDF Preview"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
            {!pdfLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-secondary-dark bg-opacity-70 dark:bg-opacity-70">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">Carregando visualização...</p>
                </div>
              </div>
            )}
          </>
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