import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BookingForm } from "@/components/BookingForm";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'booking'>('welcome');

  const handleStartBooking = () => {
    setCurrentScreen('booking');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="font-sans">
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onStart={handleStartBooking} />
      ) : (
        <BookingForm onBack={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Index;
