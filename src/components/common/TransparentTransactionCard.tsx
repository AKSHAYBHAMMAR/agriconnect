import React from 'react';
import { OrderItem } from '../../types';
import { StatusBadge } from './StatusBadge';
import { ShieldCheck, Receipt, ArrowRight, Truck, Sprout, ShoppingBag } from 'lucide-react';

interface TransparentTransactionCardProps {
  order: OrderItem;
  viewingRole: 'farmer' | 'consumer' | 'logistics';
  showTitle?: boolean;
}

export const TransparentTransactionCard: React.FC<TransparentTransactionCardProps> = ({
  order,
  viewingRole,
  showTitle = true
}) => {
  return (
    <div className="receipt-card" style={{ margin: '14px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          {showTitle && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Receipt size={16} color="#C77D3B" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#C77D3B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Transparent Escrow Receipt
              </span>
            </div>
          )}
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
            {order.orderNumber}
          </h4>
          <span style={{ fontSize: '11px', color: '#7E8B76' }}>{order.createdAt}</span>
        </div>
        <StatusBadge status={order.status} size="sm" />
      </div>

      {/* Role specific highlighted pill */}
      <div
        style={{
          backgroundColor: '#F7F4EC',
          borderRadius: '10px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          border: '1px solid #EAE3D2'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {viewingRole === 'farmer' ? (
            <Sprout size={16} color="#2D5016" />
          ) : viewingRole === 'consumer' ? (
            <ShoppingBag size={16} color="#C77D3B" />
          ) : (
            <Truck size={16} color="#0284C7" />
          )}
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#2D5016' }}>
            {viewingRole === 'farmer'
              ? 'Farmer Net Earnings Breakdown'
              : viewingRole === 'consumer'
              ? 'Buyer Cost & Transport Share'
              : 'Logistics Haulage Settlement'}
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 500 }}>
          {order.quantity} {order.unit}
        </span>
      </div>

      {/* Crop Item Line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
        <span style={{ color: '#515C4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🌾</span>
          <span>{order.cropName}</span>
          <span style={{ color: '#7E8B76', fontSize: '11px' }}>({order.variety})</span>
        </span>
        <span style={{ fontWeight: 600, color: '#1C2417' }}>
          ₹{order.cropTotal.toLocaleString()}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', color: '#7E8B76' }}>
        <span>Rate per unit</span>
        <span>₹{order.pricePerUnit}/{order.unit}</span>
      </div>

      {/* Dashed line divider */}
      <div className="receipt-dashed-divider" />

      {/* Transparent Freight Breakdown */}
      <div style={{ backgroundColor: '#FCF9F2', borderRadius: '12px', padding: '12px', marginBottom: '14px', border: '1px solid #EFE8D8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={14} color="#515C4B" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1C2417' }}>Logistics Freight Total</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
            ₹{order.transportTotal.toLocaleString()}
          </span>
        </div>

        {/* 1/4 Farmer and 3/4 Buyer Share */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2D5016' }} />
              Farmer Share (25% / 1/4 deducted):
            </span>
            <span style={{ fontWeight: 600, color: '#C77D3B' }}>-₹{order.farmerTransportShare.toLocaleString()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C77D3B' }} />
              Buyer Share (75% / 3/4 added):
            </span>
            <span style={{ fontWeight: 600, color: '#2D5016' }}>+₹{order.buyerTransportShare.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Dashed line divider */}
      <div className="receipt-dashed-divider" />

      {/* Grand Total & Split Payment Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417' }}>
          {viewingRole === 'farmer' ? 'Farmer Net Payout' : 'Order Invoice Total'}
        </span>
        <span style={{ fontSize: '18px', fontWeight: 800, color: '#2D5016' }}>
          {viewingRole === 'farmer'
            ? `₹${(order.cropTotal - order.farmerTransportShare).toLocaleString()}`
            : `₹${order.grandTotal.toLocaleString()}`}
        </span>
      </div>

      {/* Escrow Payment Split info */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#EEF6E8',
          borderRadius: '8px',
          padding: '8px 10px',
          fontSize: '11px',
          color: '#2D5016',
          fontWeight: 600
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} color="#2D5016" />
          <span>Payment: {order.paymentType === 'split_50' ? '50% Advance Escrow' : '100% Full Escrow'}</span>
        </span>
        <span>
          Paid: ₹{order.amountPaid.toLocaleString()}
          {order.amountPending > 0 ? ` (₹${order.amountPending.toLocaleString()} due)` : ' (Settled)'}
        </span>
      </div>
    </div>
  );
};
