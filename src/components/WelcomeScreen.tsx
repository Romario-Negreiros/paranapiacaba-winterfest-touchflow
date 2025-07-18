import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Mountain, Snowflake } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Decorative winter elements - responsive sizes */}
      <div className="absolute top-4 sm:top-10 left-4 sm:left-10 text-white/20">
        <Snowflake className="w-8 sm:w-12 h-8 sm:h-12 animate-pulse" />
      </div>
      <div className="absolute top-8 sm:top-20 right-4 sm:right-20 text-white/20">
        <Mountain className="w-12 sm:w-16 h-12 sm:h-16" />
      </div>
      <div className="absolute bottom-8 sm:bottom-20 left-4 sm:left-20 text-white/20">
        <Snowflake className="w-6 sm:w-8 h-6 sm:h-8 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 text-white/20">
        <Snowflake className="w-8 sm:w-10 h-8 sm:h-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 text-white/10">
        <Mountain className="w-16 lg:w-20 h-16 lg:h-20" />
      </div>
      <div className="hidden sm:block absolute top-1/3 right-1/3 text-white/10">
        <Snowflake className="w-4 lg:w-6 h-4 lg:h-6 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
            Festival de Inverno
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 text-blue-200">
            Paranapiacaba
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
            Agende sua visita e viva momentos únicos na vila mais charmosa do inverno brasileiro
          </p>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-scale-in max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-4 sm:p-6 min-h-[100px]">
            <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-blue-300 flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-base sm:text-lg">Período</p>
              <p className="text-blue-200 text-sm sm:text-base">Junho - Agosto</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-4 sm:p-6 min-h-[100px]">
            <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-blue-300 flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-base sm:text-lg">Local</p>
              <p className="text-blue-200 text-sm sm:text-base">Vila de Paranapiacaba</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-kiosk p-4 sm:p-6 min-h-[100px]">
            <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-blue-300 flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-base sm:text-lg">Horário</p>
              <p className="text-blue-200 text-sm sm:text-base">9h às 18h</p>
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

        </div>
      </div>
    </div>
  );
}