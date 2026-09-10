import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  TrendingDown,
  Navigation,
  Clock,
  Fuel,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const LogisticsRouteOptimizationScreen: React.FC = () => {
  const { setLogisticsSubScreen, setLogisticsTab, showToast } = useApp();

  const handleStartOptimizedRoute = () => {
    showToast('success', 'AI Route Activated!', 'Navigation loaded with optimal 4-stop sequence. Fuel savings locked in.');
    setLogisticsSubScreen(null);
    setLogisticsTab('activetrip');
  };

  const optimizedStops = [
    {
      seq: 1,
      title: 'Stop 1: Dindori Tomato Farm',
      action: 'Load 250kg Tomatoes',
      eta: '10:15 AM',
      type: 'pickup',
      address: 'Patil Agro Orchards, Nashik'
    },
    {
      seq: 2,
      title: 'Stop 2: Lasalgaon Onion Yard',
      action: 'Load 500kg Onions (Co-load)',
      eta: '11:05 AM',
      type: 'pickup',
      address: 'Jadhav Farms Chawl #12, Nashik'
    },
    {
      seq: 3,
      title: 'Stop 3: Hadapsar APMC Platform',
      action: 'Unload 500kg Onions',
      eta: '01:45 PM',
      type: 'drop',
      address: 'FreshDirect Hub Yard, Pune Highway'
    },
    {
      seq: 4,
      title: 'Stop 4: Vashi Wholesale Dock 4',
      action: 'Unload 250kg Tomatoes',
      eta: '03:10 PM',
      type: 'drop',
      address: 'GreenMart Wholesale Terminal, Navi Mumbai'
    }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FAF7F0',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EAE4D6'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setLogisticsSubScreen(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#515C4B',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
              AI Multi-Stop Route
            </h3>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>
              Co-Loading & Sequencing Algorithm
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#DCFCE7',
            color: '#166534',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={12} />
          <span>Optimal Path</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 120px 16px' }}>
        {/* Savings Metric Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1C330E 0%, #2D5016 100%)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: '18px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-green)'
          }}
        >
          <span style={{ fontSize: '11px', color: '#D4E2CC', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Efficiency vs Unoptimized Separate Trips
          </span>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 10px 0' }}>
            Saves 42 km &bull; ₹780 Fuel
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '12px', padding: '10px' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#B3CFA7', display: 'block' }}>Distance</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>286 km (vs 328)</span>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#B3CFA7', display: 'block' }}>Travel Time</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>5.5 hrs (-55m)</span>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#86EFAC', display: 'block' }}>Combined Payout</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#86EFAC' }}>₹3,000 Net</span>
            </div>
          </div>
        </div>

        {/* Numbered Stop-Order List */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1C2417', marginBottom: '14px' }}>
            AI Numbered Stop-Order Sequence
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
            {optimizedStops.map((stop, index) => {
              const isPickup = stop.type === 'pickup';

              return (
                <div
                  key={stop.seq}
                  className="agri-card"
                  style={{
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    borderLeft: `4px solid ${isPickup ? '#2D5016' : '#0284C7'}`
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isPickup ? '#EEF6E8' : '#E0F2FE',
                      color: isPickup ? '#2D5016' : '#075985',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 800,
                      flexShrink: 0
                    }}
                  >
                    {stop.seq}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                        {stop.title}
                      </h5>
                      <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 600 }}>{stop.eta}</span>
                    </div>

                    <p style={{ fontSize: '12px', fontWeight: 600, color: isPickup ? '#2D5016' : '#0284C7', margin: '3px 0 2px' }}>
                      {stop.action}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#7E8B76' }}>
                      <MapPin size={11} color="#C77D3B" />
                      <span>{stop.address}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Truck Volume Utilization */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', border: '1px solid #EAE4D6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1C2417' }}>Vehicle Payload Capacity</span>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#2D5016' }}>750 kg / 1,700 kg (44%)</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#F0EAE1', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '44%', height: '100%', backgroundColor: '#4A7C2A', borderRadius: '4px' }} />
          </div>
          <span style={{ fontSize: '11px', color: '#7E8B76', marginTop: '6px', display: 'block' }}>
            Fits comfortably in Mahindra Bolero Maxi Truck without axle overload.
          </span>
        </div>
      </div>

      {/* Fixed CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #EAE4D6',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
        }}
      >
        <button
          onClick={handleStartOptimizedRoute}
          className="btn-primary"
          style={{ width: '100%', borderRadius: '14px', fontSize: '16px', padding: '14px' }}
        >
          <Navigation size={18} />
          <span>Start Optimized Multi-Stop Route</span>
        </button>
      </div>
    </div>
  );
};
