import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PersonalInfoForm = ({ formData, updateFormData, nextStep }) => {
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido. Use o formato: 552199999999';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };
  
  const formatPhoneNumber = (value) => {
    // Ensure we're working with just digits
    const digits = value.replace(/\D/g, '');
    
    // Don't format if less than 3 digits
    if (digits.length < 3) return digits;
    
    // Format: +55 (21) 99999-9999
    if (digits.length <= 2) {
      return `+${digits}`;
    } else if (digits.length <= 4) {
      return `+${digits.slice(0, 2)} (${digits.slice(2)}`;
    } else if (digits.length <= 9) {
      return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
    } else {
      return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9, 13)}`;
    }
  };
  
  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    const rawValue = formattedValue.replace(/\D/g, '');
    updateFormData({ phone: rawValue });
  };
  
  return (
    <motion.div
      className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-6">
        Vamos começar com algumas informações básicas
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Seu nome completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-secondary-light dark:text-white transition-all duration-300`}
          />
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errors.name}
            </motion.p>
          )}
        </div>
        
        <div className="mb-8">
          <label htmlFor="phone" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
            Seu número de telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formatPhoneNumber(formData.phone)}
            onChange={handlePhoneChange}
            placeholder="+55 (21) 99999-9999"
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-secondary-light dark:text-white transition-all duration-300`}
          />
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errors.phone}
            </motion.p>
          )}
          <p className="mt-2 text-xs text-text-muted-light dark:text-text-muted-dark">
            Formato esperado: +55 (21) 99999-9999
          </p>
        </div>
        
        <motion.button
          type="submit"
          className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          Continuar
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PersonalInfoForm;