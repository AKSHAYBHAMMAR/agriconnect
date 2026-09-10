import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { TransparentTransactionCard } from '../common/TransparentTransactionCard';
import { Package, User, MapPin, Phone, ChevronRight, X, CheckCircle2, Truck } from 'lucide-react';

export const FarmerOrdersScreen: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, showToast } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(selectedOrderId || orders[0]?.id || null);

  const selectedOrder = orders.find(o => o.id === expandedOrderId);

  const handleConfirmDispatch = (order: OrderItem) => {
    showToast('success', 'Dispatch Handover Ready!', `Order ${order.orderNumber} assigned to driver. Pickup OTP verified.`);
    setExpandedOrderId(null);
  };

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
          Farmer Orders & Dispatch
        </h2>
        <span style={{ fontSize: '12px', color: '#7E8B76' }}>
          {orders.length} orders received with secure escrow commitments
        </span>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {orders.map((order) => {
          const isSelected = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              onClick={() => setExpandedOrderId(isSelected ? null : order.id)}
              className="agri-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: isSelected ? '2px solid #2D5016' : '1px solid #E6DEC9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#C77D3B' }}>
                    {order.orderNumber}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1C2417', margin: '2px 0 0' }}>
                    {order.cropName}
                  </h4>
                </div>
                <StatusBadge status={order.status} size="sm" />
              </div>

              {/* Consumer & Quantity Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#515C4B', margin: '8px 0' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={13} color="#7E8B76" />
                  <span>{order.consumerName}</span>
                </span>
                <span style={{ fontWeight: 700, color: '#1C2417' }}>
                  {order.quantity} {order.unit}
                </span>
              </div>

              {/* Price & Payout Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid #F0EAE1',
                  fontSize: '12px'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#7E8B76' }}>Farmer Net Payout: </span>
                  <span style={{ fontWeight: 800, color: '#2D5016' }}>
                    ₹{(order.cropTotal - order.farmerTransportShare).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#2D5016' }}>
                  <span>{isSelected ? 'Collapse' : 'Expand Receipt'}</span>
                  <ChevronRight size={14} style={{ transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </div>

              {/* Expandable Order Detail Sheet */}
              {isSelected && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: '14px',
                    paddingTop: '14px',
                    borderTop: '1.5px dashed #D8CEB9'
                  }}
                >
                  <TransparentTransactionCard order={order} viewingRole="farmer" showTitle={true} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#515C4B' }}>
                      <MapPin size={14} color="#C77D3B" />
                      <span><strong>Destination:</strong> {order.deliveryAddress}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#515C4B' }}>
                      <Truck size={14} color="#0284C7" />
                      <span><strong>Assigned Transporter:</strong> {order.logisticsPartnerName || 'Driver Matching in Progress'}</span>
                    </div>
                  </div>

                  {order.status === 'ordered' && (
                    <button
                      onClick={() => handleConfirmDispatch(order)}
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '14px', padding: '12px', fontSize: '13px' }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Confirm Farm Dispatch & Handover</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
