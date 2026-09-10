import React, { useState, useEffect } from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { RoleSelectScreen } from './components/onboarding/RoleSelectScreen';
import { LoginOtpScreen } from './components/onboarding/LoginOtpScreen';
import { FarmerHomeScreen } from './components/farmer/FarmerHomeScreen';
import { FarmerMyStockScreen } from './components/farmer/FarmerMyStockScreen';
import { AddStockModal } from './components/farmer/AddStockModal';
import { AIForecastScreen } from './components/farmer/AIForecastScreen';
import { FarmerOrdersScreen } from './components/farmer/FarmerOrdersScreen';
import { FarmerEarningsScreen } from './components/farmer/FarmerEarningsScreen';
import { ConsumerMarketplaceScreen } from './components/consumer/ConsumerMarketplaceScreen';
import { ProductDetailModal } from './components/consumer/ProductDetailModal';
import { ConsumerCartScreen } from './components/consumer/ConsumerCartScreen';
import { ConsumerPaymentScreen } from './components/consumer/ConsumerPaymentScreen';
import { ConsumerOrdersScreen } from './components/consumer/ConsumerOrdersScreen';
import { ConsumerLiveTrackingScreen } from './components/consumer/ConsumerLiveTrackingScreen';
import { ConsumerProfileScreen } from './components/consumer/ConsumerProfileScreen';
import { LogisticsBookingsScreen } from './components/logistics/LogisticsBookingsScreen';
import { LogisticsActiveTripScreen } from './components/logistics/LogisticsActiveTripScreen';
import { LogisticsRouteOptimizationScreen } from './components/logistics/LogisticsRouteOptimizationScreen';
import { LogisticsEarningsScreen } from './components/logistics/LogisticsEarningsScreen';
import { LogisticsProfileScreen } from './components/logistics/LogisticsProfileScreen';
import { BottomTabBar } from './components/common/BottomTabBar';
import { PushBanner } from './components/common/PushBanner';
import {
  Wifi,
  Battery,
  Maximize2,
  Minimize2,
  Sprout,
  ShoppingBag,
  Truck,
  RotateCcw
} from 'lucide-react';

const AgriConnectAppContent: React.FC = () => {
  const {
    role,
    authStep,
    setAuthStep,
    farmerTab,
    farmerSubScreen,
    consumerTab,
    consumerSubScreen,
    logisticsTab,
    logisticsSubScreen,
    quickSwitchRole
  } = useApp();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderScreen = () => {
    // 1. Onboarding & Authentication Phase
    if (authStep === 'splash') {
      return <SplashScreen />;
    }
    if (authStep === 'role_select') {
      return <RoleSelectScreen />;
    }
    if (authStep === 'login_otp') {
      return <LoginOtpScreen />;
    }

    // 2. Authenticated Main Roles
    if (role === 'farmer') {
      if (farmerSubScreen === 'add_stock') return <AddStockModal />;
      if (farmerSubScreen === 'ai_forecast') return <AIForecastScreen />;
      switch (farmerTab) {
        case 'home':
          return <FarmerHomeScreen />;
        case 'mystock':
          return <FarmerMyStockScreen />;
        case 'orders':
          return <FarmerOrdersScreen />;
        case 'earnings':
          return <FarmerEarningsScreen />;
        default:
          return <FarmerHomeScreen />;
      }
    }

    if (role === 'consumer') {
      if (consumerSubScreen === 'product_detail') return <ProductDetailModal />;
      if (consumerSubScreen === 'payment') return <ConsumerPaymentScreen />;
      if (consumerSubScreen === 'tracking') return <ConsumerLiveTrackingScreen />;
      switch (consumerTab) {
        case 'marketplace':
          return <ConsumerMarketplaceScreen />;
        case 'orders':
          return <ConsumerOrdersScreen />;
        case 'cart':
          return <ConsumerCartScreen />;
        case 'profile':
          return <ConsumerProfileScreen />;
        default:
          return <ConsumerMarketplaceScreen />;
      }
    }

    // Logistics Partner Role
    if (role === 'logistics') {
      if (logisticsSubScreen === 'route_optimization') return <LogisticsRouteOptimizationScreen />;
      switch (logisticsTab) {
        case 'bookings':
          return <LogisticsBookingsScreen />;
        case 'activetrip':
          return <LogisticsActiveTripScreen />;
        case 'earnings':
          return <LogisticsEarningsScreen />;
        case 'profile':
          return <LogisticsProfileScreen />;
        default:
          return <LogisticsBookingsScreen />;
      }
    }

    return <FarmerHomeScreen />;
  };

  const isSubScreenOpen = Boolean(
    (role === 'farmer' && farmerSubScreen) ||
    (role === 'consumer' && consumerSubScreen) ||
    (role === 'logistics' && logisticsSubScreen)
  );

  return (
    <div className="simulator-container">
      {/* Mobile Device Frame */}
      <div className={`simulator-device ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        {/* Mobile Status Bar */}
        <div className="mobile-status-bar">
          <span>{currentTime}</span>

          {/* Dynamic Island / Notch */}
          <div className="dynamic-island-notch">
            <div className="sensor-dot" />
            <div className="camera-lens" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* In-app push notifications */}
        <PushBanner />

        {/* Active Viewport Screen */}
        <div className="app-screen-viewport">
          {renderScreen()}
          {authStep === 'authenticated' && !isSubScreenOpen && <BottomTabBar />}
        </div>
      </div>

      {/* Simulator Control Panel on Desktop */}
      <div className="simulator-controls">
        <div className="role-pill-selector">
          <button
            onClick={() => quickSwitchRole('farmer')}
            className={`role-pill-btn ${role === 'farmer' && authStep === 'authenticated' ? 'active' : ''}`}
            title="Switch to Farmer App"
          >
            <Sprout size={14} />
            <span>Farmer</span>
          </button>

          <button
            onClick={() => quickSwitchRole('consumer')}
            className={`role-pill-btn ${role === 'consumer' && authStep === 'authenticated' ? 'active' : ''}`}
            title="Switch to Consumer App"
          >
            <ShoppingBag size={14} />
            <span>Consumer</span>
          </button>

          <button
            onClick={() => quickSwitchRole('logistics')}
            className={`role-pill-btn ${role === 'logistics' && authStep === 'authenticated' ? 'active' : ''}`}
            title="Switch to Logistics Partner App"
          >
            <Truck size={14} />
            <span>Logistics</span>
          </button>
        </div>

        {/* Reset / Onboarding & Fullscreen buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setAuthStep('splash')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FAF7F0',
              padding: '7px 10px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600
            }}
            title="Restart Onboarding Flow"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FAF7F0',
              padding: '7px 10px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AgriConnectAppContent />
    </AppProvider>
  );
}
