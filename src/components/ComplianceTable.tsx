import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockCompliance } from '@/lib/mockData';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const statusConfig = {
  passed: { icon: CheckCircle2, color: 'text-success', badge: 'bg-success text-success-foreground' },
  failed: { icon: XCircle, color: 'text-destructive', badge: 'bg-destructive text-destructive-foreground' },
  warning: { icon: AlertCircle, color: 'text-warning', badge: 'bg-warning text-warning-foreground' },
};

export function ComplianceTable() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Compliance Status</h2>
      <div className="space-y-3">
        {mockCompliance.map((check) => {
          const config = statusConfig[check.status];
          const Icon = config.icon;
          
          return (
            <div key={check.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${config.color}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{check.framework}</span>
                    <Badge variant="outline" className="text-xs">{check.control}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {check.resources} resources • Last checked {formatDistanceToNow(check.lastChecked, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <Badge className={config.badge}>
                {check.status.toUpperCase()}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
