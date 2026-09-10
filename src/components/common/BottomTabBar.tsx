import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  Wheat,
  ClipboardList,
  Wallet,
  ShoppingBag,
  PackageCheck,
  ShoppingCart,
  User,
  Truck,
  Navigation,
  DollarSign
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const {
    role,
    farmerTab,
    setFarmerTab,
    consumerTab,
    setConsumerTab,
    logisticsTab,
    setLogisticsTab,
    farmerSubScreen,
    setFarmerSubScreen,
    consumerSubScreen,
    setConsumerSubScreen,
    logisticsSubScreen,
    setLogisticsSubScreen,
    cart,
    orders,
    bookings
  } = useApp();

  // If inside a full-screen modal/sub-screen (e.g., active trip full map or product detail), we can either hide or allow quick tab jump
  // In our app, tapping a tab will smoothly close the subscreen and open that tab!

  const handleFarmerTabClick = (tab: typeof farmerTab) => {
    setFarmerSubScreen(null);
    setFarmerTab(tab);
  };

  const handleConsumerTabClick = (tab: typeof consumerTab) => {
    setConsumerSubScreen(null);
    setConsumerTab(tab);
  };

  const handleLogisticsTabClick = (tab: typeof logisticsTab) => {
    setLogisticsSubScreen(null);
    setLogisticsTab(tab);
  };

  const pendingFarmerOrders = orders.filter(o => o.status === 'ordered').length;
  const cartItemsCount = cart.reduce((sum, item) => sum + 1, 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'available').length;

  if (role === 'farmer') {
    return (
      <div className="bottom-tab-bar">
        <button
          className={`tab-item ${farmerTab === 'home' && !farmerSubScreen ? 'active' : ''}`}
          onClick={() => handleFarmerTabClick('home')}
        >
          <div className="tab-icon-wrapper">
            <Sprout size={20} />
          </div>
          <span className="tab-label">Home</span>
        </button>

        <button
          className={`tab-item ${farmerTab === 'mystock' && !farmerSubScreen ? 'active' : ''}`}
          onClick={() => handleFarmerTabClick('mystock')}
        >
          <div className="tab-icon-wrapper">
            <Wheat size={20} />
          </div>
          <span className="tab-label">My Stock</span>
        </button>

        <button
          className={`tab-item ${farmerTab === 'orders' && !farmerSubScreen ? 'active' : ''}`}
          onClick={() => handleFarmerTabClick('orders')}
        >
          <div className="tab-icon-wrapper">
            <ClipboardList size={20} />
            {pendingFarmerOrders > 0 && <span className="tab-badge">{pendingFarmerOrders}</span>}
          </div>
          <span className="tab-label">Orders</span>
        </button>

        <button
          className={`tab-item ${farmerTab === 'earnings' && !farmerSubScreen ? 'active' : ''}`}
          onClick={() => handleFarmerTabClick('earnings')}
        >
          <div className="tab-icon-wrapper">
            <Wallet size={20} />
          </div>
          <span className="tab-label">Earnings</span>
        </button>
      </div>
    );
  }

  if (role === 'consumer') {
    return (
      <div className="bottom-tab-bar">
        <button
          className={`tab-item ${consumerTab === 'marketplace' && !consumerSubScreen ? 'active' : ''}`}
          onClick={() => handleConsumerTabClick('marketplace')}
        >
          <div className="tab-icon-wrapper">
            <ShoppingBag size={20} />
          </div>
          <span className="tab-label">Market</span>
        </button>

        <button
          className={`tab-item ${consumerTab === 'orders' && !consumerSubScreen ? 'active' : ''}`}
          onClick={() => handleConsumerTabClick('orders')}
        >
          <div className="tab-icon-wrapper">
            <PackageCheck size={20} />
          </div>
          <span className="tab-label">My Orders</span>
        </button>

        <button
          className={`tab-item ${consumerTab === 'cart' && !consumerSubScreen ? 'active' : ''}`}
          onClick={() => handleConsumerTabClick('cart')}
        >
          <div className="tab-icon-wrapper">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && <span className="tab-badge">{cartItemsCount}</span>}
          </div>
          <span className="tab-label">Cart</span>
        </button>

        <button
          className={`tab-item ${consumerTab === 'profile' && !consumerSubScreen ? 'active' : ''}`}
          onClick={() => handleConsumerTabClick('profile')}
        >
          <div className="tab-icon-wrapper">
            <User size={20} />
          </div>
          <span className="tab-label">Profile</span>
        </button>
      </div>
    );
  }

  // Logistics Partner Role
  return (
    <div className="bottom-tab-bar">
      <button
        className={`tab-item ${logisticsTab === 'bookings' && !logisticsSubScreen ? 'active' : ''}`}
        onClick={() => handleLogisticsTabClick('bookings')}
      >
        <div className="tab-icon-wrapper">
          <Truck size={20} />
          {activeBookingsCount > 0 && <span className="tab-badge">{activeBookingsCount}</span>}
        </div>
        <span className="tab-label">Bookings</span>
      </button>

      <button
        className={`tab-item ${logisticsTab === 'activetrip' && !logisticsSubScreen ? 'active' : ''}`}
        onClick={() => handleLogisticsTabClick('activetrip')}
      >
        <div className="tab-icon-wrapper">
          <Navigation size={20} />
        </div>
        <span className="tab-label">Active Trip</span>
      </button>

      <button
        className={`tab-item ${logisticsTab === 'earnings' && !logisticsSubScreen ? 'active' : ''}`}
        onClick={() => handleLogisticsTabClick('earnings')}
      >
        <div className="tab-icon-wrapper">
          <DollarSign size={20} />
        </div>
        <span className="tab-label">Earnings</span>
      </button>

      <button
        className={`tab-item ${logisticsTab === 'profile' && !logisticsSubScreen ? 'active' : ''}`}
        onClick={() => handleLogisticsTabClick('profile')}
      >
        <div className="tab-icon-wrapper">
          <User size={20} />
        </div>
        <span className="tab-label">Profile</span>
      </button>
    </div>
  );
};
