export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ThreatType = 'privilege-escalation' | 'data-exfiltration' | 'api-misuse' | 'unusual-login' | 'unauthorized-resource';
export type CloudProvider = 'aws' | 'azure' | 'gcp';

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  severity: SeverityLevel;
  type: ThreatType;
  title: string;
  description: string;
  source: string;
  cloudProvider: CloudProvider;
  region: string;
  ipAddress: string;
  user: string;
  resource: string;
  action: string;
  status: 'detected' | 'investigating' | 'resolved' | 'false-positive';
}

export interface Metric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ComplianceCheck {
  id: string;
  framework: string;
  control: string;
  status: 'passed' | 'failed' | 'warning';
  lastChecked: Date;
  resources: number;
}
