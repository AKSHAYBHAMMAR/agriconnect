import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CropItem } from '../../types';
import { Search, Filter, MapPin, Star, Calendar, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';

export const ConsumerMarketplaceScreen: React.FC = () => {
  const { crops, addToCart, setSelectedCropId, setConsumerSubScreen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegetable' | 'grain' | 'organic' | 'fresh'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'freshness'>('recommended');

  const filteredCrops = crops.filter(crop => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'organic') return matchesSearch && crop.organicCertified;
    if (activeFilter === 'fresh') return matchesSearch && crop.cropAgeDays < 90;
    if (activeFilter !== 'all') return matchesSearch && crop.category === activeFilter;

    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === 'freshness') return a.cropAgeDays - b.cropAgeDays;
    return b.farmerRating - a.farmerRating;
  });

  const handleOpenProduct = (cropId: string) => {
    setSelectedCropId(cropId);
    setConsumerSubScreen('product_detail');
  };

  return (
    <div className="screen-scroll-content" style={{ padding: '16px 16px 100px 16px' }}>
      {/* Search Bar */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '10px 14px',
              border: '1px solid #E6DEC9',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Search size={18} color="#7E8B76" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search tomatoes, basmati rice, onions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: '#1C2417',
                background: 'transparent'
              }}
            />
          </div>

          <button
            onClick={() => setSortBy(sortBy === 'recommended' ? 'price_low' : sortBy === 'price_low' ? 'freshness' : 'recommended')}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6DEC9',
              borderRadius: '14px',
              padding: '10px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#2D5016',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Sort results"
          >
            <SlidersHorizontal size={14} />
            <span style={{ textTransform: 'capitalize' }}>{sortBy.replace('_', ' ')}</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
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
        {[
          { id: 'all', label: '🌾 All Produce' },
          { id: 'vegetable', label: '🍅 Fresh Veggies' },
          { id: 'grain', label: '🌾 Grains & Rice' },
          { id: 'organic', label: '🌿 Certified Organic' },
          { id: 'fresh', label: '⚡ Fresh Picked' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            style={{
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeFilter === filter.id ? '#2D5016' : '#FFFFFF',
              color: activeFilter === filter.id ? '#FFFFFF' : '#515C4B',
              boxShadow: activeFilter === filter.id ? '0 2px 8px rgba(45, 80, 22, 0.25)' : 'var(--shadow-sm)'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Produce Cards Vertical Scroll */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            onClick={() => handleOpenProduct(crop.id)}
            className="agri-card"
            style={{
              padding: '14px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', gap: '14px' }}>
              {/* Product Image with Tag */}
              <div style={{ position: 'relative', width: '104px', height: '104px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {crop.organicCertified && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      backgroundColor: 'rgba(45, 80, 22, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}
                  >
                    Organic
                  </div>
                )}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    color: '#FFFFFF',
                    fontSize: '9px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <span>{crop.farmerRating}</span>
                </div>
              </div>

              {/* Info Column */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1C2417', margin: 0 }}>
                    {crop.name}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#7E8B76', fontWeight: 500, display: 'block', margin: '1px 0 4px' }}>
                    {crop.variety}
                  </span>

                  {/* Farmer name & distance */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#515C4B' }}>
                    <MapPin size={11} color="#C77D3B" />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {crop.farmerName} &bull; {crop.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Crop Age Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span
                    style={{
                      backgroundColor: '#FCF1E1',
                      color: '#C77D3B',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    <Calendar size={10} />
                    <span>{crop.cropAgeDays}d since sowing</span>
                  </span>

                  <span
                    style={{
                      backgroundColor: '#EDF6E8',
                      color: '#2D5016',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px'
                    }}
                  >
                    Grade {crop.grade}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price + Add to Cart */}
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
                <span style={{ fontSize: '10px', color: '#7E8B76' }}>Wholesale Price:</span>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#2D5016' }}>
                  ₹{crop.pricePerUnit}
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#515C4B' }}>/{crop.unit}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(crop, crop.unit === 'kg' ? 50 : 5);
                }}
                style={{
                  backgroundColor: '#2D5016',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45, 80, 22, 0.2)'
                }}
              >
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
