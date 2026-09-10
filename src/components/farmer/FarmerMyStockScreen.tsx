import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Search, Trash2, Edit3, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const FarmerMyStockScreen: React.FC = () => {
  const { crops, deleteCrop, setFarmerSubScreen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCrops = crops.filter(crop => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
            My Crop Stock
          </h2>
          <span style={{ fontSize: '12px', color: '#7E8B76' }}>
            {crops.length} active harvest listings available for buyers
          </span>
        </div>

        <button
          onClick={() => setFarmerSubScreen('add_stock')}
          style={{
            backgroundColor: '#2D5016',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          <span>New Stock</span>
        </button>
      </div>

      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '10px 14px',
          border: '1px solid #E5DEC9',
          marginBottom: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Search size={16} color="#7E8B76" style={{ marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Search by crop name or variety..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '13px',
            color: '#1C2417',
            background: 'transparent'
          }}
        />
      </div>

      {/* Filter Categories */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: '16px',
          paddingBottom: '2px'
        }}
      >
        {['all', 'vegetable', 'grain', 'oilseed', 'spice'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'capitalize',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: selectedCategory === cat ? '#2D5016' : '#FFFFFF',
              color: selectedCategory === cat ? '#FFFFFF' : '#515C4B',
              boxShadow: selectedCategory === cat ? '0 2px 8px rgba(45, 80, 22, 0.2)' : 'var(--shadow-sm)'
            }}
          >
            {cat === 'all' ? 'All Crops' : `${cat}s`}
          </button>
        ))}
      </div>

      {/* Crop Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredCrops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#FFFFFF', borderRadius: '16px' }}>
            <AlertCircle size={32} color="#7E8B76" style={{ margin: '0 auto 8px' }} />
            <h4 style={{ fontSize: '15px', color: '#1C2417', margin: '0 0 4px' }}>No crops found</h4>
            <p style={{ fontSize: '12px', color: '#7E8B76', margin: 0 }}>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="agri-card"
              style={{
                padding: '14px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Photo Thumbnail */}
                <div style={{ position: 'relative', width: '84px', height: '84px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      backgroundColor: 'rgba(28, 51, 14, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '2px 5px',
                      borderRadius: '6px'
                    }}
                  >
                    Grade {crop.grade}
                  </div>
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1C2417', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {crop.name}
                    </h3>
                  </div>

                  <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 500, display: 'block', margin: '2px 0 6px' }}>
                    {crop.variety}
                  </span>

                  {/* Crop Age Badge & Days */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        backgroundColor: '#FCF1E1',
                        color: '#C77D3B',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Calendar size={10} />
                      <span>{crop.cropAgeDays} days old</span>
                    </span>

                    <span
                      style={{
                        backgroundColor: '#EDF6E8',
                        color: '#2D5016',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {crop.quantityAvailable} {crop.unit} left
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Action Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '10px',
                  borderTop: '1px solid #F0EAE1'
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', color: '#7E8B76' }}>Listing Price:</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#2D5016' }}>
                    ₹{crop.pricePerUnit}
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#515C4B' }}>/{crop.unit}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => deleteCrop(crop.id)}
                    style={{
                      background: '#FEE2E2',
                      border: 'none',
                      color: '#DC2626',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Delete Stock"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>

                  <button
                    onClick={() => setFarmerSubScreen('add_stock')}
                    style={{
                      background: '#F4EFE6',
                      border: 'none',
                      color: '#2D5016',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={12} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
