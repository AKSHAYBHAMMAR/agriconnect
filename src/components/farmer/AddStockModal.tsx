import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CropCategory } from '../../types';
import { X, Camera, Image as ImageIcon, Calendar, MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';

export const AddStockModal: React.FC = () => {
  const { setFarmerSubScreen, addNewCrop } = useApp();

  const [name, setName] = useState('Organic Roma Tomatoes');
  const [variety, setVariety] = useState('Abhinav F1 Fresh Harvest');
  const [category, setCategory] = useState<CropCategory>('vegetable');
  const [quantity, setQuantity] = useState('450');
  const [unit, setUnit] = useState<'kg' | 'quintal'>('kg');
  const [pricePerUnit, setPricePerUnit] = useState('24');
  const [sowingDate, setSowingDate] = useState('2026-07-10');
  const [cropAge, setCropAge] = useState<number>(62);
  const [location, setLocation] = useState('Dindori Road Farm, Nashik, MH');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const samplePhotos = [
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
  ];

  // Auto calculate crop age in days whenever sowing date changes
  useEffect(() => {
    if (sowingDate) {
      const sowing = new Date(sowingDate);
      const today = new Date();
      const diffDays = Math.max(1, Math.round((today.getTime() - sowing.getTime()) / (1000 * 60 * 60 * 24)));
      setCropAge(diffDays);
    }
  }, [sowingDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewCrop({
      name,
      variety,
      category,
      quantityAvailable: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      sowingDate,
      cropAgeDays: cropAge,
      location,
      imageUrl: samplePhotos[selectedPhotoIndex]
    });
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
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1C2417', margin: 0 }}>
            Add Harvest Stock
          </h3>
          <span style={{ fontSize: '11px', color: '#7E8B76' }}>
            Direct marketplace listing for wholesale buyers
          </span>
        </div>

        <button
          onClick={() => setFarmerSubScreen(null)}
          style={{
            background: '#F4EFE6',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#515C4B'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 120px 16px' }}>
        {/* Photo Upload Section */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1C2417', marginBottom: '8px' }}>
            Crop Photos (Camera / Gallery)
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: '2px solid #2D5016',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={samplePhotos[selectedPhotoIndex]}
                alt="Selected"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  backgroundColor: '#2D5016',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  padding: '4px'
                }}
              >
                <Check size={12} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {samplePhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      opacity: selectedPhotoIndex === idx ? 1 : 0.6,
                      border: selectedPhotoIndex === idx ? '2px solid #2D5016' : '1px solid #D8D0C0'
                    }}
                  >
                    <img src={photo} alt={`Option ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#2D5016',
                    fontWeight: 600,
                    border: '1px dashed #4A7C2A'
                  }}
                >
                  <Camera size={13} />
                  <span>Take Live Pic</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#515C4B',
                    fontWeight: 600,
                    border: '1px solid #E5DFC5'
                  }}
                >
                  <ImageIcon size={13} />
                  <span>Gallery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Name & Variety */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '6px' }}>
              Crop Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hybrid Tomatoes, Sharbati Wheat"
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2DBCC',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '14px',
                color: '#1C2417',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '6px' }}>
              Variety / Seed Spec
            </label>
            <input
              type="text"
              required
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              placeholder="e.g. Abhinav F1, C-306, Bhima Super"
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2DBCC',
                borderRadius: '12px',
                padding: '12px 14px',
                fontSize: '14px',
                color: '#1C2417',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Quantity and Price Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '6px' }}>
              Total Quantity
            </label>
            <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2DBCC', overflow: 'hidden' }}>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: '60%',
                  border: 'none',
                  padding: '12px 10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                  color: '#1C2417'
                }}
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'kg' | 'quintal')}
                style={{
                  width: '40%',
                  border: 'none',
                  backgroundColor: '#F7F3EB',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2D5016',
                  padding: '0 6px',
                  outline: 'none'
                }}
              >
                <option value="kg">kg</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '6px' }}>
              Price per {unit} (₹)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2DBCC', padding: '0 12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#2D5016', marginRight: '4px' }}>₹</span>
              <input
                type="number"
                required
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  padding: '12px 0',
                  fontSize: '14px',
                  fontWeight: 700,
                  outline: 'none',
                  color: '#1C2417'
                }}
              />
            </div>
          </div>
        </div>

        {/* Sowing Date Picker -> Auto Crop Age Calculator */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', border: '1px solid #EAE3D2', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#1C2417', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="#2D5016" />
              <span>Sowing Date & Crop Age</span>
            </label>
            <div
              style={{
                backgroundColor: '#EDF6E8',
                color: '#2D5016',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              Age: {cropAge} days
            </div>
          </div>

          <input
            type="date"
            value={sowingDate}
            onChange={(e) => setSowingDate(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#FAF7F0',
              border: '1px solid #E5DFC5',
              borderRadius: '10px',
              padding: '10px 12px',
              fontSize: '13px',
              color: '#1C2417',
              outline: 'none'
            }}
          />

          <p style={{ fontSize: '11px', color: '#7E8B76', margin: '8px 0 0 0', lineHeight: 1.4 }}>
            🌱 AgriConnect automatically calculates crop age and displays freshness verification to premium buyers.
          </p>
        </div>

        {/* Location Tag */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1C2417', marginBottom: '6px' }}>
            Farm Location Tag
          </label>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2DBCC', padding: '0 12px' }}>
            <MapPin size={16} color="#C77D3B" style={{ marginRight: '8px' }} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                padding: '12px 0',
                fontSize: '13px',
                outline: 'none',
                color: '#1C2417'
              }}
            />
          </div>
        </div>

        {/* Fixed Publish Button at Bottom */}
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
            type="submit"
            className="btn-primary"
            style={{ width: '100%', borderRadius: '14px', fontSize: '16px', padding: '14px' }}
          >
            <span>Publish Crop Listing</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
