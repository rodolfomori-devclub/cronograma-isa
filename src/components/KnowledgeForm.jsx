import React from 'react';
import { motion } from 'framer-motion';

const KnowledgeForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const levels = [
    {
      id: 'Iniciante',
      title: 'Iniciante',
      description: 'Pouca ou nenhuma experiência em programação',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'Intermediário',
      title: 'Intermediário',
      description: 'Conhecimento básico de programação, já desenvolveu alguns projetos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'Avançado',
      title: 'Avançado',
      description: 'Experiência sólida em programação, domínio de várias tecnologias',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  const handleLevelSelect = (level) => {
    updateFormData({ knowledge_level: level });
    nextStep();
  };

  const cardVariants = {
    selected: {
      scale: 1.05,
      boxShadow: "0 0 5px rgba(55, 227, 89, 0.5), 0 0 20px rgba(55, 227, 89, 0.3)",
      transition: { duration: 0.3 }
    },
    unselected: {
      scale: 1,
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">
        Qual seu nível de conhecimento em programação?
      </h2>
      
      <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
        Isso nos ajudará a adaptar seu cronograma ao seu nível atual.
      </p>
      
      <div className="space-y-4 mb-8">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            variants={cardVariants}
            initial="unselected"
            animate={formData.knowledge_level === level.id ? "selected" : "unselected"}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleLevelSelect(level.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
              formData.knowledge_level === level.id 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-gray-200 dark:border-secondary-light'
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg mr-4 ${
                formData.knowledge_level === level.id
                  ? 'text-primary'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {level.icon}
              </div>
              <div>
                <h3 className={`text-lg font-medium ${
                  formData.knowledge_level === level.id
                    ? 'text-primary'
                    : 'text-secondary dark:text-white'
                }`}>
                  {level.title}
                </h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  {level.description}
                </p>
              </div>
              <div className="ml-auto">
                {formData.knowledge_level === level.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-between gap-4">
        <motion.button
          type="button"
          onClick={prevStep}
          className="flex-1 py-3 px-6 bg-gray-200 dark:bg-secondary-light text-secondary dark:text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Voltar
        </motion.button>
        
        <motion.button
          type="button"
          onClick={nextStep}
          className="flex-1 py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
          whileTap={{ scale: 0.95 }}
        >
          Continuar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default KnowledgeForm;