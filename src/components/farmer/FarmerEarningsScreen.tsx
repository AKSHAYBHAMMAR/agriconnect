import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, Download, Truck } from 'lucide-react';

export const FarmerEarningsScreen: React.FC = () => {
  const { orders } = useApp();

  const totalDeliveredGross = 68500;
  const totalTransportShare = 1750; // 25% share across payouts
  const netSettledBalance = totalDeliveredGross - totalTransportShare; // 66,750

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Total Balance Card at Top */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C330E 0%, #2D5016 100%)',
          borderRadius: '24px',
          padding: '22px',
          color: '#FFFFFF',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-green)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#D4E2CC', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Kisan Settlement Balance
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0 0 0', letterSpacing: '-0.02em' }}>
              ₹{netSettledBalance.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#B3CFA7', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ShieldCheck size={14} color="#86EFAC" />
              <span>Verified Direct Escrow Payouts</span>
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '10px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Wallet size={24} color="#FAF7F0" />
          </div>
        </div>

        {/* Breakdown bar */}
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
            <span style={{ fontSize: '10px', color: '#B3CFA7' }}>Gross Crop Value:</span>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>₹{totalDeliveredGross.toLocaleString()}</div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#F87171' }}>1/4 Transport Deducted:</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FCA5A5' }}>-₹{totalTransportShare.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Payout History List */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
          Recent Settlements & Dispatches
        </h3>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#2D5016',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Download size={13} />
          <span>Statement</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Payout 1 */}
        <div className="agri-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#DCFCE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#166534'
                }}
              >
                <ArrowDownLeft size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                  Order AG-8088 &bull; Basmati Rice 1121
                </h4>
                <span style={{ fontSize: '11px', color: '#7E8B76' }}>Yesterday, 11:30 PM &bull; UPI Ref: #UPI-99214</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#166534' }}>
                +₹62,000
              </div>
              <span style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>Settled</span>
            </div>
          </div>

          {/* Transport share line item */}
          <div
            style={{
              backgroundColor: '#F8F5EE',
              borderRadius: '8px',
              padding: '6px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#515C4B',
              marginTop: '8px'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={12} color="#C77D3B" />
              <span>Crop ₹63,000 &bull; Less Farmer 25% Freight Share:</span>
            </span>
            <span style={{ fontWeight: 700, color: '#C77D3B' }}>-₹1,000</span>
          </div>
        </div>

        {/* Payout 2 (Escrow locked) */}
        <div className="agri-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706'
                }}
              >
                <Wallet size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                  Order AG-8094 &bull; Hybrid Roma Tomatoes
                </h4>
                <span style={{ fontSize: '11px', color: '#7E8B76' }}>In Transit &bull; Escrow Protected</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#2D5016' }}>
                ₹5,200 (Net)
              </div>
              <span style={{ fontSize: '10px', color: '#D97706', fontWeight: 600 }}>50% Advance in Escrow</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#F8F5EE',
              borderRadius: '8px',
              padding: '6px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#515C4B',
              marginTop: '8px'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={12} color="#C77D3B" />
              <span>Crop ₹5,500 &bull; Less Farmer 25% Freight Share:</span>
            </span>
            <span style={{ fontWeight: 700, color: '#C77D3B' }}>-₹300</span>
          </div>
        </div>

        {/* Bank Account Info */}
        <div
          style={{
            backgroundColor: '#EEF6E8',
            borderRadius: '14px',
            padding: '12px 14px',
            border: '1px solid #D5E5CD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px'
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#2D5016', fontWeight: 700, textTransform: 'uppercase' }}>
              Linked Primary Account
            </span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
              State Bank of India (SBI) •••• 6802
            </div>
            <span style={{ fontSize: '11px', color: '#515C4B' }}>Rameshwar Patel &bull; Sehore Branch</span>
          </div>
          <span style={{ fontSize: '11px', backgroundColor: '#FFFFFF', padding: '4px 8px', borderRadius: '6px', color: '#2D5016', fontWeight: 700 }}>
            Auto-Credit
          </span>
        </div>
      </div>
    </div>
  );
};
