'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { differenceInDays, addYears, differenceInYears } from 'date-fns';
import { RotateCcw } from 'lucide-react';
import DotGrid from './DotsGrid';
import BirthDateForm from './BirthdateForm';

export default function MementoMori() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [averageLifespan] = useState<number>(80);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [percentageLeft, setPercentageLeft] = useState<number>(0);

  // initial load
  useEffect(() => {
    const storedDate = localStorage.getItem('birthDate');
    if (storedDate) {
      setBirthDate(new Date(storedDate));
    }
  }, []);

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
    <section className="flex flex-col border border-border rounded-2xl w-[350px] h-max p-4">
      <div className="flex items-center justify-between w-full mb-3">
        <h1 className="font-semibold text-lg text-center">Memento Mori</h1>
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
