import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';

export const ConsumerCartScreen: React.FC = () => {
  const { cart, updateCartQty, removeFromCart, setConsumerSubScreen, setConsumerTab } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.crop.pricePerUnit * item.quantity, 0);
  const estTransport = Math.round(subtotal * 0.12);
  const buyerTransportShare = Math.round(estTransport * 0.75); // 75% buyer share
  const grandTotal = subtotal + buyerTransportShare;

  if (cart.length === 0) {
    return (
      <div className="screen-scroll-content" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#F3EFE6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#7E8B76'
          }}
        >
          <ShoppingCart size={32} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: '0 0 6px 0' }}>
          Your Cart is Empty
        </h3>
        <p style={{ fontSize: '13px', color: '#7E8B76', margin: '0 0 20px 0' }}>
          Explore fresh farm harvest listings with direct farmer pricing.
        </p>
        <button
          onClick={() => setConsumerTab('marketplace')}
          className="btn-primary"
          style={{ margin: '0 auto', padding: '12px 24px', fontSize: '14px' }}
        >
          <ShoppingBag size={16} />
          <span>Browse Marketplace</span>
        </button>
      </div>
    );
  }

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 120px 16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
          My Harvest Cart
        </h2>
        <span style={{ fontSize: '12px', color: '#7E8B76' }}>
          {cart.length} farm items queued for direct procurement
        </span>
      </div>

      {/* Cart Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
        {cart.map(({ crop, quantity }) => (
          <div
            key={crop.id}
            className="agri-card"
            style={{ padding: '14px', display: 'flex', gap: '12px' }}
          >
            <div style={{ width: '70px', height: '70px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={crop.imageUrl} alt={crop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                    {crop.name}
                  </h4>
                  <button
                    onClick={() => removeFromCart(crop.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <span style={{ fontSize: '11px', color: '#7E8B76' }}>
                  ₹{crop.pricePerUnit}/{crop.unit} &bull; {crop.farmerName.split(' ')[0]}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#2D5016' }}>
                  ₹{(crop.pricePerUnit * quantity).toLocaleString()}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => updateCartQty(crop.id, quantity - (crop.unit === 'kg' ? 25 : 2))}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: '#FAF7F0',
                      border: '1px solid #D8D0BE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Minus size={14} />
                  </button>

                  <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '40px', textAlign: 'center' }}>
                    {quantity} {crop.unit}
                  </span>

                  <button
                    onClick={() => updateCartQty(crop.id, quantity + (crop.unit === 'kg' ? 25 : 2))}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: '#2D5016',
                      border: 'none',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Itemized Calculation Card */}
      <div className="agri-card" style={{ padding: '16px', marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', marginBottom: '12px' }}>
          Estimated Order Cost
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
            <span>Crop Produce Subtotal:</span>
            <span style={{ fontWeight: 600, color: '#1C2417' }}>₹{subtotal.toLocaleString()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#515C4B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={13} color="#C77D3B" />
              <span>Buyer Transport Share (75%):</span>
            </span>
            <span style={{ fontWeight: 600, color: '#C77D3B' }}>+₹{buyerTransportShare.toLocaleString()}</span>
          </div>

          <div style={{ borderTop: '1px dashed #E2D9C5', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#1C2417' }}>Total Estimated Invoice:</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#2D5016' }}>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Escrow note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#EEF6E8',
          borderRadius: '12px',
          padding: '10px 14px',
          border: '1px solid #D5E5CD',
          marginBottom: '20px'
        }}
      >
        <ShieldCheck size={20} color="#2D5016" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: '#2D5016', lineHeight: 1.4 }}>
          Pay only 50% advance to lock booking. Remaining 50% released upon truck arrival and weighing.
        </span>
      </div>

      {/* Checkout CTA */}
      <button
        onClick={() => setConsumerSubScreen('payment')}
        className="btn-primary"
        style={{ width: '100%', borderRadius: '16px', fontSize: '15px', padding: '15px' }}
      >
        <span>Proceed to 50% / 100% Split Pay</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
