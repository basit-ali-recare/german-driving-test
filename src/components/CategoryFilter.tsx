import { Button } from '@/components/ui/button';
import { categoryInfo, type CommandCategory } from '@/data/examCommands';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategories: CommandCategory[];
  onToggleCategory: (category: CommandCategory) => void;
  onClearAll: () => void;
}

export function CategoryFilter({ 
  selectedCategories, 
  onToggleCategory, 
  onClearAll 
}: CategoryFilterProps) {
  const categories = Object.entries(categoryInfo) as [CommandCategory, typeof categoryInfo[CommandCategory]][];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Filter by Category</h3>
        {selectedCategories.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="text-xs h-7"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map(([key, info]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => onToggleCategory(key)}
            className={cn(
              "h-9 px-3 transition-all",
              selectedCategories.includes(key) 
                ? "bg-primary/20 border-primary text-primary hover:bg-primary/30" 
                : "hover:bg-secondary"
            )}
          >
            <span className="mr-1.5">{info.icon}</span>
            {info.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

