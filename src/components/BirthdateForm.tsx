import { Button } from './ui/button';
import { Input } from './ui/input';

type BirthDateFormProps = {
  onSubmit: (birthDate: Date) => void;
};

const BirthDateForm: React.FC<BirthDateFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputDate = (e.target as HTMLFormElement).birthDate.value;
    const parsedDate = new Date(inputDate);

    if (parsedDate && !isNaN(parsedDate.getTime())) {
      onSubmit(parsedDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
      <Input
        type="date"
        id="birthDate"
        name="birthDate"
        placeholder="Date of birth"
      />

      <Button type="submit" className="rounded-xl">
        Submit
      </Button>
    </form>
  );
};

export default BirthDateForm;
