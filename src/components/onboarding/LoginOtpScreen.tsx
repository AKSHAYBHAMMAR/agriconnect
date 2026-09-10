import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, ArrowRight, ArrowLeft, RefreshCw, Sprout, ShoppingBag, Truck } from 'lucide-react';

export const LoginOtpScreen: React.FC = () => {
  const { role, userPhone, setUserPhone, setAuthStep, showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpValue, setOtpValue] = useState<string>('5294');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRoleBadge = () => {
    switch (role) {
      case 'farmer':
        return { label: 'Farmer / Kisan Account', icon: Sprout, color: '#2D5016', bg: '#EEF6E8' };
      case 'consumer':
        return { label: 'Consumer / Buyer Account', icon: ShoppingBag, color: '#C77D3B', bg: '#FDF3E9' };
      case 'logistics':
        return { label: 'Logistics Transporter Account', icon: Truck, color: '#0284C7', bg: '#E0F2FE' };
    }
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPhone.length < 10) {
      showToast('alert', 'Invalid Phone', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      showToast('success', 'OTP Sent!', 'Auto-filled verification code 5294 for instant login.');
    }, 600);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep('authenticated');
      showToast('success', 'Welcome to AgriConnect!', `Logged in as ${role.toUpperCase()}.`);
    }, 700);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#FAF7F0',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Top Back Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => (step === 'otp' ? setStep('phone') : setAuthStep('role_select'))}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#515C4B',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>{step === 'otp' ? 'Change Mobile' : 'Change Role'}</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: roleInfo.bg,
              color: roleInfo.color,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            <RoleIcon size={12} />
            <span>{roleInfo.label}</span>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1C2417', margin: '0 0 6px 0' }}>
          {step === 'phone' ? 'Enter Mobile Number' : 'Verify OTP Code'}
        </h2>
        <p style={{ fontSize: '13px', color: '#515C4B', margin: '0 0 24px 0', lineHeight: 1.4 }}>
          {step === 'phone'
            ? 'We will send a 4-digit verification code to access your agricultural dashboard.'
            : `Enter the 4-digit code sent to +91 ${userPhone}. Demo OTP is auto-filled.`}
        </p>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '8px' }}>
                Phone Number
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #D8D1C3',
                  borderRadius: '14px',
                  padding: '4px 14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '10px', borderRight: '1px solid #EAE3D2', color: '#515C4B', fontWeight: 600, fontSize: '14px' }}>
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98261 44521"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '12px 10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1C2417',
                    background: 'transparent'
                  }}
                />
                <Phone size={18} color="#7E8B76" />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              style={{ width: '100%', borderRadius: '14px', fontSize: '15px' }}
            >
              <span>{isLoading ? 'Sending SMS...' : 'Get OTP Code'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '24px 0 20px' }}>
              {['5', '2', '9', '4'].map((digit, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '54px',
                    height: '60px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #2D5016',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#2D5016',
                    boxShadow: '0 4px 12px rgba(45, 80, 22, 0.1)'
                  }}
                >
                  {digit}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7E8B76', marginBottom: '24px' }}>
              <RefreshCw size={12} />
              <span>Resend OTP in 28s</span>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="btn-primary"
              disabled={isLoading}
              style={{ width: '100%', borderRadius: '14px', fontSize: '15px' }}
            >
              <ShieldCheck size={18} />
              <span>{isLoading ? 'Verifying...' : 'Verify & Launch App'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Trust Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#EEF6E8',
          borderRadius: '12px',
          padding: '10px 14px',
          border: '1px solid #D5E5CD'
        }}
      >
        <ShieldCheck size={20} color="#2D5016" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '11px', color: '#2D5016', lineHeight: 1.4 }}>
          Protected by AgriConnect Escrow Guarantee. Direct UPI payouts to certified accounts.
        </span>
      </div>
    </div>
  );
};
