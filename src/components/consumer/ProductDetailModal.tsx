import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    crops,
    selectedCropId,
    setConsumerSubScreen,
    addToCart,
    setConsumerTab,
    createOrderFromCart
  } = useApp();

  const crop = crops.find(c => c.id === selectedCropId) || crops[1];
  const [quantity, setQuantity] = useState(crop.unit === 'kg' ? 100 : 10);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    crop.imageUrl,
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80'
  ];

  const subtotal = crop.pricePerUnit * quantity;
  const estTransport = Math.round(subtotal * 0.12);
  const buyerTransportShare = Math.round(estTransport * 0.75); // 3/4 share
  const totalOrderPrice = subtotal + buyerTransportShare;

  const handleStep = (delta: number) => {
    const stepSize = crop.unit === 'kg' ? 25 : 2;
    setQuantity(prev => Math.max(stepSize, prev + delta * stepSize));
  };

  const handleOrderNow = () => {
    addToCart(crop, quantity);
    setConsumerSubScreen('payment');
  };

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
      {/* Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          right: '16px',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => setConsumerSubScreen(null)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#1C2417'
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#1C2417'
          }}
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Scrollable Product Details */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
        {/* Large Image Showcase / Carousel */}
        <div style={{ position: 'relative', width: '100%', height: '280px' }}>
          <img
            src={images[activeImageIndex]}
            alt={crop.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Dots Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(6px)',
              padding: '4px 8px',
              borderRadius: '20px'
            }}
          >
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: activeImageIndex === idx ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activeImageIndex === idx ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px' }}>
          {/* Title & Price Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#7E8B76', fontWeight: 600 }}>{crop.variety}</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: '2px 0 0 0' }}>
                {crop.name}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>Farm Gate Rate</span>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#2D5016' }}>
                ₹{crop.pricePerUnit}
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#515C4B' }}>/{crop.unit}</span>
              </div>
            </div>
          </div>

          {/* Crop Age & Quality Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              margin: '16px 0',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid #EAE3D2'
            }}
          >
            <div style={{ textAlign: 'center', borderRight: '1px solid #EFE8D8' }}>
              <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Crop Age</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#C77D3B' }}>{crop.cropAgeDays} Days</span>
            </div>
            <div style={{ textAlign: 'center', borderRight: '1px solid #EFE8D8' }}>
              <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Freshness Grade</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#2D5016' }}>Grade {crop.grade}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '10px', color: '#7E8B76', display: 'block' }}>Moisture</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0284C7' }}>{crop.moisturePercentage}%</span>
            </div>
          </div>

          {/* Farmer Mini Profile with Rating */}
          <div
            className="agri-card"
            style={{
              padding: '14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#EDF6E8',
                  color: '#2D5016',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '16px'
                }}
              >
                {crop.farmerName.charAt(0)}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                    {crop.farmerName}
                  </h4>
                  <ShieldCheck size={14} color="#2D5016" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#7E8B76', marginTop: '2px' }}>
                  <MapPin size={11} color="#C77D3B" />
                  <span>{crop.location}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: '#FFFBEB', padding: '4px 8px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
              <Star size={13} color="#D97706" fill="#D97706" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>{crop.farmerRating}</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417', marginBottom: '6px' }}>
              Harvest & Quality Details
            </h4>
            <p style={{ fontSize: '12px', color: '#515C4B', lineHeight: 1.5, margin: 0 }}>
              {crop.description}
            </p>
          </div>

          {/* Quantity Stepper */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', border: '1px solid #EAE3D2', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417' }}>
                Select Order Quantity ({crop.unit})
              </span>
              <span style={{ fontSize: '11px', color: '#7E8B76' }}>
                Available: {crop.quantityAvailable} {crop.unit}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                onClick={() => handleStep(-1)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#FAF7F0',
                  border: '1.5px solid #E2D9C5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2D5016'
                }}
              >
                <Minus size={18} />
              </button>

              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#1C2417' }}>
                  {quantity}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#515C4B', marginLeft: '4px' }}>
                  {crop.unit}
                </span>
              </div>

              <button
                onClick={() => handleStep(1)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#2D5016',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(45, 80, 22, 0.2)'
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Estimated Cost Breakdown Preview */}
          <div style={{ backgroundColor: '#FCF9F2', borderRadius: '14px', padding: '14px', border: '1px solid #ECE3D0', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#515C4B' }}>Crop Subtotal ({quantity} {crop.unit}):</span>
              <span style={{ fontWeight: 600, color: '#1C2417' }}>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#515C4B' }}>Est. Buyer Freight Share (3/4):</span>
              <span style={{ fontWeight: 600, color: '#C77D3B' }}>+₹{buyerTransportShare.toLocaleString()}</span>
            </div>
            <div style={{ borderTop: '1px dashed #E2D9C5', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, color: '#1C2417' }}>Estimated Total:</span>
              <span style={{ fontWeight: 800, color: '#2D5016', fontSize: '14px' }}>₹{totalOrderPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '14px 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #EAE4D6',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          display: 'flex',
          gap: '10px'
        }}
      >
        <button
          onClick={() => {
            addToCart(crop, quantity);
            setConsumerSubScreen(null);
          }}
          className="btn-secondary"
          style={{ flex: 1, padding: '12px' }}
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleOrderNow}
          className="btn-primary"
          style={{ flex: 1.4, padding: '12px' }}
        >
          <span>Order Now &bull; ₹{totalOrderPrice.toLocaleString()}</span>
        </button>
      </div>
    </div>
  );
};
