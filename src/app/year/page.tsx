'use client';

import { differenceInDays, startOfYear, endOfYear } from 'date-fns';
import { cn } from '@/lib/utils';
import DotGrid from '@/components/DotsGrid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TypeOutline } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function YearProgress() {
  const [selectedFont, setSelectedFont] = useState<string>('font-primary');

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

  // Load font from LS
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
      setSelectedFont(savedFont);
    }
  }, []);

  const currentDate = new Date();
  const start = startOfYear(currentDate);
  const end = endOfYear(currentDate);

  const daysInYear = differenceInDays(end, start) + 1;
  const elapsedDays = differenceInDays(currentDate, start) + 1;
  const percentagePassed = ((elapsedDays / daysInYear) * 100).toFixed(0);
  const remainingDays = daysInYear - elapsedDays;

  return (
    <section
      className={cn(
        selectedFont,
        'flex flex-col border border-border rounded-2xl w-[350px] h-max p-4 bg-background'
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg text-center">Year Progress</h1>
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
        <p className="font-semibold">{Number(percentagePassed)}%</p>
      </div>

      <DotGrid filledCount={elapsedDays} emptyCount={remainingDays} />
      <p className="text-right font-medium">{remainingDays} days left</p>
    </section>
  );
}
