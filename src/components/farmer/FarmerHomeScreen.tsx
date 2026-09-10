import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, TrendingUp, Plus, ChevronRight, Package, ArrowUpRight, DollarSign, Clock, MapPin, Sparkles } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const FarmerHomeScreen: React.FC = () => {
  const {
    crops,
    orders,
    setFarmerTab,
    setFarmerSubScreen,
    setSelectedOrderId
  } = useApp();

  const totalActiveStock = crops.length;
  const pendingOrders = orders.filter(o => o.status === 'ordered');
  const thisMonthEarnings = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + (o.cropTotal - o.farmerTransportShare), 62000);

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Greeting Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4A7C2A' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#515C4B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Kisan Dashboard
            </span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
            Namaste, Rameshwar ji 🙏
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#7E8B76', marginTop: '2px' }}>
            <MapPin size={12} color="#C77D3B" />
            <span>Patel Agro Farm, Sehore (MP)</span>
          </div>
        </div>

        <button
          onClick={() => setFarmerSubScreen('add_stock')}
          style={{
            backgroundColor: '#2D5016',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 12px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(45, 80, 22, 0.25)'
          }}
        >
          <Plus size={16} />
          <span>Add Stock</span>
        </button>
      </div>

      {/* AI Demand Forecast Alert Banner */}
      <div
        onClick={() => setFarmerSubScreen('ai_forecast')}
        style={{
          background: 'linear-gradient(135deg, #FFF9F2 0%, #FAF0E4 100%)',
          borderRadius: '16px',
          padding: '14px 16px',
          border: '1.5px solid #E8A857',
          marginBottom: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(199, 125, 59, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#C77D3B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}
        >
          <Sparkles size={22} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#C77D3B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              AI Demand Advisory
            </span>
            <span style={{ fontSize: '10px', backgroundColor: '#DCFCE7', color: '#166534', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
              +18% Surge
            </span>
          </div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1C2417', margin: '2px 0 0' }}>
            Tomato demand surging next week!
          </p>
          <p style={{ fontSize: '11px', color: '#515C4B', margin: 0 }}>
            Tap to view predicted APMC Mandi prices & harvesting advice.
          </p>
        </div>

        <ChevronRight size={18} color="#C77D3B" />
      </div>

      {/* Summary Cards in Horizontal Scroll */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
            Harvest Overview
          </h3>
          <span style={{ fontSize: '11px', color: '#7E8B76' }}>Swipe &rarr;</span>
        </div>

        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollSnapType: 'x mandatory'
          }}
        >
          {/* Active Listings Card */}
          <div
            onClick={() => setFarmerTab('mystock')}
            className="agri-card"
            style={{
              minWidth: '150px',
              padding: '16px',
              cursor: 'pointer',
              scrollSnapAlign: 'start',
              borderLeft: '4px solid #4A7C2A'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 600 }}>Active Listings</span>
              <Sprout size={16} color="#4A7C2A" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1C2417' }}>
              {totalActiveStock} Crops
            </div>
            <span style={{ fontSize: '11px', color: '#4A7C2A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              <span>View stock</span>
              <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Pending Orders Card */}
          <div
            onClick={() => setFarmerTab('orders')}
            className="agri-card"
            style={{
              minWidth: '150px',
              padding: '16px',
              cursor: 'pointer',
              scrollSnapAlign: 'start',
              borderLeft: '4px solid #C77D3B'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 600 }}>Pending Orders</span>
              <Package size={16} color="#C77D3B" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#C77D3B' }}>
              {pendingOrders.length} New
            </div>
            <span style={{ fontSize: '11px', color: '#C77D3B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
              <span>Dispatch now</span>
              <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Month's Earnings Card */}
          <div
            onClick={() => setFarmerTab('earnings')}
            className="agri-card"
            style={{
              minWidth: '160px',
              padding: '16px',
              cursor: 'pointer',
              scrollSnapAlign: 'start',
              borderLeft: '4px solid #2D5016'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 600 }}>Month Payout</span>
              <DollarSign size={16} color="#2D5016" />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#2D5016' }}>
              ₹{thisMonthEarnings.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: '#515C4B', fontWeight: 500, marginTop: '4px', display: 'block' }}>
              Net after 25% freight
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action: Publish crop banner */}
      <div
        className="agri-card"
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #2D5016 0%, #1C330E 100%)',
          color: '#FFFFFF',
          marginBottom: '24px',
          borderRadius: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#D4E2CC', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Direct Farm Listing
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '2px 0 4px 0', color: '#FFFFFF' }}>
              Have fresh harvest ready?
            </h4>
            <p style={{ fontSize: '12px', color: '#D4E2CC', margin: 0 }}>
              List with photo & sowing date for automatic crop age badge.
            </p>
          </div>

          <button
            onClick={() => setFarmerSubScreen('add_stock')}
            style={{
              backgroundColor: '#E8A857',
              color: '#1C330E',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0
            }}
          >
            <span>Publish</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Incoming Orders Peek */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
            Recent Incoming Orders
          </h3>
          <button
            onClick={() => setFarmerTab('orders')}
            style={{ background: 'none', border: 'none', color: '#2D5016', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            View all ({orders.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {orders.slice(0, 2).map((order) => (
            <div
              key={order.id}
              onClick={() => {
                setSelectedOrderId(order.id);
                setFarmerTab('orders');
              }}
              className="agri-card"
              style={{ padding: '14px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7E8B76' }}>
                    {order.orderNumber}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1C2417', margin: '2px 0 0 0' }}>
                    {order.cropName}
                  </h4>
                </div>
                <StatusBadge status={order.status} size="sm" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#515C4B' }}>
                <span>{order.quantity} {order.unit} &bull; Buyer: {order.consumerName.split(' ')[0]}</span>
                <span style={{ fontWeight: 700, color: '#2D5016' }}>₹{order.cropTotal.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
