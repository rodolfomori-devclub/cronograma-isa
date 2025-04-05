import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePopup from './components/WelcomePopup';
import PersonalInfoForm from './components/PersonalInfoForm';
import ScheduleForm from './components/ScheduleForm';
import KnowledgeForm from './components/KnowledgeForm';
import ObjectiveForm from './components/ObjectiveForm';
import SuccessScreen from './components/SuccessScreen';
import NetworkAnimation from './components/NetworkAnimation';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import ThemeSwitcher from './components/ThemeSwitcher';
import PDFPreview from './components/PDFPreview';
import Testimonials from './components/Testimonials';
import FeaturesShowcase from './components/FeaturesShowcase';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Mantido para o formulário, mas não será enviado para a API
    daily_hours: 3.5,
    weekly_days: 5,
    knowledge_level: 'Iniciante',
    program_format: 'default',
    objective: 'Emprego' // Este campo será usado como nome do PDF
  });

  // Helper to update form data
  const updateFormData = (newData) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Function to handle form submission
  const submitForm = async () => {
    setIsLoading(true);
    setError(null);
    
    // Prepare data to submit - use objective field for PDF name and exclude phone field
    const dataToSubmit = {
      name: formData.name,
      daily_hours: formData.daily_hours,
      weekly_days: formData.weekly_days,
      knowledge_level: formData.knowledge_level,
      program_format: formData.program_format,
      objective: `Cronograma de Estudo - ${formData.name}` // Nome do PDF no campo objective
    };
    
    try {
      const response = await fetch('https://isaapi.devclub.com.br/d718f39b-eee5-4249-ac4a-72af52b0135d/public/create-study-program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-function-token': '844273cb8328b7a2ef14244664ed490ee37f679d197923738cf0b75a9d3221fa',
          'x-platform-request-id': '123456789'
        },
        body: JSON.stringify(dataToSubmit)
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setCurrentStep(4); // Move to success screen
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error);
      setCurrentStep(5); // Move to error screen
    } finally {
      setIsLoading(false);
    }
  };

  // Function to move to next step
  const nextStep = () => {
    if (currentStep === 3) {
      submitForm();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to move to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Close popup and start form
  const startApp = () => {
    setShowPopup(false);
    setShowLandingPage(false);
    setCurrentStep(0);
  };

  // Function to retry submission after error
  const retrySubmit = () => {
    setCurrentStep(3);
    submitForm();
  };

  // Map steps to components
  const steps = [
    <PersonalInfoForm 
      key="personal" 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep} 
    />,
    <ScheduleForm 
      key="schedule" 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <KnowledgeForm 
      key="knowledge" 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <ObjectiveForm 
      key="objective" 
      formData={formData} 
      updateFormData={updateFormData} 
      nextStep={nextStep} 
      prevStep={prevStep} 
    />,
    <SuccessScreen 
      key="success" 
      pdfUrl={pdfUrl} 
    />,
    <ErrorScreen 
      key="error" 
      error={error} 
      retrySubmit={retrySubmit} 
    />
  ];

  // Landing page content
  const LandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-6 space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-secondary dark:text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary">Dev</span>Club Cronograma
        </motion.h1>
        
        <motion.p 
          className="text-xl text-text-muted-light dark:text-text-muted-dark"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Crie um plano de estudos personalizado para alcançar seus objetivos na programação
        </motion.p>
      </div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={startApp}
          className="py-4 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-neon text-lg"
        >
          Criar Meu Cronograma
        </button>
        
        <p className="mt-3 text-sm text-text-muted-light dark:text-text-muted-dark">
          É rápido e gratuito. Leva apenas alguns minutos!
        </p>
      </motion.div>
      
      <FeaturesShowcase />
      
      <Testimonials />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <NetworkAnimation />
      </div>
      
      {/* DevClub Logo */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold text-secondary dark:text-white">
          <span className="text-primary">Dev</span>Club
        </h1>
      </div>
      
      {/* Theme Switcher */}
      <ThemeSwitcher />
      
      {/* App Container */}
      <AnimatePresence mode="wait">
        {showPopup ? (
          <WelcomePopup key="popup" startApp={startApp} />
        ) : showLandingPage ? (
          <LandingPage key="landing" />
        ) : (
          <motion.div
            key="form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl p-6"
          >
            {/* Progress Bar */}
            {currentStep < 4 && (
              <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                <motion.div 
                  className="h-2 bg-primary rounded-full"
                  initial={{ width: `${(currentStep / 4) * 100}%` }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
            
            {/* Main Content */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen key="loading" />
              ) : (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {steps[currentStep]}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* PDF Preview when available */}
            {pdfUrl && currentStep === 4 && (
              <div className="mt-8">
                <PDFPreview pdfUrl={pdfUrl} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <div className="mt-auto py-4 text-text-muted-light dark:text-text-muted-dark text-sm text-center w-full">
        © 2025 DevClub. Todos os direitos reservados.
      </div>
    </div>
  );
}

export default App;