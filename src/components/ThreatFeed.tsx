import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecurityEvent } from '@/types/security';
import { generateMockEvent } from '@/lib/mockData';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const severityConfig = {
  critical: { color: 'bg-destructive text-destructive-foreground', icon: AlertTriangle },
  high: { color: 'bg-warning text-warning-foreground', icon: AlertTriangle },
  medium: { color: 'bg-primary text-primary-foreground', icon: Activity },
  low: { color: 'bg-secondary text-secondary-foreground', icon: Shield },
  info: { color: 'bg-muted text-muted-foreground', icon: Shield },
};

export function ThreatFeed() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    // Initial events
    const initialEvents = Array.from({ length: 5 }, generateMockEvent);
    setEvents(initialEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

    // Add new event every 5 seconds
    const interval = setInterval(() => {
      const newEvent = generateMockEvent();
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary animate-pulse" />
        <h2 className="text-xl font-semibold text-foreground">Live Threat Feed</h2>
      </div>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {events.map((event) => {
          const config = severityConfig[event.severity];
          const Icon = config.icon;
          
          return (
            <div
              key={event.id}
              className="p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-all duration-300 animate-in slide-in-from-top"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {event.cloudProvider.toUpperCase()}
                      </Badge>
                      <Badge className={config.color}>
                        {event.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {event.user} • {event.region} • {event.ipAddress}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
