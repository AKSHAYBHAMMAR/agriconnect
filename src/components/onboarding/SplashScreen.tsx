import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Truck, Wheat, Leaf, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setAuthStep } = useApp();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 24px 40px',
        background: 'linear-gradient(180deg, #1C330E 0%, #2D5016 45%, #FAF7F0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative leaf watermarks */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          opacity: 0.1,
          transform: 'rotate(45deg)',
          pointerEvents: 'none'
        }}
      >
        <Leaf size={220} color="#FFFFFF" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '60px',
          zIndex: 10
        }}
      >
        {/* Animated Brand Emblem */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #4A7C2A 0%, #2D5016 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35), 0 0 0 4px rgba(255, 255, 255, 0.15)',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <Sprout size={50} color="#FFFFFF" strokeWidth={2.2} />
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#C77D3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(199, 125, 59, 0.4)',
              border: '2px solid #FAF7F0'
            }}
          >
            <Truck size={20} color="#FFFFFF" />
          </div>
        </div>

        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          AgriConnect
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: '#D4E2CC',
            maxWidth: '260px',
            lineHeight: 1.5,
            margin: 0
          }}
        >
          Direct From Soil to Shelf. Three-sided marketplace for Farmers, Buyers & Logistics.
        </p>
      </div>

      {/* Feature Pills */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '320px',
          zIndex: 10,
          margin: '30px 0'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '10px 16px',
            border: '1px solid rgba(255, 255, 255, 0.6)'
          }}
        >
          <Wheat size={18} color="#2D5016" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1C2417' }}>
            Zero Middleman • Fair Price Discovery
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '10px 16px',
            border: '1px solid rgba(255, 255, 255, 0.6)'
          }}
        >
          <Truck size={18} color="#C77D3B" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1C2417' }}>
            Transparent 25/75 Split Transport Fee
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ width: '100%', maxWidth: '320px', zIndex: 10 }}>
        <button
          onClick={() => setAuthStep('role_select')}
          className="btn-primary"
          style={{ width: '100%', borderRadius: '16px', fontSize: '16px', padding: '16px' }}
        >
          <span>Select Marketplace Role</span>
          <ArrowRight size={18} />
        </button>
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#7E8B76', marginTop: '12px' }}>
          Version 1.0.0 • Verified Agri Protocol
        </p>
      </div>
    </div>
  );
};
