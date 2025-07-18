import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BookingForm } from "@/components/BookingForm";
import { ConfirmationScreen } from "@/components/ConfirmationScreen";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'booking' | 'confirmation'>('welcome');
  const [confirmationData, setConfirmationData] = useState<{protocolNumber: string; visitDate: string} | null>(null);
  const navigate = useNavigate();

  const handleStartBooking = () => {
    setCurrentScreen('booking');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setConfirmationData(null);
  };

  const handleBookingSuccess = (protocolNumber: string, visitDate: string) => {
    setConfirmationData({ protocolNumber, visitDate });
    setCurrentScreen('confirmation');
  };

  return (
    <div className="font-sans relative">
      {/* Admin button */}
      <div className="fixed top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin')}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStartBooking} />
      )}
      
      {currentScreen === 'booking' && (
        <BookingForm onBack={handleBackToWelcome} onSuccess={handleBookingSuccess} />
      )}

      {currentScreen === 'confirmation' && confirmationData && (
        <ConfirmationScreen 
          protocolNumber={confirmationData.protocolNumber}
          visitDate={confirmationData.visitDate}
          onBackToHome={handleBackToWelcome}
        />
      )}
    </div>
  );
};

export default Index;
