import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ScheduleForm = ({ formData, updateFormData, nextStep, prevStep }) => {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const [selectedDays, setSelectedDays] = useState(() => {
    // Initialize selected days based on weekly_days count
    // By default, select Monday to Friday if weekly_days is 5
    const initialDays = [];
    if (formData.weekly_days === 5) {
      initialDays.push('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta');
    } else {
      // Select first n days based on weekly_days count
      for (let i = 0; i < formData.weekly_days && i < days.length; i++) {
        initialDays.push(days[i]);
      }
    }
    return initialDays;
  });
  
  const handleDayToggle = (day) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };
  
  const handleHoursChange = (e) => {
    const value = parseFloat(e.target.value);
    updateFormData({ daily_hours: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ weekly_days: selectedDays.length });
    nextStep();
  };
  
  // Calculate background gradient for range input
  const getRangeBackground = (value) => {
    const percentage = ((value - 0.5) / (8 - 0.5)) * 100;
    return `linear-gradient(to right, #37E359 0%, #37E359 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  };
  
  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-6">
        Configure seu tempo de estudo
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-4">
            Quantas horas por dia você pode dedicar aos estudos?
          </label>
          
          <div className="mb-2">
            <input
              type="range"
              min="0.5"
              max="8"
              step="0.5"
              value={formData.daily_hours}
              onChange={handleHoursChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{ background: getRangeBackground(formData.daily_hours) }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
            <span>30min</span>
            <span>8h</span>
          </div>
          
          <motion.div 
            className="mt-4 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={formData.daily_hours}
          >
            <span className="text-3xl font-bold text-primary">{formData.daily_hours}</span>
            <span className="text-xl text-secondary dark:text-white ml-2">horas por dia</span>
          </motion.div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-4">
            Quais dias da semana você vai estudar?
          </label>
          
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDayToggle(day)}
                className={`cursor-pointer rounded-lg p-2 text-center transition-all duration-300 ${
                  selectedDays.includes(day)
                    ? 'bg-primary text-white font-medium shadow-md'
                    : 'bg-gray-100 dark:bg-secondary-light text-text-muted-light dark:text-text-muted-dark'
                }`}
              >
                <div className="text-xs">{day.slice(0, 3)}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-4 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={selectedDays.length}
          >
            <span className="text-3xl font-bold text-primary">{selectedDays.length}</span>
            <span className="text-xl text-secondary dark:text-white ml-2">dias por semana</span>
          </motion.div>
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
            type="submit"
            className="flex-1 py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
            whileTap={{ scale: 0.95 }}
            disabled={selectedDays.length === 0}
          >
            Continuar
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ScheduleForm;