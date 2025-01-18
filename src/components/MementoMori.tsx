'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { differenceInDays, addYears, differenceInYears } from 'date-fns';
import { RotateCcw, TypeOutline } from 'lucide-react';
import DotGrid from './DotsGrid';
import BirthDateForm from './BirthdateForm';
import { cn } from '@/lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MementoMori() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [averageLifespan] = useState<number>(80);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [percentageLeft, setPercentageLeft] = useState<number>(0);
  const [selectedFont, setSelectedFont] = useState('font-primary');

  // birthdate load
  useEffect(() => {
    const storedDate = localStorage.getItem('birthDate');
    if (storedDate) {
      setBirthDate(new Date(storedDate));
    }
  }, []);

  // statistic load
  useEffect(() => {
    if (birthDate) {
      const currentDate = new Date();
      const endDate = addYears(birthDate, averageLifespan);
      const totalDays = differenceInDays(endDate, currentDate);

      setDaysLeft(totalDays);

      const age = differenceInDays(currentDate, birthDate) / 365.25;
      const percentLeft = ((averageLifespan - age) / averageLifespan) * 100;
      setPercentageLeft(Number(percentLeft.toFixed(0)));
    }
  }, [birthDate, averageLifespan]);

  const changeFonts = () => {
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

  // load font from LS
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
      setSelectedFont(savedFont);
    }
  }, []);

  const handleBirthDateSubmit = (date: Date) => {
    setBirthDate(date);
    localStorage.setItem('birthDate', date.toISOString());
  };

  return (
    <section
      className={cn(
        'flex flex-col border border-border rounded-2xl w-[350px] h-max p-4',
        selectedFont
      )}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center ">
          <h1 className="font-semibold text-lg text-center">Memento Mori</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={changeFonts}
                className="relative bottom-2 left-1"
              >
                <TypeOutline size={16} />
              </TooltipTrigger>
              <TooltipContent className="rounded-2xl">
                <p className="font-medium">Change Font</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {birthDate && (
          <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full"
            onClick={() => {
              localStorage.removeItem('birthDate');
              setBirthDate(null);
            }}
          >
            <RotateCcw />
          </Button>
        )}
      </div>
      {!birthDate ? (
        <BirthDateForm onSubmit={handleBirthDateSubmit} />
      ) : (
        <div className="text-center">
          <DotGrid
            yearsLived={differenceInYears(new Date(), birthDate)}
            yearsLeft={
              averageLifespan - differenceInYears(new Date(), birthDate)
            }
          />

          {birthDate && (
            <div className="flex justify-between items-center mt-3">
              <p className="font-medium">{percentageLeft}% left</p>
              <p className="font-medium">{daysLeft} days left</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
