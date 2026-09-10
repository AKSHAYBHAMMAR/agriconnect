import React, { useState } from 'react';
import { DemandForecast } from '../../types';
import { TrendingUp, BarChart2, LineChart as LineIcon } from 'lucide-react';

interface ForecastChartProps {
  forecast: DemandForecast;
  cropUnit?: string;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  forecast,
  cropUnit = 'kg'
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { dataPoints } = forecast;
  const prices = dataPoints.map(d => d.price);
  const minPrice = Math.min(...prices) * 0.95;
  const maxPrice = Math.max(...prices) * 1.05;
  const priceRange = maxPrice - minPrice || 1;

  const width = 340;
  const height = 140;
  const paddingX = 30;
  const paddingY = 20;

  // Generate SVG coordinates
  const points = dataPoints.map((d, index) => {
    const x = paddingX + (index / (dataPoints.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.price - minPrice) / priceRange) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', border: '1px solid #EAE4D6', boxShadow: 'var(--shadow-sm)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} color="#2D5016" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
              7-Week Price & Demand Forecast
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#7E8B76' }}>
            AI predictive model based on regional APMC Mandi trends
          </span>
        </div>

        {/* Toggle Line / Bar */}
        <div style={{ display: 'flex', backgroundColor: '#F4EFE6', borderRadius: '8px', padding: '2px' }}>
          <button
            onClick={() => setChartType('line')}
            style={{
              background: chartType === 'line' ? '#FFFFFF' : 'transparent',
              border: 'none',
              padding: '4px 6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: chartType === 'line' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            title="Line View"
          >
            <LineIcon size={14} color={chartType === 'line' ? '#2D5016' : '#7E8B76'} />
          </button>
          <button
            onClick={() => setChartType('bar')}
            style={{
              background: chartType === 'bar' ? '#FFFFFF' : 'transparent',
              border: 'none',
              padding: '4px 6px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: chartType === 'bar' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
            title="Demand Bars"
          >
            <BarChart2 size={14} color={chartType === 'bar' ? '#2D5016' : '#7E8B76'} />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
        {chartType === 'line' ? (
          <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A7C2A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4A7C2A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Guide Lines */}
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F0EBE1" strokeDasharray="3 3" />
            <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#F0EBE1" strokeDasharray="3 3" />
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#E5DFC5" />

            {/* Area Fill */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Line */}
            <path d={pathD} fill="none" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points */}
            {points.map((pt, idx) => {
              const isSelected = hoveredIndex === idx || (hoveredIndex === null && idx === 2);
              const isProjected = pt.period.includes('Proj');
              return (
                <g key={idx} onMouseEnter={() => setHoveredIndex(idx)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 6 : 4}
                    fill={isProjected ? '#C77D3B' : '#2D5016'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  {isSelected && (
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fill="#1C2417"
                      fontSize="10"
                      fontWeight="700"
                    >
                      ₹{pt.price}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        ) : (
          /* Bar Chart for Demand Index */
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', padding: `0 ${paddingX}px ${paddingY}px` }}>
            {dataPoints.map((pt, idx) => {
              const heightPct = (pt.demandIndex / 100) * 80;
              const isProj = pt.period.includes('Proj');
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    width: '32px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 700, color: isProj ? '#C77D3B' : '#2D5016' }}>
                    {pt.demandIndex}%
                  </span>
                  <div
                    style={{
                      width: '18px',
                      height: `${heightPct}%`,
                      borderRadius: '6px 6px 0 0',
                      background: isProj
                        ? 'linear-gradient(180deg, #E8A857 0%, #C77D3B 100%)'
                        : 'linear-gradient(180deg, #4A7C2A 0%, #2D5016 100%)',
                      transition: 'height 0.3s ease'
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px 0', fontSize: '10px', color: '#7E8B76' }}>
        {dataPoints.map((pt, idx) => (
          <span key={idx} style={{ fontWeight: pt.period.includes('Now') ? 700 : 400, color: pt.period.includes('Now') ? '#2D5016' : '#7E8B76' }}>
            {pt.period.replace(' (Now)', '*').replace(' (Proj)', '')}
          </span>
        ))}
      </div>

      {/* Recommended price badge & tip */}
      <div
        style={{
          marginTop: '12px',
          padding: '10px 12px',
          backgroundColor: '#F8F4EC',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #EBE4D5'
        }}
      >
        <div>
          <span style={{ fontSize: '11px', color: '#7E8B76' }}>AI Recommended Price:</span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#2D5016' }}>
            ₹{forecast.recommendedPrice}
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#515C4B' }}>/{cropUnit}</span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: forecast.demandChangePct > 0 ? '#DCFCE7' : '#FEF3C7',
            color: forecast.demandChangePct > 0 ? '#166534' : '#92400E',
            padding: '4px 8px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <TrendingUp size={12} />
          <span>+{forecast.demandChangePct}% Demand</span>
        </div>
      </div>
    </div>
  );
};
