type DotGridProps = {
  yearsLived: number;
  yearsLeft: number;
};

const DotGrid: React.FC<DotGridProps> = ({ yearsLived, yearsLeft }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {/* Fill dots */}
      {Array(yearsLived)
        .fill(null)
        .map((_, index) => (
          <div
            key={`lived-${index}`}
            className="w-4 h-4 bg-primary rounded-full"
          ></div>
        ))}

      {/* Empty dots */}
      {Array(yearsLeft)
        .fill(null)
        .map((_, index) => (
          <div
            key={`left-${index}`}
            className="w-4 h-4 bg-gray-300 rounded-full"
          ></div>
        ))}
    </div>
  );
};

export default DotGrid;
