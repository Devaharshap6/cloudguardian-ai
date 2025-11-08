import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

const threatLocations = [
  { country: 'United States', threats: 145, coords: { x: 25, y: 35 } },
  { country: 'Germany', threats: 89, coords: { x: 50, y: 30 } },
  { country: 'Singapore', threats: 67, coords: { x: 75, y: 55 } },
  { country: 'Brazil', threats: 34, coords: { x: 35, y: 65 } },
  { country: 'Japan', threats: 52, coords: { x: 82, y: 40 } },
];

export function ThreatMap() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Geographic Threat Distribution</h2>
      <div className="relative h-[400px] bg-secondary rounded-lg overflow-hidden">
        {/* Simplified world map visualization */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M20,25 Q25,20 30,25 L35,28 Q40,30 45,28 L50,25 Q55,23 60,25 L65,28 Q70,32 75,30"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-foreground"
            />
          </svg>
        </div>
        
        {/* Threat markers */}
        {threatLocations.map((location, i) => (
          <div
            key={i}
            className="absolute group cursor-pointer"
            style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="h-4 w-4 rounded-full bg-destructive opacity-75" />
              </div>
              <MapPin className="h-6 w-6 text-destructive relative z-10" />
            </div>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-card border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                <p className="font-semibold text-foreground text-sm">{location.country}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="destructive" className="text-xs">
                    {location.threats} threats
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-5 gap-2 mt-4">
        {threatLocations.map((location, i) => (
          <div key={i} className="text-center p-2 rounded bg-secondary border border-border">
            <p className="text-xs text-muted-foreground">{location.country}</p>
            <p className="text-lg font-bold text-foreground">{location.threats}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
