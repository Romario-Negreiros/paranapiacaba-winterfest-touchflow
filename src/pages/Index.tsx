import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'booking'>('welcome');
  const navigate = useNavigate();

  const handleStartBooking = () => {
    setCurrentScreen('booking');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
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

      {currentScreen === 'welcome' ? (
        <WelcomeScreen onStart={handleStartBooking} />
      ) : (
        <BookingForm onBack={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Index;
