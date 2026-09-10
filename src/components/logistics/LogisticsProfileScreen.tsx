import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  ShieldCheck,
  Star,
  FileText,
  Phone,
  CheckCircle2,
  Calendar,
  ChevronRight,
  LogOut,
  MapPin,
  Settings
} from 'lucide-react';

export const LogisticsProfileScreen: React.FC = () => {
  const { userPhone, setAuthStep, quickSwitchRole } = useApp();

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Driver ID Card */}
      <div
        className="agri-card"
        style={{
          padding: '20px',
          marginBottom: '20px',
          border: '1.5px solid #CBD9C6',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#0284C7',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
          }}
        >
          RV
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
              Ramesh Verma
            </h3>
            <ShieldCheck size={16} color="#0284C7" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#FFFBEB', padding: '1px 6px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
              <Star size={11} color="#D97706" fill="#D97706" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#92400E' }}>4.92 (184 Hauls)</span>
            </div>
            <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>&bull; Verified Partner</span>
          </div>

          <span style={{ fontSize: '12px', color: '#7E8B76', display: 'block', marginTop: '4px' }}>
            +91 {userPhone} &bull; Nashik Hub Base
          </span>
        </div>
      </div>

      {/* Vehicle Specification Card */}
      <div className="agri-card" style={{ padding: '16px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1C2417', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Truck size={16} color="#0284C7" />
            <span>Registered Vehicle Details</span>
          </h4>
          <span style={{ fontSize: '11px', color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
            Active RC & Permit
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
          <div style={{ backgroundColor: '#FAF7F0', padding: '10px', borderRadius: '10px', border: '1px solid #EFE8D8' }}>
            <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Vehicle Model</span>
            <span style={{ fontWeight: 700, color: '#1C2417' }}>Mahindra Bolero Maxi</span>
          </div>

          <div style={{ backgroundColor: '#FAF7F0', padding: '10px', borderRadius: '10px', border: '1px solid #EFE8D8' }}>
            <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Registration No.</span>
            <span style={{ fontWeight: 700, color: '#1C2417' }}>MH-15-EG-4412</span>
          </div>

          <div style={{ backgroundColor: '#FAF7F0', padding: '10px', borderRadius: '10px', border: '1px solid #EFE8D8' }}>
            <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Payload Capacity</span>
            <span style={{ fontWeight: 700, color: '#1C2417' }}>1,700 kg (1.7 Ton)</span>
          </div>

          <div style={{ backgroundColor: '#FAF7F0', padding: '10px', borderRadius: '10px', border: '1px solid #EFE8D8' }}>
            <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>All-India Agri Permit</span>
            <span style={{ fontWeight: 700, color: '#166534' }}>Valid till 2028</span>
          </div>
        </div>
      </div>

      {/* Driver Compliance Badges */}
      <div className="agri-card" style={{ padding: '14px', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417', marginBottom: '10px' }}>
          Certifications & Compliance
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
            <CheckCircle2 size={16} />
            <span>Commercial Heavy Driver License (Transport Endorsed)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
            <CheckCircle2 size={16} />
            <span>Digital E-Way Bill & Fastag Scanner linked</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
            <CheckCircle2 size={16} />
            <span>Transit Insurance Covered up to ₹15 Lakhs produce</span>
          </div>
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
          onClick={() => quickSwitchRole('consumer')}
          style={{
            flex: 1,
            backgroundColor: '#FDF3E9',
            color: '#C77D3B',
            border: '1px solid #F5DEC7',
            borderRadius: '12px',
            padding: '10px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Switch to Consumer
        </button>
      </div>

      {/* Logout */}
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
