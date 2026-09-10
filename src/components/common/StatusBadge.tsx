import React from 'react';
import { OrderStatus } from '../../types';
import { Clock, CheckCircle2, Truck, CheckCheck, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus | 'pending' | 'available' | 'accepted' | 'declined';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'ordered':
      case 'pending':
      case 'available':
        return {
          label: status === 'ordered' ? 'Ordered (Escrow)' : status === 'available' ? 'Open Load' : 'Pending',
          icon: Clock,
          className: 'status-badge pending',
          dotColor: '#D97706'
        };
      case 'paid':
      case 'accepted':
        return {
          label: status === 'accepted' ? 'Accepted' : '50% Paid / Escrow',
          icon: CheckCircle2,
          className: 'status-badge paid',
          dotColor: '#16A34A'
        };
      case 'picked_up':
      case 'in_transit':
        return {
          label: status === 'picked_up' ? 'Picked Up' : 'In Transit',
          icon: Truck,
          className: 'status-badge in_transit',
          dotColor: '#0284C7'
        };
      case 'delivered':
        return {
          label: 'Delivered',
          icon: CheckCheck,
          className: 'status-badge delivered',
          dotColor: '#059669'
        };
      case 'declined':
        return {
          label: 'Declined',
          icon: AlertCircle,
          className: 'status-badge pending',
          dotColor: '#DC2626'
        };
      default:
        return {
          label: String(status),
          icon: Clock,
          className: 'status-badge pending',
          dotColor: '#D97706'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  return (
    <span
      className={`${config.className} ${size === 'sm' ? 'text-[11px] py-0.5 px-2' : 'text-xs py-1 px-2.5'}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
    >
      <IconComponent size={size === 'sm' ? 12 : 14} />
      <span>{config.label}</span>
    </span>
  );
};
