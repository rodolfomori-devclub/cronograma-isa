import React from 'react';
import { motion } from 'framer-motion';

const ObjectiveForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const objectives = [
    {
      id: 'Emprego',
      title: 'Conseguir um emprego',
      description: 'Cronograma focado em habilidades valorizadas no mercado de trabalho',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'Dinheiro',
      title: 'Fazer dinheiro rápido',
      description: 'Foco em habilidades para trabalhos freelancer e projetos de curto prazo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const handleObjectiveSelect = (objective) => {
    updateFormData({ objective: objective });
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

  // Function to map objectives to API values
  const getApiObjective = (objective) => {
    if (objective === 'Emprego') return 'Emprego';
    if (objective === 'Dinheiro') return 'Dinheiro';
    return 'Emprego'; // Default
  };

  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">
        Qual seu principal objetivo?
      </h2>
      
      <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
        Isso nos ajudará a focar seu cronograma nas habilidades mais relevantes para você.
      </p>
      
      <div className="space-y-4 mb-8">
        {objectives.map((objective, index) => (
          <motion.div
            key={objective.id}
            variants={cardVariants}
            initial="unselected"
            animate={formData.objective === getApiObjective(objective.id) ? "selected" : "unselected"}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleObjectiveSelect(getApiObjective(objective.id))}
            className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
              formData.objective === getApiObjective(objective.id)
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-gray-200 dark:border-secondary-light'
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg mr-4 ${
                formData.objective === getApiObjective(objective.id)
                  ? 'text-primary'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {objective.icon}
              </div>
              <div>
                <h3 className={`text-lg font-medium ${
                  formData.objective === getApiObjective(objective.id)
                    ? 'text-primary'
                    : 'text-secondary dark:text-white'
                }`}>
                  {objective.title}
                </h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  {objective.description}
                </p>
              </div>
              <div className="ml-auto">
                {formData.objective === getApiObjective(objective.id) && (
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
          className="flex-1 py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          Gerar Cronograma
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ObjectiveForm;