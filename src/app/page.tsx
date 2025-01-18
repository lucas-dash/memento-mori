import MementoMori from '@/components/MementoMori';
import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {
  return (
    <main>
      <ModeToggle />
      <MementoMori />
    </main>
  );
}
