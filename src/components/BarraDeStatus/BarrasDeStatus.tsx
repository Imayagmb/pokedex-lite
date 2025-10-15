import { Status, STAT_NAMES, STAT_MAX_VALUES } from '../../types/Status';

interface BarrasDeStatusProps {
  stats: Status[];
}

export function BarrasDeStatus({ stats }: BarrasDeStatusProps) {
  return (
    <div className="space-y-2">
      {stats.map((stat) => {
        const percentage = (stat.value / stat.maxValue) * 100;
        const displayName = STAT_NAMES[stat.name] || stat.name;

        return (
          <div key={stat.name} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{displayName}</span>
              <span className="font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: getStatColor(percentage),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStatColor(percentage: number): string {
  if (percentage >= 80) return '#10b981';
  if (percentage >= 60) return '#3b82f6';
  if (percentage >= 40) return '#f59e0b';
  return '#ef4444';
}

export function convertPokemonStats(pokemonStats: { base_stat: number; stat: { name: string } }[]): Status[] {
  return pokemonStats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
    maxValue: STAT_MAX_VALUES[stat.stat.name] || 200,
  }));
}
