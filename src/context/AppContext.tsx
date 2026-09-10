import React, { createContext, useContext, useState } from 'react';
import { UserRole, CropItem, OrderItem, LogisticsBooking, CartItem } from '../types';
import { INITIAL_CROPS, INITIAL_ORDERS, INITIAL_BOOKINGS, DEMAND_FORECASTS } from '../data/mockData';

interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'alert' | 'order';
  title: string;
  message: string;
  timestamp: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  authStep: 'splash' | 'role_select' | 'login_otp' | 'authenticated';
  setAuthStep: (step: 'splash' | 'role_select' | 'login_otp' | 'authenticated') => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  crops: CropItem[];
  orders: OrderItem[];
  bookings: LogisticsBooking[];
  cart: CartItem[];
  activeTripId: string | null;
  setActiveTripId: (id: string | null) => void;
  isLogisticsOnline: boolean;
  setIsLogisticsOnline: (online: boolean) => void;
  toast: ToastNotification | null;
  showToast: (type: ToastNotification['type'], title: string, message: string) => void;
  dismissToast: () => void;
  
  // Navigation Tabs per Role
  farmerTab: 'home' | 'mystock' | 'orders' | 'earnings';
  setFarmerTab: (tab: 'home' | 'mystock' | 'orders' | 'earnings') => void;
  consumerTab: 'marketplace' | 'orders' | 'cart' | 'profile';
  setConsumerTab: (tab: 'marketplace' | 'orders' | 'cart' | 'profile') => void;
  logisticsTab: 'bookings' | 'activetrip' | 'earnings' | 'profile';
  setLogisticsTab: (tab: 'bookings' | 'activetrip' | 'earnings' | 'profile') => void;

  // Stack navigation state
  farmerSubScreen: 'add_stock' | 'ai_forecast' | null;
  setFarmerSubScreen: (screen: 'add_stock' | 'ai_forecast' | null) => void;
  consumerSubScreen: 'product_detail' | 'payment' | 'tracking' | null;
  setConsumerSubScreen: (screen: 'product_detail' | 'payment' | 'tracking' | null) => void;
  logisticsSubScreen: 'route_optimization' | null;
  setLogisticsSubScreen: (screen: 'route_optimization' | null) => void;

  selectedCropId: string | null;
  setSelectedCropId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;

  // Actions
  addNewCrop: (cropData: Partial<CropItem>) => void;
  deleteCrop: (cropId: string) => void;
  addToCart: (crop: CropItem, qty: number) => void;
  updateCartQty: (cropId: string, qty: number) => void;
  removeFromCart: (cropId: string) => void;
  clearCart: () => void;
  createOrderFromCart: (paymentType: 'split_50' | 'full_100') => OrderItem;
  acceptBooking: (bookingId: string) => void;
  declineBooking: (bookingId: string) => void;
  toggleChecklistItem: (bookingId: string, checkId: string) => void;
  markPickedUp: (bookingId: string) => void;
  markDelivered: (bookingId: string) => void;
  quickSwitchRole: (newRole: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('farmer');
  const [authStep, setAuthStep] = useState<'splash' | 'role_select' | 'login_otp' | 'authenticated'>('splash');
  const [userPhone, setUserPhone] = useState<string>('9826144521');
  const [crops, setCrops] = useState<CropItem[]>(INITIAL_CROPS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [bookings, setBookings] = useState<LogisticsBooking[]>(INITIAL_BOOKINGS);
  const [cart, setCart] = useState<CartItem[]>([
    { crop: INITIAL_CROPS[1], quantity: 50 } // pre-populated with 50kg Tomatoes
  ]);
  const [activeTripId, setActiveTripId] = useState<string | null>('trip-402');
  const [isLogisticsOnline, setIsLogisticsOnline] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastNotification | null>({
    id: 't-init',
    type: 'alert',
    title: 'AI Market Forecast',
    message: 'Tomato demand +18% next week — tap to see pricing tips!',
    timestamp: 'Just now'
  });

  // Role Tab States
  const [farmerTab, setFarmerTab] = useState<'home' | 'mystock' | 'orders' | 'earnings'>('home');
  const [consumerTab, setConsumerTab] = useState<'marketplace' | 'orders' | 'cart' | 'profile'>('marketplace');
  const [logisticsTab, setLogisticsTab] = useState<'bookings' | 'activetrip' | 'earnings' | 'profile'>('bookings');

  // Sub Screens
  const [farmerSubScreen, setFarmerSubScreen] = useState<'add_stock' | 'ai_forecast' | null>(null);
  const [consumerSubScreen, setConsumerSubScreen] = useState<'product_detail' | 'payment' | 'tracking' | null>(null);
  const [logisticsSubScreen, setLogisticsSubScreen] = useState<'route_optimization' | null>(null);

  const [selectedCropId, setSelectedCropId] = useState<string | null>('crop-2');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ord-8094');

  const showToast = (type: ToastNotification['type'], title: string, message: string) => {
    setToast({
      id: `toast-${Date.now()}`,
      type,
      title,
      message,
      timestamp: 'Just now'
    });
    setTimeout(() => {
      setToast((prev) => (prev?.title === title ? null : prev));
    }, 5500);
  };

  const dismissToast = () => setToast(null);

  const addNewCrop = (cropData: Partial<CropItem>) => {
    const today = new Date();
    const sowing = cropData.sowingDate ? new Date(cropData.sowingDate) : new Date(today.getTime() - 45 * 86400000);
    const ageDays = Math.max(1, Math.round((today.getTime() - sowing.getTime()) / (1000 * 60 * 60 * 24)));

    const newCrop: CropItem = {
      id: `crop-${Date.now()}`,
      name: cropData.name || 'Organic Fresh Crop',
      variety: cropData.variety || 'Desi Grade 1',
      category: cropData.category || 'vegetable',
      pricePerUnit: Number(cropData.pricePerUnit) || 30,
      unit: cropData.unit || 'kg',
      quantityAvailable: Number(cropData.quantityAvailable) || 100,
      initialQuantity: Number(cropData.quantityAvailable) || 100,
      location: cropData.location || 'Nashik Agri Hub, Maharashtra',
      state: 'Maharashtra',
      sowingDate: cropData.sowingDate || sowing.toISOString().split('T')[0],
      cropAgeDays: ageDays,
      grade: cropData.grade || 'A+',
      farmerName: 'Rameshwar Patel (You)',
      farmerPhone: userPhone,
      farmerRating: 5.0,
      farmerReviewsCount: 1,
      farmerDistanceKm: 4,
      imageUrl: cropData.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      description: cropData.description || 'Harvested directly from farm with sustainable practices.',
      moisturePercentage: 11.5,
      organicCertified: true,
      harvestWindow: 'Ready for Immediate Dispatch'
    };

    setCrops([newCrop, ...crops]);
    setFarmerSubScreen(null);
    setFarmerTab('mystock');
    showToast('success', 'Crop Published!', `${newCrop.name} (${newCrop.quantityAvailable} ${newCrop.unit}) is now live on marketplace.`);
  };

  const deleteCrop = (cropId: string) => {
    const target = crops.find(c => c.id === cropId);
    setCrops(crops.filter(c => c.id !== cropId));
    showToast('info', 'Stock Removed', `${target?.name || 'Crop'} listing was deleted.`);
  };

  const addToCart = (crop: CropItem, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.crop.id === crop.id);
      if (existing) {
        return prev.map(item =>
          item.crop.id === crop.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { crop, quantity: qty }];
    });
    showToast('success', 'Added to Cart', `${qty} ${crop.unit} of ${crop.name} added.`);
  };

  const updateCartQty = (cropId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cropId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.crop.id === cropId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (cropId: string) => {
    setCart(prev => prev.filter(item => item.crop.id !== cropId));
  };

  const clearCart = () => setCart([]);

  const createOrderFromCart = (paymentType: 'split_50' | 'full_100'): OrderItem => {
    const firstItem = cart[0] || { crop: crops[0], quantity: 100 };
    const cropSubtotal = cart.reduce((sum, item) => sum + item.crop.pricePerUnit * item.quantity, 0);
    const transportFee = Math.round(cropSubtotal * 0.12) || 800; // estimated freight
    const farmerShare = Math.round(transportFee * 0.25); // 1/4 share
    const buyerShare = transportFee - farmerShare;        // 3/4 share
    const grandTotal = cropSubtotal + buyerShare;
    const paid = paymentType === 'split_50' ? Math.round(grandTotal * 0.5) : grandTotal;
    const pending = grandTotal - paid;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `AG-${Math.floor(1000 + Math.random() * 9000)}`,
      cropId: firstItem.crop.id,
      cropName: cart.length === 1 ? firstItem.crop.name : `${firstItem.crop.name} + ${cart.length - 1} more items`,
      variety: firstItem.crop.variety,
      quantity: firstItem.quantity,
      unit: firstItem.crop.unit,
      pricePerUnit: firstItem.crop.pricePerUnit,
      cropTotal: cropSubtotal,
      transportTotal: transportFee,
      farmerTransportShare: farmerShare,
      buyerTransportShare: buyerShare,
      grandTotal,
      paymentType,
      amountPaid: paid,
      amountPending: pending,
      status: 'ordered',
      consumerName: 'Rajesh Malhotra (You)',
      consumerPhone: userPhone,
      deliveryAddress: 'Green Valley APMC Retail Dock 2, Western Express, Mumbai',
      farmerName: firstItem.crop.farmerName,
      farmerLocation: firstItem.crop.location,
      farmerPhone: firstItem.crop.farmerPhone,
      logisticsPartnerName: 'Assigning partner...',
      vehicleType: 'Mahindra Bolero Maxi Truck',
      createdAt: 'Just now',
      timeline: [
        {
          status: 'ordered',
          label: 'Order Placed',
          description: `Confirmed via ${paymentType === 'split_50' ? '50% advance split payment' : '100% full advance'}`,
          time: 'Just now',
          completed: true
        },
        {
          status: 'paid',
          label: paymentType === 'split_50' ? '50% Advance Escrowed' : '100% Full Payment Escrowed',
          description: `₹${paid.toLocaleString()} secured in AgriConnect Escrow`,
          time: 'Just now',
          completed: true
        },
        {
          status: 'picked_up',
          label: 'Logistics Assignment & Pickup',
          description: 'Awaiting farm loading',
          time: 'Pending',
          completed: false
        },
        {
          status: 'in_transit',
          label: 'In Transit',
          description: 'Route navigation to delivery hub',
          time: 'Pending',
          completed: false
        },
        {
          status: 'delivered',
          label: 'Delivery & Final Settlement',
          description: pending > 0 ? `Final balance ₹${pending.toLocaleString()} due on arrival` : 'Complete',
          time: 'Pending',
          completed: false
        }
      ]
    };

    // Also auto create a logistics booking for this order
    const newBooking: LogisticsBooking = {
      id: `trip-${Date.now()}`,
      bookingNumber: `TR-${Math.floor(500 + Math.random() * 400)}`,
      pickupLocation: {
        title: `${firstItem.crop.location} Hub`,
        farmName: `${firstItem.crop.farmerName}'s Estate`,
        district: 'Nashik',
        state: 'Maharashtra',
        contactPhone: firstItem.crop.farmerPhone
      },
      dropLocation: {
        title: 'Mumbai APMC Terminal',
        hubName: 'Green Valley Retail Dock 2',
        district: 'Mumbai',
        state: 'Maharashtra',
        contactPhone: userPhone
      },
      cropName: newOrder.cropName,
      quantity: firstItem.quantity,
      unit: firstItem.crop.unit,
      distanceKm: 145,
      estHours: '3 hrs 20 mins',
      grossPayout: transportFee,
      farmerShareDeduction: farmerShare,
      buyerShareContribution: buyerShare,
      status: 'available',
      vehicleRecommended: 'Mahindra Bolero Maxi Truck',
      pickupChecklist: [
        { id: 'c1', label: 'Verify crate count and packaging seals', checked: false },
        { id: 'c2', label: 'Moisture and freshness spot inspection', checked: false },
        { id: 'c3', label: 'Farmer dispatch OTP verified', checked: false }
      ],
      routeWaypoints: [
        { seq: 1, title: 'Farm Gate Loading Bay', instruction: 'Load cargo at farm facility', subtext: 'Dispatch ready', status: 'upcoming' },
        { seq: 2, title: 'Highway NH-160 Express', instruction: 'Follow direct truck corridor', subtext: 'Clear passage', status: 'upcoming' },
        { seq: 3, title: 'Mumbai Terminal Dock 2', instruction: 'Unload at retail reception platform', subtext: 'Awaiting arrival', status: 'upcoming' }
      ]
    };

    setOrders([newOrder, ...orders]);
    setBookings([newBooking, ...bookings]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    setConsumerSubScreen('payment');
    showToast('order', 'Order Placed Successfully!', `Order ${newOrder.orderNumber} confirmed. ₹${paid.toLocaleString()} locked in escrow.`);
    return newOrder;
  };

  const acceptBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'accepted' } : b))
    );
    setActiveTripId(bookingId);
    setLogisticsTab('activetrip');
    showToast('success', 'Booking Accepted!', 'Head over to Active Trip for turn-by-turn navigation & pickup checklist.');
  };

  const declineBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'declined' } : b))
    );
    showToast('info', 'Booking Declined', 'Booking passed to neighboring logistics partner.');
  };

  const toggleChecklistItem = (bookingId: string, checkId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          pickupChecklist: b.pickupChecklist.map(c =>
            c.id === checkId ? { ...c, checked: !c.checked } : c
          )
        };
      })
    );
  };

  const markPickedUp = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'in_transit',
          pickupChecklist: b.pickupChecklist.map(c => ({ ...c, checked: true }))
        };
      })
    );
    // Update matching order
    setOrders(prev =>
      prev.map(o => {
        if (o.status === 'ordered') {
          return {
            ...o,
            status: 'in_transit',
            timeline: o.timeline.map(t =>
              t.status === 'picked_up' || t.status === 'in_transit' ? { ...t, completed: true } : t
            )
          };
        }
        return o;
      })
    );
    showToast('success', 'Cargo Loaded & Picked Up!', 'Farm dispatch confirmed. Route navigation active to destination.');
  };

  const markDelivered = (bookingId: string) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'delivered' } : b))
    );
    // Update matching order
    setOrders(prev =>
      prev.map(o => {
        if (o.status === 'in_transit' || o.status === 'ordered') {
          return {
            ...o,
            status: 'delivered',
            amountPaid: o.grandTotal,
            amountPending: 0,
            timeline: o.timeline.map(t => ({ ...t, completed: true }))
          };
        }
        return o;
      })
    );
    showToast('success', 'Trip Completed!', `Payout ₹${targetBooking?.grossPayout.toLocaleString() || '1,200'} credited to your bank account.`);
  };

  const quickSwitchRole = (newRole: UserRole) => {
    setRole(newRole);
    setAuthStep('authenticated');
    if (newRole === 'farmer') {
      setFarmerTab('home');
      setFarmerSubScreen(null);
    } else if (newRole === 'consumer') {
      setConsumerTab('marketplace');
      setConsumerSubScreen(null);
    } else {
      setLogisticsTab('bookings');
      setLogisticsSubScreen(null);
    }
    showToast('info', `Switched to ${newRole.toUpperCase()} View`, `Browsing AgriConnect as a ${newRole}.`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        authStep,
        setAuthStep,
        userPhone,
        setUserPhone,
        crops,
        orders,
        bookings,
        cart,
        activeTripId,
        setActiveTripId,
        isLogisticsOnline,
        setIsLogisticsOnline,
        toast,
        showToast,
        dismissToast,
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
        selectedCropId,
        setSelectedCropId,
        selectedOrderId,
        setSelectedOrderId,
        addNewCrop,
        deleteCrop,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        createOrderFromCart,
        acceptBooking,
        declineBooking,
        toggleChecklistItem,
        markPickedUp,
        markDelivered,
        quickSwitchRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
