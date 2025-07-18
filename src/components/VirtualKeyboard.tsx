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
    <div className="bg-white border-t-4 border-primary shadow-kiosk p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-primary">Teclado Virtual</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="min-h-[44px] min-w-[44px]">
            <X className="w-5 sm:w-6 h-5 sm:h-6" />
          </Button>
        </div>

        {/* Numbers Row */}
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 justify-center flex-wrap">
          {numbers.map((num) => (
            <Button
              key={num}
              variant="kiosk-outline"
              size="kiosk"
              onClick={() => onInput(num)}
              className="w-12 sm:w-16 h-12 sm:h-16 text-lg sm:text-xl min-h-[44px] min-w-[44px]"
            >
              {num}
            </Button>
          ))}
        </div>

        {/* Letters */}
        {letters.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 justify-center flex-wrap">
            {rowIndex === 2 && (
              <Button
                variant={isCapsLock ? "kiosk" : "kiosk-outline"}
                size="kiosk"
                onClick={() => setIsCapsLock(!isCapsLock)}
                className="w-16 sm:w-20 h-12 sm:h-16 text-xs sm:text-sm min-h-[44px]"
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
                className="w-12 sm:w-16 h-12 sm:h-16 text-lg sm:text-xl min-h-[44px] min-w-[44px]"
              >
                {isCapsLock ? letter : letter.toLowerCase()}
              </Button>
            ))}
          </div>
        ))}

        {/* Special Characters and Controls */}
        <div className="flex gap-1 sm:gap-2 justify-center items-center flex-wrap">
          {/* Special chars */}
          {specialChars.map((char) => (
            <Button
              key={char}
              variant="kiosk-outline"
              size="kiosk"
              onClick={() => onInput(char)}
              className="w-12 sm:w-16 h-12 sm:h-16 text-base sm:text-xl min-h-[44px] min-w-[44px]"
            >
              {char === ' ' ? (
                <span className="text-xs sm:text-sm">Espaço</span>
              ) : (
                char
              )}
            </Button>
          ))}
          
          {/* Backspace */}
          <Button
            variant="destructive"
            size="kiosk"
            onClick={onBackspace}
            className="w-16 sm:w-20 h-12 sm:h-16 min-h-[44px]"
          >
            <Delete className="w-5 sm:w-6 h-5 sm:h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}