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
import useFont from '@/hooks/useFont';

export default function MementoMori() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [averageLifespan] = useState<number>(80);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [percentageLeft, setPercentageLeft] = useState<number>(0);
  const { selectedFont, changeFont } = useFont();

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

  const handleBirthDateSubmit = (date: Date) => {
    setBirthDate(date);
    localStorage.setItem('birthDate', date.toISOString());
  };

  return (
    <section
      className={cn(
        selectedFont,
        'flex flex-col border border-border rounded-2xl w-[330px] sm:w-[350px] h-max p-4 bg-background'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg text-center">Memento Mori</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={changeFont}
                className="relative bottom-2 left-1"
              >
                <TypeOutline size={16} />
              </TooltipTrigger>
              <TooltipContent className="rounded-xl">
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
            filledCount={differenceInYears(new Date(), birthDate)}
            emptyCount={
              averageLifespan - differenceInYears(new Date(), birthDate)
            }
          />

          {birthDate && (
            <div className="flex justify-between items-center">
              <p className="font-medium">{percentageLeft}% left</p>
              <p className="font-medium">{daysLeft} days left</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
