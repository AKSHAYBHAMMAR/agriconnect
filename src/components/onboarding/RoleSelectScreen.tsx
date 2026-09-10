import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Sprout, ShoppingBag, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';

export const RoleSelectScreen: React.FC = () => {
  const { role, setRole, setAuthStep } = useApp();

  const rolesConfig: {
    id: UserRole;
    title: string;
    subtitle: string;
    badge: string;
    description: string;
    icon: typeof Sprout;
    color: string;
    bgColor: string;
  }[] = [
    {
      id: 'farmer',
      title: 'Farmer / Kisan',
      subtitle: 'Grower & Producer',
      badge: 'AI Price Advisory',
      description: 'List crop stock, track harvest age, view AI demand predictions & receive secure escrow payouts.',
      icon: Sprout,
      color: '#2D5016',
      bgColor: '#EEF6E8'
    },
    {
      id: 'consumer',
      title: 'Consumer / Buyer',
      subtitle: 'Wholesale & Retail',
      badge: '50% Split Pay',
      description: 'Direct farm traceability, browse fresh produce, lock price with 50% advance & track live deliveries.',
      icon: ShoppingBag,
      color: '#C77D3B',
      bgColor: '#FDF3E9'
    },
    {
      id: 'logistics',
      title: 'Logistics Partner',
      subtitle: 'Transporter & Driver',
      badge: 'Route Optimization',
      description: 'Book verified farm hauls, optimize multi-stop trips, check off farm loading & get weekly freight payouts.',
      icon: Truck,
      color: '#0284C7',
      bgColor: '#E0F2FE'
    }
  ];

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setAuthStep('login_otp');
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 20px',
        backgroundColor: '#FAF7F0',
        overflowY: 'auto'
      }}
    >
      <div style={{ marginTop: '10px', marginBottom: '24px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#C77D3B',
            backgroundColor: '#FCF1E1',
            padding: '4px 10px',
            borderRadius: '20px'
          }}
        >
          Step 1 of 2 • Role Profile
        </span>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1C2417', marginTop: '10px', marginBottom: '6px' }}>
          Who are you joining as?
        </h2>
        <p style={{ fontSize: '13px', color: '#515C4B', margin: 0 }}>
          Choose your primary account type. You can switch roles at any time in the test bar.
        </p>
      </div>

      {/* Role Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {rolesConfig.map((r) => {
          const IconComponent = r.icon;
          const isSelected = role === r.id;

          return (
            <div
              key={r.id}
              onClick={() => handleSelectRole(r.id)}
              className="agri-card"
              style={{
                padding: '18px',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${r.color}` : '1px solid #E6DFD1',
                backgroundColor: isSelected ? '#FFFFFF' : '#FAF8F3',
                position: 'relative',
                boxShadow: isSelected ? '0 8px 24px rgba(45, 80, 22, 0.12)' : '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    color: r.color
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: r.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: r.color
                  }}
                >
                  <IconComponent size={26} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                      {r.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: '#7E8B76', fontWeight: 500 }}>
                    {r.subtitle}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '12px', color: '#515C4B', lineHeight: 1.45, margin: '0 0 12px 0' }}>
                {r.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: r.color,
                    backgroundColor: r.bgColor,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {r.badge}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: r.color }}>
                  <span>Select & Continue</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
