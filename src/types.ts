export type UserRole = 'farmer' | 'consumer' | 'logistics';

export type CropCategory = 'grain' | 'vegetable' | 'pulse' | 'oilseed' | 'fiber' | 'spice';

export interface CropItem {
  id: string;
  name: string;
  variety: string;
  category: CropCategory;
  pricePerUnit: number;
  unit: 'kg' | 'quintal';
  quantityAvailable: number;
  initialQuantity: number;
  location: string;
  state: string;
  sowingDate: string;
  cropAgeDays: number;
  grade: 'A+' | 'A' | 'B' | 'Export';
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  farmerReviewsCount: number;
  farmerDistanceKm: number;
  imageUrl: string;
  description: string;
  moisturePercentage: number;
  organicCertified: boolean;
  harvestWindow: string;
}

export type OrderStatus = 'ordered' | 'paid' | 'picked_up' | 'in_transit' | 'delivered';
export type PaymentType = 'split_50' | 'full_100';

export interface OrderItem {
  id: string;
  orderNumber: string;
  cropId: string;
  cropName: string;
  variety: string;
  quantity: number;
  unit: 'kg' | 'quintal';
  pricePerUnit: number;
  cropTotal: number;
  transportTotal: number;
  farmerTransportShare: number; // 25% (1/4)
  buyerTransportShare: number;  // 75% (3/4)
  grandTotal: number;
  paymentType: PaymentType;
  amountPaid: number;
  amountPending: number;
  status: OrderStatus;
  consumerName: string;
  consumerPhone: string;
  deliveryAddress: string;
  farmerName: string;
  farmerLocation: string;
  farmerPhone: string;
  logisticsPartnerName?: string;
  logisticsPhone?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  etaMinutes?: number;
  timeline: {
    status: OrderStatus;
    label: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
  createdAt: string;
}

export interface LogisticsBooking {
  id: string;
  bookingNumber: string;
  pickupLocation: {
    title: string;
    farmName: string;
    district: string;
    state: string;
    contactPhone: string;
  };
  dropLocation: {
    title: string;
    hubName: string;
    district: string;
    state: string;
    contactPhone: string;
  };
  cropName: string;
  quantity: number;
  unit: 'kg' | 'quintal';
  distanceKm: number;
  estHours: string;
  grossPayout: number;
  farmerShareDeduction: number; // 25% of freight
  buyerShareContribution: number; // 75% of freight
  status: 'available' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'declined';
  vehicleRecommended: string;
  pickupChecklist: {
    id: string;
    label: string;
    checked: boolean;
  }[];
  routeWaypoints: {
    seq: number;
    title: string;
    instruction: string;
    subtext: string;
    status: 'upcoming' | 'current' | 'done';
  }[];
}

export interface DemandForecast {
  cropName: string;
  variety: string;
  currentAvgPrice: number;
  recommendedPrice: number;
  demandChangePct: number;
  demandLevel: 'Surge' | 'High' | 'Moderate';
  tip: string;
  dataPoints: {
    period: string;
    price: number;
    demandIndex: number; // 0 - 100
  }[];
}

export interface CartItem {
  crop: CropItem;
  quantity: number;
}
