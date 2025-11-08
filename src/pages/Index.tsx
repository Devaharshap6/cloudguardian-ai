import { Header } from '@/components/Header';
import { MetricCard } from '@/components/MetricCard';
import { ThreatFeed } from '@/components/ThreatFeed';
import { ThreatTrendChart, ProviderDistributionChart } from '@/components/SecurityChart';
import { ComplianceTable } from '@/components/ComplianceTable';
import { ThreatMap } from '@/components/ThreatMap';
import { mockMetrics } from '@/lib/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ThreatTrendChart />
          </div>
          <div>
            <ProviderDistributionChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ThreatMap />
          </div>
          <div>
            <ComplianceTable />
          </div>
        </div>

        {/* Live Threat Feed */}
        <div className="grid grid-cols-1 gap-6">
          <ThreatFeed />
        </div>
      </main>
    </div>
  );
};

export default Index;
