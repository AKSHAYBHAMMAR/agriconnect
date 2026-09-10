import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Navigation,
  CheckCircle2,
  Square,
  CheckSquare,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Compass,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const LogisticsActiveTripScreen: React.FC = () => {
  const {
    bookings,
    activeTripId,
    toggleChecklistItem,
    markPickedUp,
    markDelivered,
    setLogisticsTab,
    showToast
  } = useApp();

  const activeTrip = bookings.find(b => b.id === activeTripId) || bookings[0];
  const [showChecklist, setShowChecklist] = useState(true);

  const isAllChecklistDone = activeTrip.pickupChecklist.every(c => c.checked);
  const isPickedUp = activeTrip.status === 'in_transit' || activeTrip.status === 'delivered';
  const isDelivered = activeTrip.status === 'delivered';

  const handleCallFarmer = () => {
    showToast('info', 'Calling Farm Dispatcher', `Calling ${activeTrip.pickupLocation.contactPhone}...`);
  };

  const handleCallBuyer = () => {
    showToast('info', 'Calling Receiving Dock', `Calling ${activeTrip.dropLocation.contactPhone}...`);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#E8EFE5',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Floating Overlay Bar */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          right: '16px',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => setLogisticsTab('bookings')}
          style={{
            backgroundColor: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            color: '#1C2417'
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#2D5016'
          }}
        >
          <Compass size={14} color="#C77D3B" />
          <span>Active Highway Corridors</span>
        </div>
      </div>

      {/* Stylized Active Map View */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 400 500" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <rect width="100%" height="100%" fill="#E7EFE4" />

          {/* Road networks */}
          <path d="M 0 80 Q 140 100 200 220 T 360 380 T 400 490" fill="none" stroke="#FFFFFF" strokeWidth="18" />
          <path d="M 0 80 Q 140 100 200 220 T 360 380 T 400 490" fill="none" stroke="#C5D5C1" strokeWidth="10" />

          {/* Active Navigation Route */}
          <path
            d="M 60 90 Q 150 120 200 220 T 310 390"
            fill="none"
            stroke="#2D5016"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Farm Pickup Pin */}
          <g transform="translate(60, 90)">
            <circle r="14" fill="#2D5016" />
            <circle r="6" fill="#FFFFFF" />
            <text x="18" y="5" fontSize="11" fontWeight="800" fill="#1C2417">
              {activeTrip.pickupLocation.farmName}
            </text>
          </g>

          {/* Active Vehicle Marker */}
          <g transform="translate(200, 220)">
            <circle r="24" fill="#C77D3B" opacity="0.3">
              <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="15" fill="#C77D3B" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M -5 -2 L -1 -2 L 2 1 L 5 1 L 5 4 L -5 4 Z" fill="#FFFFFF" />
          </g>

          {/* Drop Pin */}
          <g transform="translate(310, 390)">
            <circle r="14" fill="#0284C7" />
            <circle r="6" fill="#FFFFFF" />
            <text x="-120" y="22" fontSize="11" fontWeight="800" fill="#0284C7">
              {activeTrip.dropLocation.hubName}
            </text>
          </g>
        </svg>

        {/* Floating Turn-by-Turn Instruction Banner (like Ride-Hailing Nav) */}
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '16px',
            right: '16px',
            backgroundColor: '#1C330E',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#4A7C2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Navigation size={22} color="#FFFFFF" />
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '10px', color: '#D4E2CC', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              {isPickedUp ? 'In Transit to Mumbai APMC' : 'Navigating to Farm Gate'}
            </span>
            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 0 0' }}>
              {isPickedUp ? 'Kasara Ghat Toll Plaza — Keep Left' : 'Turn right on Dindori Agro Link Rd'}
            </h4>
            <span style={{ fontSize: '11px', color: '#E8A857' }}>
              {isPickedUp ? '42 km remaining (38 mins)' : '1.2 km to farm entrance'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Step-by-Step Navigation & Confirmation Sheet */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '26px 26px 0 0',
          padding: '18px 20px 24px',
          boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.12)',
          borderTop: '1px solid #EAE3D2',
          maxHeight: '48%',
          overflowY: 'auto',
          zIndex: 60
        }}
      >
        <div style={{ width: '38px', height: '4px', backgroundColor: '#E2D9C5', borderRadius: '2px', margin: '0 auto 12px' }} />

        {/* Load Summary & Driver Payout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
              {activeTrip.cropName}
            </h3>
            <span style={{ fontSize: '12px', color: '#515C4B' }}>
              Load: {activeTrip.quantity} {activeTrip.unit} &bull; Payout: ₹{activeTrip.grossPayout.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleCallFarmer}
              style={{
                backgroundColor: '#EEF6E8',
                border: 'none',
                borderRadius: '10px',
                padding: '8px',
                color: '#2D5016',
                cursor: 'pointer'
              }}
              title="Call Farmer"
            >
              <Phone size={16} />
            </button>
          </div>
        </div>

        {/* Quantity Confirmation Checklist at Pickup */}
        <div
          style={{
            backgroundColor: '#FCF9F2',
            borderRadius: '14px',
            padding: '12px 14px',
            border: '1px solid #ECE3D0',
            marginBottom: '16px'
          }}
        >
          <div
            onClick={() => setShowChecklist(!showChecklist)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: showChecklist ? '10px' : 0 }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C2417', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#2D5016" />
              <span>Farm Pickup Verification Checklist</span>
            </span>
            {showChecklist ? <ChevronUp size={16} color="#7E8B76" /> : <ChevronDown size={16} color="#7E8B76" />}
          </div>

          {showChecklist && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeTrip.pickupChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(activeTrip.id, item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: item.checked ? '#166534' : '#515C4B',
                    cursor: 'pointer',
                    textDecoration: item.checked ? 'line-through' : 'none'
                  }}
                >
                  {item.checked ? (
                    <CheckSquare size={16} color="#166534" />
                  ) : (
                    <Square size={16} color="#7E8B76" />
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action Buttons: Mark Picked Up & Mark Delivered */}
        {!isPickedUp ? (
          <button
            onClick={() => markPickedUp(activeTrip.id)}
            className="btn-primary"
            style={{ width: '100%', borderRadius: '14px', fontSize: '15px', padding: '14px' }}
          >
            <CheckCircle2 size={18} />
            <span>Mark Picked Up & Start Navigation</span>
          </button>
        ) : !isDelivered ? (
          <button
            onClick={() => markDelivered(activeTrip.id)}
            className="btn-terracotta"
            style={{ width: '100%', borderRadius: '14px', fontSize: '15px', padding: '14px' }}
          >
            <CheckCircle2 size={18} />
            <span>Mark Delivered & Claim ₹{activeTrip.grossPayout.toLocaleString()} Payout</span>
          </button>
        ) : (
          <div
            style={{
              backgroundColor: '#DCFCE7',
              color: '#166534',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            ✓ Trip Delivered & ₹{activeTrip.grossPayout.toLocaleString()} Transferred
          </div>
        )}
      </div>
    </div>
  );
};
