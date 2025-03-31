import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Desenvolvedor Frontend",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "O cronograma de estudos do DevClub foi essencial para minha transição de carreira. Em apenas 6 meses consegui meu primeiro emprego como desenvolvedor."
    },
    {
      id: 2,
      name: "Ana Ferreira",
      role: "Estudante de Engenharia",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Organizar meus estudos sempre foi um desafio. Com o cronograma personalizado, finalmente consegui equilibrar a faculdade e o aprendizado de programação."
    },
    {
      id: 3,
      name: "Pedro Mendes",
      role: "Freelancer Full-Stack",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      text: "Comecei fazendo projetos pequenos como freelancer e hoje tenho uma carteira de clientes internacionais. O cronograma do DevClub direcionou meus estudos para o que realmente importa."
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Handle manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  
  // Variants for animations
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };
  
  // Direction to track slide direction for animation
  const [[page, direction], setPage] = useState([0, 0]);
  
  useEffect(() => {
    // Update page with direction when currentIndex changes
    setPage([currentIndex, currentIndex > page ? 1 : -1]);
  }, [currentIndex, page]);
  
  return (
    <motion.div 
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-8 text-center">
        O que nossos alunos dizem
      </h2>
      
      <div className="relative overflow-hidden">
        <div className="absolute z-10 top-1/2 left-2 transform -translate-y-1/2">
          <motion.button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white dark:bg-secondary-light shadow-md text-secondary dark:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
        
        <div className="absolute z-10 top-1/2 right-2 transform -translate-y-1/2">
          <motion.button
            onClick={handleNext}
            className="p-2 rounded-full bg-white dark:bg-secondary-light shadow-md text-secondary dark:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
        
        <div className="px-12">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="min-h-[200px]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <blockquote className="text-secondary dark:text-white italic mb-4">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                <div>
                  <h3 className="font-bold text-primary">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;