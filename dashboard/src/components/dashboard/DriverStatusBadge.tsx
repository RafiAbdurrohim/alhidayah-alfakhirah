import { Badge } from '@/components/ui/Badge';
import type { DriverStatus } from '@/types';

interface DriverStatusBadgeProps {
  status: DriverStatus;
}

export function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const config: Record<DriverStatus, { label: string; variant: any }> = {
    AVAILABLE: { label: 'Available', variant: 'success' },
    BUSY: { label: 'Busy', variant: 'warning' },
    OFFLINE: { label: 'Offline', variant: 'default' },
  };

  const { label, variant } = config[status];

  return <Badge variant={variant}>{label}</Badge>;
}