import router from "next/router";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface StepperContextType {
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: (prevStep: string) => void;
  resetStep: () => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};

interface StepperProviderProps {
  children: ReactNode;
}

export const StepperProvider: React.FC<StepperProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPrevStep = (prevStep: string) => {
    router.replace(prevStep);
    setCurrentStep(1);
  };

  const resetStep = () => {
    setCurrentStep(1);
  };

  const contextValue: StepperContextType = {
    currentStep,
    goToNextStep,
    goToPrevStep,
    resetStep,
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  );
};
