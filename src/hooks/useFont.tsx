'use client';

import { useState, useEffect } from 'react';

const useFont = () => {
  const [selectedFont, setSelectedFont] = useState<string>('font-primary');

  // Funkce pro změnu fontu
  const changeFont = () => {
    if (selectedFont.includes('primary')) {
      setSelectedFont('font-serif');
      localStorage.setItem('selectedFont', 'font-serif');
    } else if (selectedFont.includes('serif')) {
      setSelectedFont('font-mono');
      localStorage.setItem('selectedFont', 'font-mono');
    } else {
      setSelectedFont('font-primary');
      localStorage.setItem('selectedFont', 'font-primary');
    }
  };

  // Načtení fontu z localStorage při prvním načtení
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
      setSelectedFont(savedFont);
    }
  }, []);

  return { selectedFont, changeFont };
};

export default useFont;
