import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMAND_FORECASTS } from '../../data/mockData';
import { ForecastChart } from '../common/ForecastChart';
import { Sparkles, ArrowLeft, Lightbulb, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';

export const AIForecastScreen: React.FC = () => {
  const { setFarmerSubScreen } = useApp();
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);

  const currentForecast = DEMAND_FORECASTS[selectedCropIndex];

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
      {/* Top App Bar */}
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
            onClick={() => setFarmerSubScreen(null)}
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
              AI Market Intelligence
            </h3>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>
              Predictive Demand & APMC Pricing
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FCF1E1',
            color: '#C77D3B',
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
          <span>Live AI</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 40px 16px' }}>
        {/* Swipeable / Tappable Crop Tabs */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#7E8B76', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>
            Select Farmer Crop:
          </span>
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}
          >
            {DEMAND_FORECASTS.map((fc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCropIndex(idx)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: selectedCropIndex === idx ? '#2D5016' : '#FFFFFF',
                  color: selectedCropIndex === idx ? '#FFFFFF' : '#1C2417',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: selectedCropIndex === idx ? '0 4px 12px rgba(45, 80, 22, 0.25)' : 'var(--shadow-sm)'
                }}
              >
                {fc.cropName}
              </button>
            ))}
          </div>
        </div>

        {/* Current Crop Highlights */}
        <div
          className="agri-card"
          style={{
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>{currentForecast.variety}</span>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: '2px 0 0' }}>
              {currentForecast.cropName}
            </h4>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>Current Mandi Avg:</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#515C4B' }}>
              ₹{currentForecast.currentAvgPrice}
            </div>
          </div>
        </div>

        {/* Reusable Forecast Chart */}
        <ForecastChart
          forecast={currentForecast}
          cropUnit={currentForecast.cropName.includes('Wheat') || currentForecast.cropName.includes('Rice') ? 'quintal' : 'kg'}
        />

        {/* AI Actionable Tip Card */}
        <div
          style={{
            backgroundColor: '#FCF7ED',
            borderRadius: '16px',
            padding: '16px',
            border: '1.5px solid #F3DFC3',
            margin: '16px 0',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Lightbulb size={18} color="#C77D3B" />
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#C77D3B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Kisan Actionable Tip
            </h5>
          </div>
          <p style={{ fontSize: '13px', color: '#1C2417', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
            {currentForecast.tip}
          </p>
        </div>

        {/* Market Driver Factors */}
        <div className="agri-card" style={{ padding: '16px' }}>
          <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417', marginBottom: '10px' }}>
            Key Market Drivers This Week
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#515C4B' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4A7C2A' }} />
              <span>APMC arrival volumes down 14% across Western terminals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#515C4B' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C77D3B' }} />
              <span>Bulk institutional grocery buyers actively stocking ahead of festival</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#515C4B' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284C7' }} />
              <span>Logistics freight rates stable with Tata Ace & Bolero availability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
