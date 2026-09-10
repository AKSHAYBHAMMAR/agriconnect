import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, Wallet, ArrowDownLeft, ChevronRight, Truck, ShieldCheck, Download } from 'lucide-react';

export const LogisticsEarningsScreen: React.FC = () => {
  const { bookings } = useApp();
  const [expandedTripId, setExpandedTripId] = useState<string | null>(bookings[0]?.id || null);

  const weeklyPayoutTotal = 14850;
  const completedTripsCount = 7;

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Weekly Total Card at Top */}
      <div
        style={{
          background: 'linear-gradient(135deg, #075985 0%, #0369A1 100%)',
          borderRadius: '24px',
          padding: '22px',
          color: '#FFFFFF',
          marginBottom: '20px',
          boxShadow: '0 10px 28px rgba(3, 105, 161, 0.25)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#BAE6FD', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Transporter Weekly Settlement
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0 0 0', letterSpacing: '-0.02em' }}>
              ₹{weeklyPayoutTotal.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#E0F2FE', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ShieldCheck size={14} color="#7DD3FC" />
              <span>{completedTripsCount} Trips Completed &bull; Weekly Wednesday Cycle</span>
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '10px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Wallet size={24} color="#FFFFFF" />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '14px',
            padding: '12px',
            gap: '8px'
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#BAE6FD' }}>Total Distance Hauled:</span>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>1,240 km</div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#BAE6FD' }}>Avg Rate / km:</span>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>₹11.98/km</div>
          </div>
        </div>
      </div>

      {/* Trip History Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
          Trip Settlement History
        </h3>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#075985',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Download size={13} />
          <span>GST Invoice</span>
        </button>
      </div>

      {/* Trip History List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {bookings.map((booking) => {
          const isExpanded = expandedTripId === booking.id;

          return (
            <div
              key={booking.id}
              onClick={() => setExpandedTripId(isExpanded ? null : booking.id)}
              className="agri-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: isExpanded ? '2px solid #0284C7' : '1px solid #E5DDCB'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#E0F2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0369A1'
                    }}
                  >
                    <Truck size={18} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                      {booking.cropName} &bull; {booking.bookingNumber}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#7E8B76' }}>
                      {booking.pickupLocation.district} &rarr; {booking.dropLocation.district} ({booking.distanceKm} km)
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#166534' }}>
                    ₹{booking.grossPayout.toLocaleString()}
                  </div>
                  <span style={{ fontSize: '10px', color: '#075985', fontWeight: 600 }}>
                    {booking.status === 'delivered' ? 'Settled' : 'In Transit'}
                  </span>
                </div>
              </div>

              {/* Expand Trigger */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #F0EAE1', fontSize: '11px', color: '#515C4B' }}>
                <span>Itemized 25/75 Freight Share Breakdown</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#0284C7', fontWeight: 600 }}>
                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                  <ChevronRight size={13} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </span>
              </div>

              {/* Expandable Cost Breakdown: Total transport cost, Farmer 1/4 share, Buyer 3/4 share */}
              {isExpanded && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#FAF7F0',
                    borderRadius: '12px',
                    border: '1px dashed #D8CEB9',
                    fontSize: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 700, color: '#1C2417' }}>
                    <span>Total Transport Freight Payout:</span>
                    <span>₹{booking.grossPayout.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2D5016' }} />
                        <span>Farmer's 1/4 Share (Escrow Deduction):</span>
                      </span>
                      <span style={{ fontWeight: 600, color: '#2D5016' }}>₹{booking.farmerShareDeduction.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C77D3B' }} />
                        <span>Buyer's 3/4 Share (Contribution at checkout):</span>
                      </span>
                      <span style={{ fontWeight: 600, color: '#C77D3B' }}>₹{booking.buyerShareContribution.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #E2D9C5', marginTop: '10px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7E8B76' }}>
                    <span>Bank Transfer Status:</span>
                    <span style={{ color: '#166534', fontWeight: 700 }}>Direct to HDFC Bank (A/C •••• 9104)</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
