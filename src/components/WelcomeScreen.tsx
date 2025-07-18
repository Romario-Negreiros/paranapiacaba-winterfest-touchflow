import { Button } from "@/components/ui/button";
import heroImage from "@/assets/paranapiacaba-winter.jpg";
import { Calendar, MapPin, Clock } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-8">
        {/* Main Title */}
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Festival de Inverno
          </h1>
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-blue-200">
            Paranapiacaba
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Agende sua visita e viva momentos únicos na vila mais charmosa do inverno brasileiro
          </p>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-scale-in">
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-6">
            <Calendar className="w-8 h-8 text-blue-300" />
            <div className="text-left">
              <p className="font-semibold text-lg">Período</p>
              <p className="text-blue-200">Junho - Agosto</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-6">
            <MapPin className="w-8 h-8 text-blue-300" />
            <div className="text-left">
              <p className="font-semibold text-lg">Local</p>
              <p className="text-blue-200">Vila de Paranapiacaba</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-6">
            <Clock className="w-8 h-8 text-blue-300" />
            <div className="text-left">
              <p className="font-semibold text-lg">Horário</p>
              <p className="text-blue-200">9h às 18h</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-scale-in">
          <Button 
            variant="kiosk" 
            size="kiosk-xl"
            onClick={onStart}
            className="shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Agendar Minha Visita
          </Button>
          
          <p className="mt-6 text-lg text-gray-300">
            Toque na tela para começar
          </p>
        </div>
      </div>
    </div>
  );
}