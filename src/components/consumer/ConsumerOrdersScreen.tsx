import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { TransparentTransactionCard } from '../common/TransparentTransactionCard';
import {
  PackageCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Navigation,
  AlertCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const ConsumerOrdersScreen: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, setConsumerSubScreen } = useApp();
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'in_transit' | 'delivered'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(selectedOrderId || orders[0]?.id || null);

  const filteredOrders = orders.filter(o => {
    if (activeTabFilter === 'in_transit') return o.status === 'in_transit' || o.status === 'ordered';
    if (activeTabFilter === 'delivered') return o.status === 'delivered';
    return true;
  });

  const handleTrackLive = (order: OrderItem) => {
    setSelectedOrderId(order.id);
    setConsumerSubScreen('tracking');
  };

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
          My Harvest Orders
        </h2>
        <span style={{ fontSize: '12px', color: '#7E8B76' }}>
          Real-time farm-to-door tracking & payment timelines
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'in_transit', label: 'Active Transit' },
          { id: 'delivered', label: 'Delivered' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabFilter(tab.id as any)}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTabFilter === tab.id ? '#2D5016' : '#FFFFFF',
              color: activeTabFilter === tab.id ? '#FFFFFF' : '#515C4B',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeTabFilter === tab.id ? '0 2px 8px rgba(45, 80, 22, 0.2)' : 'var(--shadow-sm)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredOrders.map((order) => {
          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              onClick={() => setExpandedId(isExpanded ? null : order.id)}
              className="agri-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: isExpanded ? '2px solid #2D5016' : '1px solid #E5DDCB'
              }}
            >
              {/* Order Header */}
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

              {/* Farmer and Qty */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#515C4B', marginBottom: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#C77D3B" />
                  <span>{order.farmerName.split(' ')[0]} &bull; {order.farmerLocation.split(',')[0]}</span>
                </span>
                <span style={{ fontWeight: 700, color: '#1C2417' }}>
                  {order.quantity} {order.unit}
                </span>
              </div>

              {/* Remaining Balance Card if half-paid */}
              {order.amountPending > 0 && (
                <div
                  style={{
                    backgroundColor: '#FEF3C7',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    border: '1px solid #FDE68A'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#92400E' }}>
                    Remaining 50% Balance (Due on Arrival):
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#92400E' }}>
                    ₹{order.amountPending.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Bottom Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid #F0EAE1'
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', color: '#7E8B76' }}>Grand Total:</span>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#2D5016' }}>
                    ₹{order.grandTotal.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {order.status === 'in_transit' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrackLive(order);
                      }}
                      style={{
                        backgroundColor: '#E0F2FE',
                        color: '#075985',
                        border: '1px solid #BAE6FD',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Navigation size={12} />
                      <span>Track Live</span>
                    </button>
                  )}

                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#2D5016', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <span>{isExpanded ? 'Hide' : 'Timeline'}</span>
                    <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </span>
                </div>
              </div>

              {/* Expanded Section: Vertical Status Timeline */}
              {isExpanded && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1.5px dashed #D8CEB9'
                  }}
                >
                  <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417', marginBottom: '14px' }}>
                    Vertical Order Status Timeline
                  </h5>

                  {/* Vertical 5-Step Status Timeline (Ordered → Paid → Picked Up → In Transit → Delivered) */}
                  <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Continuous Vertical Line */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        bottom: '12px',
                        left: '8px',
                        width: '2px',
                        backgroundColor: '#E2DBCC'
                      }}
                    />

                    {order.timeline.map((step, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        {/* Step Marker Icon */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '-24px',
                            top: '2px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: step.completed ? '#2D5016' : '#FFFFFF',
                            border: step.completed ? 'none' : '2px solid #C7BDAC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF'
                          }}
                        >
                          {step.completed && <CheckCircle2 size={12} />}
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h6 style={{ fontSize: '13px', fontWeight: 700, color: step.completed ? '#1C2417' : '#7E8B76', margin: 0 }}>
                              {step.label}
                            </h6>
                            <span style={{ fontSize: '10px', color: '#7E8B76' }}>{step.time}</span>
                          </div>
                          <p style={{ fontSize: '11px', color: '#515C4B', margin: '2px 0 0 0', lineHeight: 1.4 }}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Itemized Receipt breakdown */}
                  <TransparentTransactionCard order={order} viewingRole="consumer" showTitle={false} />

                  {/* Live Tracking CTA */}
                  {order.status === 'in_transit' && (
                    <button
                      onClick={() => handleTrackLive(order)}
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '12px', padding: '12px', fontSize: '13px' }}
                    >
                      <Navigation size={16} />
                      <span>Open Live Truck Tracking Map</span>
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
