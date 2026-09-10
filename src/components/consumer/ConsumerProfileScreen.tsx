import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  MapPin,
  CreditCard,
  Heart,
  Package,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Bell,
  Sparkles
} from 'lucide-react';

export const ConsumerProfileScreen: React.FC = () => {
  const { userPhone, orders, setConsumerTab, setAuthStep, quickSwitchRole } = useApp();

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Profile Card */}
      <div
        className="agri-card"
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '20px',
          border: '1.5px solid #E5DEC9'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#C77D3B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(199, 125, 59, 0.3)'
          }}
        >
          RM
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
              Rajesh Malhotra
            </h3>
            <ShieldCheck size={16} color="#2D5016" />
          </div>
          <span style={{ fontSize: '12px', color: '#515C4B' }}>+91 {userPhone}</span>
          <div style={{ fontSize: '11px', color: '#7E8B76', marginTop: '2px' }}>
            Green Valley Wholesale Dock 2, Mumbai
          </div>
        </div>
      </div>

      {/* Account Menu Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {/* Order History */}
        <div
          onClick={() => setConsumerTab('orders')}
          className="agri-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#EEF6E8', color: '#2D5016' }}>
              <Package size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                Order History
              </h4>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>{orders.length} orders placed</span>
            </div>
          </div>
          <ChevronRight size={16} color="#7E8B76" />
        </div>

        {/* Saved Farmers */}
        <div
          className="agri-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Heart size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                Saved Farmers & Estates
              </h4>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>3 certified partner farms</span>
            </div>
          </div>
          <ChevronRight size={16} color="#7E8B76" />
        </div>

        {/* Payment Methods */}
        <div
          className="agri-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#E0F2FE', color: '#075985' }}>
              <CreditCard size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                Payment Methods & Escrow
              </h4>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>UPI &bull; HDFC Bank Escrow Linked</span>
            </div>
          </div>
          <ChevronRight size={16} color="#7E8B76" />
        </div>

        {/* Delivery Addresses */}
        <div
          className="agri-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#F3EFE6', color: '#515C4B' }}>
              <MapPin size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                Delivery Addresses
              </h4>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>Vashi APMC & Hadapsar Hubs</span>
            </div>
          </div>
          <ChevronRight size={16} color="#7E8B76" />
        </div>
      </div>

      {/* Switch role quick shortcut */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => quickSwitchRole('farmer')}
          style={{
            flex: 1,
            backgroundColor: '#EEF6E8',
            color: '#2D5016',
            border: '1px solid #CDE2C4',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Switch to Farmer View
        </button>

        <button
          onClick={() => quickSwitchRole('logistics')}
          style={{
            flex: 1,
            backgroundColor: '#E0F2FE',
            color: '#075985',
            border: '1px solid #BAE6FD',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Switch to Transporter
        </button>
      </div>

      {/* Logout button */}
      <button
        onClick={() => setAuthStep('role_select')}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5DDCB',
          borderRadius: '14px',
          padding: '12px',
          color: '#DC2626',
          fontSize: '13px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <LogOut size={16} />
        <span>Log Out / Change Account</span>
      </button>
    </div>
  );
};
