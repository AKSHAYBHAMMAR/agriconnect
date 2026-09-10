import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  ShieldCheck,
  Navigation,
  MapPin,
  Truck,
  Star,
  Clock,
  Compass
} from 'lucide-react';

export const ConsumerLiveTrackingScreen: React.FC = () => {
  const { orders, selectedOrderId, setConsumerSubScreen, showToast } = useApp();
  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  const [simulatedEta, setSimulatedEta] = useState<number>(order.etaMinutes || 38);

  const handleCallDriver = () => {
    showToast('info', 'Calling Driver', `Dialing ${order.logisticsPartnerName || 'Ramesh Verma'} (+91 98901 22894)...`);
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
      {/* Top Floating Bar */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => setConsumerSubScreen(null)}
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
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
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
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            fontSize: '12px',
            fontWeight: 700,
            color: '#2D5016'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }} />
          <span>GPS Live Broadcast</span>
        </div>
      </div>

      {/* Stylized Map Placeholder with Route Line */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Stylized SVG Map Graphics */}
        <svg
          viewBox="0 0 400 600"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <defs>
            {/* Map terrain grid pattern */}
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDE7D8" strokeWidth="1" />
            </pattern>

            <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2D5016" />
              <stop offset="60%" stopColor="#4A7C2A" />
              <stop offset="100%" stopColor="#C77D3B" />
            </linearGradient>
          </defs>

          {/* Map Base Canvas */}
          <rect width="100%" height="100%" fill="#E9F0E6" />
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Green Agricultural Land Zones */}
          <path d="M 20 60 Q 90 40 140 90 T 220 140 T 120 220 Z" fill="#D5E8CE" opacity="0.6" />
          <path d="M 220 300 Q 320 280 360 360 T 260 480 Z" fill="#D5E8CE" opacity="0.6" />

          {/* Simulated Highway / Road Network */}
          <path d="M -20 120 Q 150 160 210 240 T 380 340 T 420 520" fill="none" stroke="#FFFFFF" strokeWidth="14" />
          <path d="M -20 120 Q 150 160 210 240 T 380 340 T 420 520" fill="none" stroke="#CBD8C6" strokeWidth="8" />

          {/* Connecting secondary roads */}
          <path d="M 120 0 L 140 200 L 40 380" fill="none" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M 240 180 L 380 200" fill="none" stroke="#FFFFFF" strokeWidth="6" />

          {/* Active Navigation Route Line (Animated dashed glow) */}
          <path
            d="M 110 110 C 160 170 200 230 220 310 S 260 420 280 470"
            fill="none"
            stroke="#2D5016"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 4"
          />

          {/* Pickup Farm Pin */}
          <g transform="translate(110, 110)">
            <circle r="18" fill="#2D5016" opacity="0.2" />
            <circle r="10" fill="#2D5016" />
            <circle r="4" fill="#FFFFFF" />
            <text x="14" y="4" fontSize="11" fontWeight="700" fill="#1C2417">
              Farm Pickup
            </text>
          </g>

          {/* Moving Transporter Truck Marker */}
          <g transform="translate(220, 310)">
            {/* Radar wave */}
            <circle r="26" fill="#C77D3B" opacity="0.2">
              <animate attributeName="r" values="18;34;18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="16" fill="#C77D3B" stroke="#FFFFFF" strokeWidth="2.5" />
            {/* Truck mini icon inside */}
            <path d="M -6 -2 L -1 -2 L 2 1 L 5 1 L 5 5 L -6 5 Z" fill="#FFFFFF" />
          </g>

          {/* Destination Drop Pin */}
          <g transform="translate(280, 470)">
            <circle r="22" fill="#0284C7" opacity="0.2" />
            <circle r="12" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
            <circle r="5" fill="#FFFFFF" />
            <text x="-70" y="24" fontSize="11" fontWeight="700" fill="#0284C7">
              Delivery Hub (You)
            </text>
          </g>
        </svg>

        {/* Floating ETA Card on Map */}
        <div
          style={{
            position: 'absolute',
            top: '74px',
            left: '16px',
            right: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 6px 20px rgba(45, 80, 22, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#7E8B76', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              Estimated Time of Arrival
            </span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1C2417' }}>
              {simulatedEta} mins{' '}
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#7E8B76' }}>(42 km left)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#EDF6E8',
              borderRadius: '12px',
              padding: '8px 12px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '10px', color: '#515C4B', display: 'block' }}>Speed</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#2D5016' }}>54 km/h</span>
          </div>
        </div>
      </div>

      {/* Logistics Partner Mini-Profile Bottom Sheet (Ride-Hailing Style) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px 28px 0 0',
          padding: '20px',
          boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.12)',
          borderTop: '1px solid #EAE3D2',
          zIndex: 60
        }}
      >
        {/* Handle Bar */}
        <div style={{ width: '38px', height: '4px', backgroundColor: '#E2D9C5', borderRadius: '2px', margin: '0 auto 14px' }} />

        {/* Transporter Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#E0F2FE',
                color: '#075985',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                border: '2px solid #BAE6FD'
              }}
            >
              RV
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
                  {order.logisticsPartnerName || 'Ramesh Verma'}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#FFFBEB', padding: '1px 5px', borderRadius: '6px' }}>
                  <Star size={10} color="#D97706" fill="#D97706" />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#92400E' }}>4.9</span>
                </div>
              </div>

              <span style={{ fontSize: '12px', color: '#515C4B', fontWeight: 600 }}>
                {order.vehicleNumber || 'MH-15-EG-4412'} &bull; {order.vehicleType || 'Mahindra Bolero Maxi'}
              </span>
            </div>
          </div>

          {/* Quick Call Button */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCallDriver}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#2D5016',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(45, 80, 22, 0.25)'
              }}
            >
              <Phone size={18} />
            </button>
          </div>
        </div>

        {/* Route Steps Preview */}
        <div
          style={{
            backgroundColor: '#FAF7F0',
            borderRadius: '14px',
            padding: '12px',
            border: '1px solid #EAE3D2',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#515C4B' }}>
            <MapPin size={14} color="#C77D3B" />
            <span><strong>Current Waypoint:</strong> Kasara Ghat Expressway (NH 160)</span>
          </div>
        </div>

        {/* Remaining Balance Reminder on Arrival */}
        {order.amountPending > 0 && (
          <div
            style={{
              backgroundColor: '#FEF3C7',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#92400E',
              fontWeight: 600
            }}
          >
            <span>Final 50% Balance on Delivery:</span>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>₹{order.amountPending.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
