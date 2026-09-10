import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle2, TrendingUp, AlertTriangle, X } from 'lucide-react';

export const PushBanner: React.FC = () => {
  const { toast, dismissToast, setFarmerSubScreen, setFarmerTab, role } = useApp();

  if (!toast) return null;

  const handleBannerClick = () => {
    if (toast.type === 'alert' && role === 'farmer') {
      setFarmerTab('home');
      setFarmerSubScreen('ai_forecast');
    }
    dismissToast();
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="#166534" />;
      case 'alert':
        return <TrendingUp size={18} color="#C77D3B" />;
      case 'order':
        return <Bell size={18} color="#2D5016" />;
      default:
        return <AlertTriangle size={18} color="#D97706" />;
    }
  };

  return (
    <div
      className="notification-banner"
      style={{
        position: 'absolute',
        top: '54px',
        left: '12px',
        right: '12px',
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 10px 28px -4px rgba(45, 80, 22, 0.18)',
        border: '1px solid #EAE3D2',
        cursor: 'pointer'
      }}
      onClick={handleBannerClick}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '12px',
          backgroundColor: toast.type === 'alert' ? '#FCF1E1' : '#EDF6E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {getIcon()}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ fontSize: '12px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
            {toast.title}
          </h5>
          <span style={{ fontSize: '10px', color: '#7E8B76' }}>{toast.timestamp}</span>
        </div>
        <p style={{ fontSize: '12px', color: '#515C4B', margin: '2px 0 0', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {toast.message}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissToast();
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px',
          color: '#7E8B76',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
