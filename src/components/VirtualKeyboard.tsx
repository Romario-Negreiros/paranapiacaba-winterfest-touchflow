import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete, X } from "lucide-react";

interface VirtualKeyboardProps {
  activeField: string;
  onInput: (value: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

export function VirtualKeyboard({ activeField, onInput, onBackspace, onClose }: VirtualKeyboardProps) {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const isEmail = activeField === 'email';
  
  const letters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  const specialChars = isEmail 
    ? ['@', '.', '-', '_'] 
    : ['@', '.', '-', '(', ')', ' '];

  return (
    <div className="bg-white border-t-4 border-primary shadow-kiosk p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-primary">Teclado Virtual</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Numbers Row */}
        <div className="flex gap-2 mb-3 justify-center">
          {numbers.map((num) => (
            <Button
              key={num}
              variant="kiosk-outline"
              size="kiosk"
              onClick={() => onInput(num)}
              className="w-16 h-16 text-xl"
            >
              {num}
            </Button>
          ))}
        </div>

        {/* Letters */}
        {letters.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 mb-3 justify-center">
            {rowIndex === 2 && (
              <Button
                variant={isCapsLock ? "kiosk" : "kiosk-outline"}
                size="kiosk"
                onClick={() => setIsCapsLock(!isCapsLock)}
                className="w-20 h-16 text-sm"
              >
                CAPS
              </Button>
            )}
            {row.map((letter) => (
              <Button
                key={letter}
                variant="kiosk-outline"
                size="kiosk"
                onClick={() => onInput(isCapsLock ? letter : letter.toLowerCase())}
                className="w-16 h-16 text-xl"
              >
                {isCapsLock ? letter : letter.toLowerCase()}
              </Button>
            ))}
          </div>
        ))}

        {/* Special Characters and Controls */}
        <div className="flex gap-2 justify-center items-center">
          {/* Special chars */}
          {specialChars.map((char) => (
            <Button
              key={char}
              variant="kiosk-outline"
              size="kiosk"
              onClick={() => onInput(char)}
              className="w-16 h-16 text-xl"
            >
              {char === ' ' ? 'Espaço' : char}
            </Button>
          ))}
          
          {/* Backspace */}
          <Button
            variant="destructive"
            size="kiosk"
            onClick={onBackspace}
            className="w-20 h-16"
          >
            <Delete className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}