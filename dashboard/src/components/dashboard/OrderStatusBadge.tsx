import { Badge } from '@/components/ui/Badge';
import type { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config: Record<OrderStatus, { label: string; variant: any }> = {
    NEW: { label: 'New', variant: 'info' },
    PENDING: { label: 'Pending', variant: 'default' },      // ← tambahkan
    PROCESSING: { label: 'Processing', variant: 'warning' },
    ACCEPTED: { label: 'Accepted', variant: 'default' },
    ASSIGNED: { label: 'Assigned', variant: 'default' },
    PICKED_UP: { label: 'Picked Up', variant: 'warning' },
    ON_THE_WAY: { label: 'On The Way', variant: 'info' },
    DELIVERED: { label: 'Delivered', variant: 'success' },
    CANCELLED: { label: 'Cancelled', variant: 'danger' },
      REJECTED: { label: 'Rejected', variant: 'destructive' },  // ← tambahkan

  };

  const { label, variant } = config[status] || config.NEW;

  return <Badge variant={variant}>{label}</Badge>;
}
