import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Mountain, Snowflake } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-ice flex flex-col justify-center items-center relative overflow-hidden">
      {/* Decorative winter elements */}
      <div className="absolute top-10 left-10 text-primary/20">
        <Snowflake className="w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 text-primary/20">
        <Mountain className="w-16 h-16" />
      </div>
      <div className="absolute bottom-20 left-20 text-primary/20">
        <Snowflake className="w-8 h-8 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-10 right-10 text-primary/20">
        <Snowflake className="w-10 h-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-card">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 animate-fade-in">
            Festival de Inverno
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary-dark mb-6 animate-fade-in">
            Paranapiacaba 2024
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Agende sua visita ao maior festival de inverno da região serrana. 
            Uma experiência inesquecível entre as montanhas e a história.
          </p>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-scale-in">
            <div className="flex items-center justify-center gap-3 bg-primary/5 rounded-lg p-4">
              <Calendar className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-primary">Período</p>
                <p className="text-muted-foreground text-sm">Junho - Agosto</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-primary/5 rounded-lg p-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-primary">Local</p>
                <p className="text-muted-foreground text-sm">Vila de Paranapiacaba</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-primary/5 rounded-lg p-4">
              <Clock className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-primary">Horário</p>
                <p className="text-muted-foreground text-sm">9h às 18h</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-scale-in">
            <Button 
              variant="kiosk" 
              size="kiosk-xl"
              onClick={onStart}
              className="shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Agendar Minha Visita
            </Button>
            
            <p className="mt-4 text-muted-foreground">
              Toque na tela para começar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}