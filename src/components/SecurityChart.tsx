import { Card } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const threatData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  critical: Math.floor(Math.random() * 10),
  high: Math.floor(Math.random() * 20),
  medium: Math.floor(Math.random() * 30),
}));

const providerData = [
  { name: 'AWS', events: 487 },
  { name: 'Azure', events: 312 },
  { name: 'GCP', events: 448 },
];

export function ThreatTrendChart() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Threat Trends (24h)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={threatData}>
          <defs>
            <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="highGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }} 
          />
          <Legend />
          <Area type="monotone" dataKey="critical" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#criticalGradient)" />
          <Area type="monotone" dataKey="high" stroke="hsl(var(--warning))" fillOpacity={1} fill="url(#highGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function ProviderDistributionChart() {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Events by Cloud Provider</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={providerData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }} 
          />
          <Bar dataKey="events" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
