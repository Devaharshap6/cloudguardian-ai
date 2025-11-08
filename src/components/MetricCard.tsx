import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Metric } from '@/types/security';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;
  const trendColor = metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-foreground">{metric.value.toLocaleString()}</h3>
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            <Icon className="h-4 w-4" />
            <span>{Math.abs(metric.change)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
