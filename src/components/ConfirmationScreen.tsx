import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Home } from "lucide-react";

interface ConfirmationScreenProps {
  protocolNumber: string;
  visitDate: string;
  onBackToHome: () => void;
}

export function ConfirmationScreen({ protocolNumber, visitDate, onBackToHome }: ConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-ice flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-card animate-fade-in">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-primary mb-2">
            Agendamento Confirmado!
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            Seu agendamento foi realizado com sucesso
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Protocol Number - Highlight */}
          <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-primary">
                Número do Protocolo
              </h3>
            </div>
            <div className="text-4xl font-bold text-primary mb-3 tracking-wider">
              {protocolNumber}
            </div>
            <p className="text-sm text-muted-foreground">
              ⚠️ ANOTE ESTE NÚMERO - Você precisará dele no dia da visita
            </p>
          </div>

          {/* Visit Information */}
          <div className="bg-white/50 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Informações da Visita:</h4>
            <p className="text-lg">
              <strong>Data:</strong> {visitDate}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Você receberá uma confirmação por email com todos os detalhes.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Instruções importantes:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Chegue com 15 minutos de antecedência</li>
              <li>• Apresente um documento com foto</li>
              <li>• Tenha em mãos o número do protocolo: <strong>{protocolNumber}</strong></li>
              <li>• Use roupas adequadas para o clima de inverno</li>
            </ul>
          </div>

          {/* Back Button */}
          <Button 
            variant="kiosk" 
            size="kiosk"
            onClick={onBackToHome}
            className="w-full mt-6"
          >
            <Home className="w-6 h-6 mr-2" />
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}