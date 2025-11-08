import { SecurityEvent, Metric, ComplianceCheck, CloudProvider, SeverityLevel, ThreatType } from '@/types/security';

const threatTypes: ThreatType[] = ['privilege-escalation', 'data-exfiltration', 'api-misuse', 'unusual-login', 'unauthorized-resource'];
const cloudProviders: CloudProvider[] = ['aws', 'azure', 'gcp'];
const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'eu-central-1'];
const users = ['admin@company.com', 'dev@company.com', 'john.doe@company.com', 'system-user', 'api-service'];

const threatTitles: Record<ThreatType, string[]> = {
  'privilege-escalation': [
    'Unauthorized IAM Policy Attachment',
    'Role Assumption by Non-Admin User',
    'Admin Group Membership Change',
  ],
  'data-exfiltration': [
    'Unusual S3 Download Activity',
    'Large Data Transfer Detected',
    'Database Export to External IP',
  ],
  'api-misuse': [
    'API Calls from Unrecognized Region',
    'Rare API Pattern Detected',
    'Excessive API Rate',
  ],
  'unusual-login': [
    'Multiple Failed Login Attempts',
    'Login from New Geographic Location',
    'Impossible Travel Detected',
  ],
  'unauthorized-resource': [
    'EC2 Instance Launched Outside Compliance Region',
    'Unauthorized Resource Creation',
    'Public S3 Bucket Created',
  ],
};

export function generateMockEvent(): SecurityEvent {
  const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const severity: SeverityLevel = ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as SeverityLevel;
  const provider = cloudProviders[Math.floor(Math.random() * cloudProviders.length)];
  const titles = threatTitles[type];
  
  return {
    id: `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    severity,
    type,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: 'Suspicious activity detected requiring immediate investigation',
    source: `${provider}-cloudtrail`,
    cloudProvider: provider,
    region: regions[Math.floor(Math.random() * regions.length)],
    ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    user: users[Math.floor(Math.random() * users.length)],
    resource: `resource-${Math.random().toString(36).substr(2, 9)}`,
    action: ['CreateUser', 'AttachPolicy', 'GetObject', 'PutBucketPolicy', 'RunInstances'][Math.floor(Math.random() * 5)],
    status: ['detected', 'investigating'][Math.floor(Math.random() * 2)] as any,
  };
}

export function generateMockEvents(count: number): SecurityEvent[] {
  return Array.from({ length: count }, generateMockEvent).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const mockMetrics: Metric[] = [
  { label: 'Total Events', value: 1247, change: 12, trend: 'up' },
  { label: 'Critical Alerts', value: 23, change: -5, trend: 'down' },
  { label: 'Active Threats', value: 8, change: 2, trend: 'up' },
  { label: 'Compliance Score', value: 94, change: 1, trend: 'up' },
];

export const mockCompliance: ComplianceCheck[] = [
  {
    id: '1',
    framework: 'NIST CSF',
    control: 'DE.CM-1',
    status: 'passed',
    lastChecked: new Date(),
    resources: 145,
  },
  {
    id: '2',
    framework: 'ISO 27001',
    control: 'A.12.4',
    status: 'warning',
    lastChecked: new Date(),
    resources: 89,
  },
  {
    id: '3',
    framework: 'CIS Benchmark',
    control: '2.1.1',
    status: 'failed',
    lastChecked: new Date(),
    resources: 12,
  },
  {
    id: '4',
    framework: 'NIST CSF',
    control: 'RS.AN-1',
    status: 'passed',
    lastChecked: new Date(),
    resources: 234,
  },
];
