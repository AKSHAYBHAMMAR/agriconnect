import { CropItem, OrderItem, LogisticsBooking, DemandForecast } from '../types';

export const INITIAL_CROPS: CropItem[] = [
  {
    id: 'crop-1',
    name: 'Sharbati Golden Wheat',
    variety: 'C-306 Traditional MP Gold',
    category: 'grain',
    pricePerUnit: 2450,
    unit: 'quintal',
    quantityAvailable: 85,
    initialQuantity: 100,
    location: 'Sehore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    sowingDate: '2026-05-18',
    cropAgeDays: 115,
    grade: 'Export',
    farmerName: 'Rameshwar Patel',
    farmerPhone: '+91 98261 44521',
    farmerRating: 4.9,
    farmerReviewsCount: 38,
    farmerDistanceKm: 14,
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'Prized Sharbati wheat grown in black cotton soil. Grain has a golden sheen, heavy texture, and high protein content with sweet chapati taste.',
    moisturePercentage: 10.4,
    organicCertified: true,
    harvestWindow: 'Ready for Immediate Dispatch'
  },
  {
    id: 'crop-2',
    name: 'Hybrid Roma Tomatoes',
    variety: 'Abhinav F1 High Solid',
    category: 'vegetable',
    pricePerUnit: 22,
    unit: 'kg',
    quantityAvailable: 1400,
    initialQuantity: 2000,
    location: 'Dindori, Nashik',
    state: 'Maharashtra',
    sowingDate: '2026-07-06',
    cropAgeDays: 66,
    grade: 'A+',
    farmerName: 'Kishore Bhausaheb Patil',
    farmerPhone: '+91 94222 18930',
    farmerRating: 4.8,
    farmerReviewsCount: 52,
    farmerDistanceKm: 8,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    description: 'Deep red, firm table tomatoes with thick rind and low moisture loss. Excellent shelf life for city retail and culinary processing.',
    moisturePercentage: 91.2,
    organicCertified: false,
    harvestWindow: 'Daily Fresh Picking'
  },
  {
    id: 'crop-3',
    name: 'Nashik Red Onions',
    variety: 'Bhima Super (Garwa Summer)',
    category: 'vegetable',
    pricePerUnit: 26,
    unit: 'kg',
    quantityAvailable: 3500,
    initialQuantity: 5000,
    location: 'Lasalgaon, Nashik',
    state: 'Maharashtra',
    sowingDate: '2026-06-15',
    cropAgeDays: 87,
    grade: 'A',
    farmerName: 'Sopanrao Jadhav',
    farmerPhone: '+91 98220 77123',
    farmerRating: 4.7,
    farmerReviewsCount: 44,
    farmerDistanceKm: 22,
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned Lasalgaon pungent red onions. Naturally cured in ventilated chawls, zero sprouting, firm layers suited for multi-week storage.',
    moisturePercentage: 12.1,
    organicCertified: false,
    harvestWindow: 'Cured & Ready to Transport'
  },
  {
    id: 'crop-4',
    name: 'Basmati Rice 1121 Pusa',
    variety: 'Extra Long Slender Grain',
    category: 'grain',
    pricePerUnit: 4200,
    unit: 'quintal',
    quantityAvailable: 120,
    initialQuantity: 150,
    location: 'Karnal, Haryana',
    state: 'Haryana',
    sowingDate: '2026-05-12',
    cropAgeDays: 121,
    grade: 'Export',
    farmerName: 'Gurpreet Singh Mann',
    farmerPhone: '+91 98120 55904',
    farmerRating: 4.95,
    farmerReviewsCount: 71,
    farmerDistanceKm: 34,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Aged 1121 Basmati paddy. Grain elongates to 22mm on cooking with natural floral aroma, low broken grains under 2%.',
    moisturePercentage: 11.0,
    organicCertified: true,
    harvestWindow: 'Season Stock Ready'
  },
  {
    id: 'crop-5',
    name: 'Bold Groundnut Kernels',
    variety: 'Kadiri-6 (Bold Oilseed)',
    category: 'oilseed',
    pricePerUnit: 68,
    unit: 'kg',
    quantityAvailable: 950,
    initialQuantity: 1200,
    location: 'Anantapur, Andhra Pradesh',
    state: 'Andhra Pradesh',
    sowingDate: '2026-06-01',
    cropAgeDays: 101,
    grade: 'A',
    farmerName: 'Venkatesh Naidu',
    farmerPhone: '+91 94401 33290',
    farmerRating: 4.6,
    farmerReviewsCount: 29,
    farmerDistanceKm: 19,
    imageUrl: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=800&q=80',
    description: 'Sun-dried high-oil groundnuts. Unblemished pods, uniform double-seed kernels with 48% oil yield, ideal for cold-press extraction.',
    moisturePercentage: 7.5,
    organicCertified: true,
    harvestWindow: 'Sun-dried in Bags'
  },
  {
    id: 'crop-6',
    name: 'Guntur Teja Red Chilli',
    variety: 'S-17 Teja Stemless',
    category: 'spice',
    pricePerUnit: 185,
    unit: 'kg',
    quantityAvailable: 420,
    initialQuantity: 500,
    location: 'Guntur, Andhra Pradesh',
    state: 'Andhra Pradesh',
    sowingDate: '2026-05-25',
    cropAgeDays: 108,
    grade: 'Export',
    farmerName: 'Subba Rao Chowdary',
    farmerPhone: '+91 98480 12781',
    farmerRating: 4.9,
    farmerReviewsCount: 63,
    farmerDistanceKm: 27,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: 'Fiery pungent Guntur chillies with bright red capsaicin sheen. Sun-cured on earthen yards without synthetic colors or chemicals.',
    moisturePercentage: 8.2,
    organicCertified: true,
    harvestWindow: 'Cured & Graded'
  },
  {
    id: 'crop-7',
    name: 'Long Staple BT Cotton',
    variety: 'Shankar-6 Premium Bales',
    category: 'fiber',
    pricePerUnit: 7100,
    unit: 'quintal',
    quantityAvailable: 45,
    initialQuantity: 60,
    location: 'Rajkot, Gujarat',
    state: 'Gujarat',
    sowingDate: '2026-05-02',
    cropAgeDays: 131,
    grade: 'A+',
    farmerName: 'Bharatbhai Vaghani',
    farmerPhone: '+91 98250 88201',
    farmerRating: 4.75,
    farmerReviewsCount: 31,
    farmerDistanceKm: 42,
    imageUrl: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=800&q=80',
    description: 'Clean, hand-picked seed cotton with 29mm fiber length. Free of trash and leaf bits, ready for ginning and textile mill dispatch.',
    moisturePercentage: 8.0,
    organicCertified: false,
    harvestWindow: 'Baled & Weighed'
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-8094',
    orderNumber: 'AG-8094',
    cropId: 'crop-2',
    cropName: 'Hybrid Roma Tomatoes',
    variety: 'Abhinav F1 High Solid',
    quantity: 250,
    unit: 'kg',
    pricePerUnit: 22,
    cropTotal: 5500,
    transportTotal: 1200,
    farmerTransportShare: 300, // 25%
    buyerTransportShare: 900,  // 75%
    grandTotal: 6400,          // 5500 + 900
    paymentType: 'split_50',
    amountPaid: 3200,          // 50% paid
    amountPending: 3200,       // remaining 50% upon delivery
    status: 'in_transit',
    consumerName: 'Pooja Sharma (GreenMart)',
    consumerPhone: '+91 98710 44219',
    deliveryAddress: 'GreenMart Warehouse, Sector 18, Vashi APMC, Navi Mumbai',
    farmerName: 'Kishore Bhausaheb Patil',
    farmerLocation: 'Dindori Farm Cluster, Nashik',
    farmerPhone: '+91 94222 18930',
    logisticsPartnerName: 'Ramesh Verma (Mahindra Bolero)',
    logisticsPhone: '+91 98901 22894',
    vehicleNumber: 'MH-15-EG-4412',
    vehicleType: 'Mahindra Bolero Maxi Truck (1.7T)',
    etaMinutes: 42,
    createdAt: 'Today, 08:30 AM',
    timeline: [
      {
        status: 'ordered',
        label: 'Order Placed',
        description: 'Order confirmed by buyer via AgriConnect',
        time: 'Today, 08:30 AM',
        completed: true
      },
      {
        status: 'paid',
        label: '50% Advance Escrowed',
        description: '₹3,200 locked securely in AgriConnect Escrow',
        time: 'Today, 08:35 AM',
        completed: true
      },
      {
        status: 'picked_up',
        label: 'Picked Up at Farm',
        description: 'Quantity & quality verified at Dindori Farm',
        time: 'Today, 10:15 AM',
        completed: true
      },
      {
        status: 'in_transit',
        label: 'In Transit to Mumbai',
        description: 'Driver Ramesh Verma on Mumbai-Agra Highway',
        time: 'Today, 11:40 AM',
        completed: true
      },
      {
        status: 'delivered',
        label: 'Hub Delivery & Final 50%',
        description: 'Pending delivery confirmation and final balance settlement',
        time: 'Est. 02:30 PM',
        completed: false
      }
    ]
  },
  {
    id: 'ord-8102',
    orderNumber: 'AG-8102',
    cropId: 'crop-3',
    cropName: 'Nashik Red Onions',
    variety: 'Bhima Super',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 26,
    cropTotal: 13000,
    transportTotal: 1800,
    farmerTransportShare: 450,
    buyerTransportShare: 1350,
    grandTotal: 14350,
    paymentType: 'split_50',
    amountPaid: 7175,
    amountPending: 7175,
    status: 'ordered',
    consumerName: 'Amit Saxena (FreshDirect Hub)',
    consumerPhone: '+91 99201 55431',
    deliveryAddress: 'Gala 44, APMC Market Yard, Pune Highway, Hadapsar',
    farmerName: 'Sopanrao Jadhav',
    farmerLocation: 'Lasalgaon Chawls, Nashik',
    farmerPhone: '+91 98220 77123',
    createdAt: 'Today, 11:15 AM',
    timeline: [
      {
        status: 'ordered',
        label: 'Order Placed',
        description: 'Awaiting farmer dispatch confirmation',
        time: 'Today, 11:15 AM',
        completed: true
      },
      {
        status: 'paid',
        label: 'Payment Verified',
        description: 'Advance received in escrow',
        time: 'Today, 11:20 AM',
        completed: true
      },
      {
        status: 'picked_up',
        label: 'Awaiting Truck Assignment',
        description: 'Logistics partner matching in progress',
        time: 'Pending',
        completed: false
      },
      {
        status: 'in_transit',
        label: 'Transit',
        description: 'Pending route start',
        time: 'Pending',
        completed: false
      },
      {
        status: 'delivered',
        label: 'Delivery & Final Settlement',
        description: 'Pending completion',
        time: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'ord-8088',
    orderNumber: 'AG-8088',
    cropId: 'crop-4',
    cropName: 'Basmati Rice 1121 Pusa',
    variety: 'Extra Long Slender',
    quantity: 15,
    unit: 'quintal',
    pricePerUnit: 4200,
    cropTotal: 63000,
    transportTotal: 4000,
    farmerTransportShare: 1000,
    buyerTransportShare: 3000,
    grandTotal: 66000,
    paymentType: 'full_100',
    amountPaid: 66000,
    amountPending: 0,
    status: 'delivered',
    consumerName: 'Delhi Heritage Caterers',
    consumerPhone: '+91 98111 88902',
    deliveryAddress: 'Warehouse 9, Azadpur Mandi Ring Road, New Delhi',
    farmerName: 'Gurpreet Singh Mann',
    farmerLocation: 'Karnal Wheat Depot, Haryana',
    farmerPhone: '+91 98120 55904',
    logisticsPartnerName: 'Harjit Logistics (Tata 407)',
    logisticsPhone: '+91 98104 77210',
    vehicleNumber: 'HR-45-B-9912',
    vehicleType: 'Tata 407 Pickup (2.5T)',
    createdAt: 'Yesterday, 04:00 PM',
    timeline: [
      {
        status: 'ordered',
        label: 'Order Placed',
        description: 'Order confirmed with 100% full payment',
        time: 'Yesterday, 04:00 PM',
        completed: true
      },
      {
        status: 'paid',
        label: 'Full Payment Cleared',
        description: '₹66,000 paid via UPI',
        time: 'Yesterday, 04:05 PM',
        completed: true
      },
      {
        status: 'picked_up',
        label: 'Loaded at Farm Silo',
        description: 'Quality tested & loaded in Karnal',
        time: 'Yesterday, 06:30 PM',
        completed: true
      },
      {
        status: 'in_transit',
        label: 'Highway Transit',
        description: 'Arrived at GT Karnal bypass',
        time: 'Yesterday, 09:10 PM',
        completed: true
      },
      {
        status: 'delivered',
        label: 'Delivered & Payout Released',
        description: 'Farmer received ₹62,000 net after ₹1,000 transport share',
        time: 'Yesterday, 11:30 PM',
        completed: true
      }
    ]
  }
];

export const INITIAL_BOOKINGS: LogisticsBooking[] = [
  {
    id: 'trip-402',
    bookingNumber: 'TR-402',
    pickupLocation: {
      title: 'Dindori Tomato Farm Cluster',
      farmName: 'Patil Agro Orchards',
      district: 'Nashik',
      state: 'Maharashtra',
      contactPhone: '+91 94222 18930'
    },
    dropLocation: {
      title: 'Vashi APMC Central Terminal',
      hubName: 'GreenMart Wholesale Dock 4',
      district: 'Navi Mumbai',
      state: 'Maharashtra',
      contactPhone: '+91 98710 44219'
    },
    cropName: 'Hybrid Roma Tomatoes',
    quantity: 250,
    unit: 'kg',
    distanceKm: 168,
    estHours: '3 hrs 45 mins',
    grossPayout: 1200,
    farmerShareDeduction: 300,  // 25%
    buyerShareContribution: 900, // 75%
    status: 'in_transit',
    vehicleRecommended: 'Tata Ace / Bolero Pickup',
    pickupChecklist: [
      { id: 'c1', label: 'Weighment bridge slip verified (250 kg crates)', checked: true },
      { id: 'c2', label: 'Crate stacking tarp tied firmly', checked: true },
      { id: 'c3', label: 'E-way bill & AgriConnect manifest QR scanned', checked: true },
      { id: 'c4', label: 'Farm gate dispatch OTP verified with Kishore Patil', checked: true }
    ],
    routeWaypoints: [
      { seq: 1, title: 'Dindori Farm Gate', instruction: 'Start route heading South toward Nashik bypass', subtext: 'Dispatched at 10:15 AM', status: 'done' },
      { seq: 2, title: 'Kasara Ghat Descent (NH 160)', instruction: 'Maintain low gear on steep curves with tomato load', subtext: 'Cleared at 11:45 AM', status: 'done' },
      { seq: 3, title: 'Bhiwandi Bypass Junction', instruction: 'Keep right for Eastern Express Highway connection', subtext: 'Current position — Smooth traffic', status: 'current' },
      { seq: 4, title: 'Vashi APMC Toll Gate', instruction: 'Proceed to Commercial Gate 3 for unloading bay', subtext: 'ETA 28 mins (42 km remaining)', status: 'upcoming' }
    ]
  },
  {
    id: 'trip-405',
    bookingNumber: 'TR-405',
    pickupLocation: {
      title: 'Lasalgaon Onion Yard #12',
      farmName: 'Jadhav Farms Chawl',
      district: 'Nashik',
      state: 'Maharashtra',
      contactPhone: '+91 98220 77123'
    },
    dropLocation: {
      title: 'Hadapsar Sub-Mandi APMC',
      hubName: 'FreshDirect Hub Yard',
      district: 'Pune',
      state: 'Maharashtra',
      contactPhone: '+91 99201 55431'
    },
    cropName: 'Nashik Red Onions',
    quantity: 500,
    unit: 'kg',
    distanceKm: 215,
    estHours: '4 hrs 50 mins',
    grossPayout: 1800,
    farmerShareDeduction: 450,
    buyerShareContribution: 1350,
    status: 'available',
    vehicleRecommended: 'Mahindra Bolero Maxi Truck',
    pickupChecklist: [
      { id: 'c1', label: '50kg jute bags counted (10 bags total)', checked: false },
      { id: 'c2', label: 'Moisture dry test & bag seals intact', checked: false },
      { id: 'c3', label: 'Digital weight match within ±1%', checked: false },
      { id: 'c4', label: 'Farmer dispatch OTP verified', checked: false }
    ],
    routeWaypoints: [
      { seq: 1, title: 'Lasalgaon Chawl Loading Yard', instruction: 'Pickup at Gate 2 near weighbridge', subtext: '10 bags awaiting pickup', status: 'upcoming' },
      { seq: 2, title: 'Nashik-Pune Highway (NH 60)', instruction: 'Smooth 4-lane stretch via Sangamner', subtext: 'Estimated 2 hrs 10 mins', status: 'upcoming' },
      { seq: 3, title: 'Hadapsar APMC Market Gate 4', instruction: 'Unload at FreshDirect Platform B', subtext: 'Unloading team ready', status: 'upcoming' }
    ]
  },
  {
    id: 'trip-409',
    bookingNumber: 'TR-409',
    pickupLocation: {
      title: 'Sehore Organic Grain Silos',
      farmName: 'Patel Agro Estate',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      contactPhone: '+91 98261 44521'
    },
    dropLocation: {
      title: 'Karond Mandi Bulk Hub',
      hubName: 'Bhopal Agro Processing Unit',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      contactPhone: '+91 98260 11902'
    },
    cropName: 'Sharbati Golden Wheat',
    quantity: 20,
    unit: 'quintal',
    distanceKm: 46,
    estHours: '1 hr 15 mins',
    grossPayout: 1550,
    farmerShareDeduction: 387,
    buyerShareContribution: 1163,
    status: 'available',
    vehicleRecommended: 'Eicher Pro / Tata 407',
    pickupChecklist: [
      { id: 'c1', label: 'Verify 20 quintal sealed silos bags', checked: false },
      { id: 'c2', label: 'Rain waterproof tarpaulin double tied', checked: false },
      { id: 'c3', label: 'Driver safety inspection completed', checked: false }
    ],
    routeWaypoints: [
      { seq: 1, title: 'Sehore Farm Silo', instruction: 'Load at warehouse loading ramp', subtext: 'Pickup ready', status: 'upcoming' },
      { seq: 2, title: 'Bhopal Bypass SH 18', instruction: 'Direct highway entry without city congestion', subtext: 'ETA 45 mins', status: 'upcoming' },
      { seq: 3, title: 'Karond Mandi Gate 1', instruction: 'Direct ramp entry to Bay 12', subtext: 'Forklift unloading available', status: 'upcoming' }
    ]
  }
];

export const DEMAND_FORECASTS: DemandForecast[] = [
  {
    cropName: 'Hybrid Roma Tomatoes',
    variety: 'Abhinav F1',
    currentAvgPrice: 22,
    recommendedPrice: 26,
    demandChangePct: 18.4,
    demandLevel: 'Surge',
    tip: 'Tomato demand surging +18% next week due to regional festival demand in Mumbai & Pune markets. Recommended to hold harvest 4 days or list at ₹26/kg.',
    dataPoints: [
      { period: 'Week 1', price: 18, demandIndex: 62 },
      { period: 'Week 2', price: 19, demandIndex: 68 },
      { period: 'Week 3 (Now)', price: 22, demandIndex: 82 },
      { period: 'Week 4 (Proj)', price: 26, demandIndex: 96 },
      { period: 'Week 5 (Proj)', price: 27, demandIndex: 91 }
    ]
  },
  {
    cropName: 'Nashik Red Onions',
    variety: 'Bhima Super',
    currentAvgPrice: 26,
    recommendedPrice: 29,
    demandChangePct: 12.0,
    demandLevel: 'High',
    tip: 'Export procurement tenders open next Tuesday. Hold ventilated storage to realize ₹29–₹31/kg in APMC terminals.',
    dataPoints: [
      { period: 'Week 1', price: 22, demandIndex: 70 },
      { period: 'Week 2', price: 24, demandIndex: 75 },
      { period: 'Week 3 (Now)', price: 26, demandIndex: 84 },
      { period: 'Week 4 (Proj)', price: 29, demandIndex: 92 },
      { period: 'Week 5 (Proj)', price: 30, demandIndex: 88 }
    ]
  },
  {
    cropName: 'Sharbati Golden Wheat',
    variety: 'C-306 MP Gold',
    currentAvgPrice: 2450,
    recommendedPrice: 2580,
    demandChangePct: 7.5,
    demandLevel: 'Moderate',
    tip: 'Flour mills are booking forward contracts at ₹2,580/quintal. Transport availability is high this week.',
    dataPoints: [
      { period: 'Week 1', price: 2380, demandIndex: 72 },
      { period: 'Week 2', price: 2400, demandIndex: 74 },
      { period: 'Week 3 (Now)', price: 2450, demandIndex: 80 },
      { period: 'Week 4 (Proj)', price: 2540, demandIndex: 85 },
      { period: 'Week 5 (Proj)', price: 2580, demandIndex: 89 }
    ]
  },
  {
    cropName: 'Basmati Rice 1121 Pusa',
    variety: 'Export Grade',
    currentAvgPrice: 4200,
    recommendedPrice: 4350,
    demandChangePct: 9.2,
    demandLevel: 'High',
    tip: 'Middle East export shipment vessels docked in Gujarat ports. Millers paying immediate spot cash premium.',
    dataPoints: [
      { period: 'Week 1', price: 4050, demandIndex: 68 },
      { period: 'Week 2', price: 4120, demandIndex: 75 },
      { period: 'Week 3 (Now)', price: 4200, demandIndex: 83 },
      { period: 'Week 4 (Proj)', price: 4310, demandIndex: 90 },
      { period: 'Week 5 (Proj)', price: 4350, demandIndex: 92 }
    ]
  }
];
