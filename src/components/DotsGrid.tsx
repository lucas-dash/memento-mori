type DotGridProps = {
  filledCount: number;
  emptyCount: number;
};

const DotGrid: React.FC<DotGridProps> = ({ filledCount, emptyCount }) => {
  return (
    <div className="flex flex-wrap gap-1 py-3">
      {/* Fill dots */}
      {Array(filledCount)
        .fill(null)
        .map((_, index) => (
          <div
            key={`lived-${index}`}
            className="w-3 h-3 bg-primary rounded-full"
          ></div>
        ))}

      {/* Empty dots */}
      {Array(emptyCount)
        .fill(null)
        .map((_, index) => (
          <div
            key={`left-${index}`}
            className="w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full"
          ></div>
        ))}
    </div>
  );
};

export default DotGrid;
