import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentType } from '../../types';
import { ArrowLeft, ShieldCheck, CheckCircle2, Truck, Receipt, Sparkles } from 'lucide-react';

export const ConsumerPaymentScreen: React.FC = () => {
  const { cart, createOrderFromCart, setConsumerSubScreen, setConsumerTab } = useApp();
  const [paymentOption, setPaymentOption] = useState<PaymentType>('split_50'); // pre-selected
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.length > 0
    ? cart.reduce((sum, item) => sum + item.crop.pricePerUnit * item.quantity, 0)
    : 5500;
  const freightTotal = Math.round(subtotal * 0.12) || 1200;
  const farmerFreightShare = Math.round(freightTotal * 0.25); // 25%
  const buyerFreightShare = freightTotal - farmerFreightShare; // 75%
  const grandTotal = subtotal + buyerFreightShare;

  const pay50Amount = Math.round(grandTotal * 0.5);
  const pay100Amount = grandTotal;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      createOrderFromCart(paymentOption);
      setConsumerSubScreen(null);
      setConsumerTab('orders');
    }, 800);
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
      {/* Top Header */}
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
            onClick={() => setConsumerSubScreen(null)}
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
              Payment & Escrow Lock
            </h3>
            <span style={{ fontSize: '11px', color: '#7E8B76' }}>
              Transparent AgriConnect Protocol
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2D5016', fontSize: '11px', fontWeight: 700 }}>
          <ShieldCheck size={16} />
          <span>Escrow Safe</span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 120px 16px' }}>
        {/* Transparent Itemized Receipt Summary */}
        <div className="receipt-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Receipt size={16} color="#C77D3B" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#C77D3B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Itemized Order Summary
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
            <span style={{ color: '#515C4B' }}>Produce Subtotal:</span>
            <span style={{ fontWeight: 600, color: '#1C2417' }}>₹{subtotal.toLocaleString()}</span>
          </div>

          {/* Freight Breakdown */}
          <div style={{ backgroundColor: '#FCF9F2', borderRadius: '12px', padding: '10px 12px', margin: '8px 0', border: '1px solid #EFE8D8', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#515C4B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={13} color="#C77D3B" />
                <span>Total Freight Cost:</span>
              </span>
              <span style={{ fontWeight: 600 }}>₹{freightTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7E8B76', fontSize: '11px' }}>
              <span>&bull; Farmer absorbs 25% (1/4):</span>
              <span style={{ color: '#C77D3B' }}>-₹{farmerFreightShare.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1C2417', fontSize: '11px', fontWeight: 600 }}>
              <span>&bull; Buyer transport share (75% / 3/4):</span>
              <span style={{ color: '#2D5016' }}>+₹{buyerFreightShare.toLocaleString()}</span>
            </div>
          </div>

          <div className="receipt-dashed-divider" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417' }}>Total Payable:</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#2D5016' }}>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Two Large Tappable Payment Options */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1C2417', marginBottom: '10px' }}>
            Select Payment Schedule
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Option 1: Pay 50% now (Pre-selected, marked as minimum) */}
            <div
              onClick={() => setPaymentOption('split_50')}
              className="agri-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: paymentOption === 'split_50' ? '2.5px solid #2D5016' : '1px solid #E2D9C5',
                backgroundColor: paymentOption === 'split_50' ? '#FFFFFF' : '#FAF8F3',
                position: 'relative',
                boxShadow: paymentOption === 'split_50' ? '0 8px 20px rgba(45, 80, 22, 0.12)' : 'none'
              }}
            >
              <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: paymentOption === 'split_50' ? '6px solid #2D5016' : '2px solid #C7BDAC',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span
                  style={{
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    textTransform: 'uppercase'
                  }}
                >
                  Recommended &bull; Minimum Deposit
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: '2px 0 4px' }}>
                Pay 50% Now (Advance Escrow)
              </h3>
              <p style={{ fontSize: '12px', color: '#515C4B', margin: '0 0 10px 0', maxWidth: '280px' }}>
                Locks farmer stock and dispatches transport. Balance of ₹{pay50Amount.toLocaleString()} paid on delivery.
              </p>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D5016' }}>
                ₹{pay50Amount.toLocaleString()}{' '}
                <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 500 }}>today</span>
              </div>
            </div>

            {/* Option 2: Pay 100% now */}
            <div
              onClick={() => setPaymentOption('full_100')}
              className="agri-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: paymentOption === 'full_100' ? '2.5px solid #2D5016' : '1px solid #E2D9C5',
                backgroundColor: paymentOption === 'full_100' ? '#FFFFFF' : '#FAF8F3',
                position: 'relative',
                boxShadow: paymentOption === 'full_100' ? '0 8px 20px rgba(45, 80, 22, 0.12)' : 'none'
              }}
            >
              <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: paymentOption === 'full_100' ? '6px solid #2D5016' : '2px solid #C7BDAC',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: '0 0 4px' }}>
                Pay 100% Now (Full Settlement)
              </h3>
              <p style={{ fontSize: '12px', color: '#515C4B', margin: '0 0 10px 0', maxWidth: '280px' }}>
                Funds stay safely in AgriConnect Escrow until you inspect produce at delivery. Zero remaining balance.
              </p>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D5016' }}>
                ₹{pay100Amount.toLocaleString()}{' '}
                <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 500 }}>one-time payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Confirm Button */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #EAE4D6',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
        }}
      >
        <button
          onClick={handleConfirmOrder}
          disabled={isProcessing}
          className="btn-primary"
          style={{ width: '100%', borderRadius: '16px', fontSize: '16px', padding: '15px' }}
        >
          <ShieldCheck size={18} />
          <span>
            {isProcessing
              ? 'Securing Escrow...'
              : `Confirm & Escrow ₹${(paymentOption === 'split_50' ? pay50Amount : pay100Amount).toLocaleString()}`}
          </span>
        </button>
      </div>
    </div>
  );
};
