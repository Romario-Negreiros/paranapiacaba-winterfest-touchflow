import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Mountain, Snowflake } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Decorative winter elements */}
      <div className="absolute top-10 left-10 text-white/20">
        <Snowflake className="w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 text-white/20">
        <Mountain className="w-16 h-16" />
      </div>
      <div className="absolute bottom-20 left-20 text-white/20">
        <Snowflake className="w-8 h-8 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-10 right-10 text-white/20">
        <Snowflake className="w-10 h-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute top-1/2 left-1/4 text-white/10">
        <Mountain className="w-20 h-20" />
      </div>
      <div className="absolute top-1/3 right-1/3 text-white/10">
        <Snowflake className="w-6 h-6 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
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