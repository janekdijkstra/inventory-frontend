import {useEffect} from "react";
import {mapENToDE} from "@/components/scanner/map-keyboard";

export const useScanner = (handleScanned: (scanned: string) => void) => {
  useEffect(() => {
    const scannerTimeout = 100;

    let lastInput: string = "";
    let lastInputTime: number = 0;

    const handleKeyPress = (ev: KeyboardEvent) => {
      const now = Date.now();
      if (now > lastInputTime + scannerTimeout) {
        lastInput = "";
      }
      lastInputTime = now;

      if (ev.key === "Enter") {
        if (lastInput) {
          ev.preventDefault();
          ev.stopPropagation();
          handleScanned(mapENToDE(lastInput));
          lastInput = "";
        }
        return;
      }
      lastInput += ev.key;
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleScanned]);
};
