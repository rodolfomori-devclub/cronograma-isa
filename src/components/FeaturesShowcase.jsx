import React from 'react';
import { motion } from 'framer-motion';

const FeaturesShowcase = () => {
  const features = [
    {
      id: 1,
      title: "Cronograma Personalizado",
      description: "Plano de estudos adaptado às suas necessidades, objetivos e disponibilidade de tempo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Acompanhamento de Progresso",
      description: "Monitore sua evolução nos estudos e veja o quanto está avançando no cronograma",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Material Didático Exclusivo",
      description: "Acesso aos melhores recursos didáticos selecionados por especialistas do DevClub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Suporte da Comunidade",
      description: "Faça parte de uma comunidade ativa de alunos e mentores para tirar dúvidas e compartilhar experiências",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2 text-center">
        Por que usar nosso cronograma?
      </h2>
      
      <p className="text-text-muted-light dark:text-text-muted-dark mb-8 text-center">
        Conheça os benefícios do cronograma de estudos personalizado do DevClub
      </p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="bg-gray-50 dark:bg-secondary-light rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            variants={item}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div className="text-primary mb-4">
              {feature.icon}
            </div>
            
            <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
              {feature.title}
            </h3>
            
            <p className="text-text-muted-light dark:text-text-muted-dark">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a 
          href="https://devclub.com/cursos" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
        >
          Conheça todos os nossos cursos
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesShowcase;