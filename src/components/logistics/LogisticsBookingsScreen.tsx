import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogisticsBooking } from '../../types';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Power,
  Navigation,
  Check,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const LogisticsBookingsScreen: React.FC = () => {
  const {
    bookings,
    isLogisticsOnline,
    setIsLogisticsOnline,
    acceptBooking,
    declineBooking,
    setLogisticsSubScreen,
    setLogisticsTab,
    setActiveTripId
  } = useApp();

  const availableBookings = bookings.filter(b => b.status === 'available');
  const activeTrips = bookings.filter(b => b.status === 'accepted' || b.status === 'in_transit');

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Top Driver Status Bar & Online/Offline Toggle */}
      <div
        className="agri-card"
        style={{
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isLogisticsOnline ? '#FFFFFF' : '#F7F4EC',
          border: isLogisticsOnline ? '1.5px solid #2D5016' : '1px solid #E2D8C3'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isLogisticsOnline ? '#16A34A' : '#9CA3AF',
              position: 'relative'
            }}
          >
            {isLogisticsOnline && <span className="pulse-dot" style={{ backgroundColor: '#16A34A' }} />}
          </div>

          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
              {isLogisticsOnline ? 'You Are Online' : 'You Are Offline'}
            </h3>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>
              {isLogisticsOnline ? 'Receiving farm haul booking requests' : 'Tap switch to go online and receive loads'}
            </span>
          </div>
        </div>

        {/* Go Online / Offline Toggle Switch */}
        <button
          onClick={() => setIsLogisticsOnline(!isLogisticsOnline)}
          style={{
            backgroundColor: isLogisticsOnline ? '#2D5016' : '#D1D5DB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '24px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            boxShadow: isLogisticsOnline ? '0 2px 8px rgba(45, 80, 22, 0.3)' : 'none'
          }}
        >
          <Power size={14} />
          <span>{isLogisticsOnline ? 'Go Offline' : 'Go Online'}</span>
        </button>
      </div>

      {/* Active Trip Reminder Banner if any */}
      {activeTrips.length > 0 && (
        <div
          onClick={() => {
            setActiveTripId(activeTrips[0].id);
            setLogisticsTab('activetrip');
          }}
          style={{
            background: 'linear-gradient(135deg, #1C330E 0%, #2D5016 100%)',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-green)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation size={18} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#D4E2CC', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                Trip In Progress
              </span>
              <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '1px 0 0 0' }}>
                {activeTrips[0].cropName} &bull; {activeTrips[0].distanceKm} km
              </h4>
            </div>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#E8A857', color: '#1C330E', padding: '4px 8px', borderRadius: '8px' }}>
            Open Nav &rarr;
          </span>
        </div>
      )}

      {/* AI Route Optimization CTA Banner */}
      <div
        onClick={() => setLogisticsSubScreen('route_optimization')}
        style={{
          backgroundColor: '#FCF7ED',
          borderRadius: '16px',
          padding: '14px 16px',
          border: '1.5px solid #E8A857',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 2px 10px rgba(199, 125, 59, 0.1)'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#C77D3B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Sparkles size={20} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#C77D3B', textTransform: 'uppercase' }}>
              AI Smart Multi-Stop
            </span>
            <span style={{ fontSize: '10px', backgroundColor: '#DCFCE7', color: '#166534', padding: '1px 5px', borderRadius: '8px', fontWeight: 700 }}>
              Saves ₹780 Fuel
            </span>
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: '2px 0 0 0' }}>
            AI Route Optimizer
          </h4>
          <p style={{ fontSize: '11px', color: '#515C4B', margin: 0 }}>
            Batch 2 nearby farm pickups in Nashik cluster into a single trip.
          </p>
        </div>

        <ChevronRight size={18} color="#C77D3B" />
      </div>

      {/* Bookings Feed (Rapido/Uber Driver style) */}
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
          Available Farm Bookings
        </h3>
        <span style={{ fontSize: '11px', color: '#7E8B76' }}>
          {isLogisticsOnline ? `${availableBookings.length} loads nearby` : 'Offline'}
        </span>
      </div>

      {!isLogisticsOnline ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF', borderRadius: '16px' }}>
          <Truck size={36} color="#9CA3AF" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '15px', color: '#1C2417', margin: '0 0 4px' }}>You are currently offline</h4>
          <p style={{ fontSize: '12px', color: '#7E8B76', margin: '0 0 16px' }}>Go online to start receiving instant load matching.</p>
          <button onClick={() => setIsLogisticsOnline(true)} className="btn-primary" style={{ margin: '0 auto', padding: '10px 20px', fontSize: '13px' }}>
            Go Online Now
          </button>
        </div>
      ) : availableBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF', borderRadius: '16px' }}>
          <CheckCircle2 size={36} color="#166534" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '15px', color: '#1C2417', margin: '0 0 4px' }}>All nearby bookings assigned</h4>
          <p style={{ fontSize: '12px', color: '#7E8B76', margin: 0 }}>New loads appear automatically as buyers checkout.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {availableBookings.map((booking) => (
            <div
              key={booking.id}
              className="agri-card"
              style={{
                padding: '16px',
                position: 'relative',
                border: '1.5px solid #E6DDC8'
              }}
            >
              {/* Top Row: Payout & Distance */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#C77D3B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {booking.bookingNumber} &bull; {booking.vehicleRecommended}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1C2417', margin: '2px 0 0' }}>
                    {booking.cropName} ({booking.quantity} {booking.unit})
                  </h4>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: '#7E8B76' }}>Net Transporter Payout</span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D5016' }}>
                    ₹{booking.grossPayout.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Pickup & Drop Route Pins */}
              <div
                style={{
                  backgroundColor: '#FAF7F0',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '14px',
                  border: '1px solid #EFE8D6'
                }}
              >
                {/* Pickup */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '20px', display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2D5016' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#7E8B76', textTransform: 'uppercase', fontWeight: 700 }}>
                      Pickup &bull; {booking.pickupLocation.farmName}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
                      {booking.pickupLocation.title}
                    </div>
                  </div>
                </div>

                {/* Drop */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '20px', display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284C7' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#7E8B76', textTransform: 'uppercase', fontWeight: 700 }}>
                      Drop Hub &bull; {booking.dropLocation.hubName}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
                      {booking.dropLocation.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Distance & Est Duration Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#515C4B', marginBottom: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} color="#7E8B76" />
                  <span>Est: {booking.estHours} ({booking.distanceKm} km)</span>
                </span>
                <span style={{ fontSize: '11px', color: '#7E8B76' }}>
                  Farmer Share: ₹{booking.farmerShareDeduction} | Buyer: ₹{booking.buyerShareContribution}
                </span>
              </div>

              {/* Accept & Decline Buttons (Rapido / Uber Driver style) */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => declineBooking(booking.id)}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E5DEC9',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#515C4B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <XCircle size={16} />
                  <span>Decline</span>
                </button>

                <button
                  onClick={() => acceptBooking(booking.id)}
                  className="btn-primary"
                  style={{
                    flex: 2,
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    boxShadow: 'var(--shadow-green)'
                  }}
                >
                  <Check size={16} />
                  <span>Accept Load &bull; ₹{booking.grossPayout.toLocaleString()}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
