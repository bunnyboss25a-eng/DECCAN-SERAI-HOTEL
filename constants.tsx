
import React from 'react';
import { ProximityPoint, RoomType } from './types';

export const COLORS = {
  royalBlue: '#002366',
  emerald: '#50C878',
  gold: '#C5A059',
  white: '#FFFFFF',
  slate: '#F8FAFC'
};

// Centralized Asset Registry based on user provided photos
export const HOTEL_ASSETS = {
  exterior: '/exterior-night.jpg',
  lobby: '/lobby-main.jpg',
  bedroom: '/bedroom-premium.jpg',
  restaurant: '/restaurant-interior.jpg',
  buffet: '/buffet-spread.jpg',
  courtyard: '/courtyard-pool.jpg',
  bathroom: '/bathroom-modern.jpg' // Assuming one of the photos is the bathroom
};

export const ROOM_TYPES: RoomType[] = [
  'Exclusive Room with Private Balcony',
  'Executive Suite (HITEC City View)',
  'Luxury Twin Room',
  'Deccan Premium King'
];

export const PROXIMITY_GUIDE: ProximityPoint[] = [
  { name: 'Google Hyderabad', distance: '1.2 km', type: 'business' },
  { name: 'Microsoft Campus', distance: '2.5 km', type: 'business' },
  { name: 'DLF Cyber City', distance: '0.8 km', type: 'business' },
  { name: 'Inorbit Mall', distance: '3.1 km', type: 'leisure' },
  { name: 'IKEA Hyderabad', distance: '2.0 km', type: 'leisure' }
];

export const HOTEL_AMENITIES = [
  { name: 'Ultra-Fast WiFi', icon: 'fa-wifi', color: 'bg-blue-50 text-blue-500' },
  { name: 'LED Smart TV', icon: 'fa-tv', color: 'bg-purple-50 text-purple-500' },
  { name: 'Direct Dial Phone', icon: 'fa-phone-alt', color: 'bg-amber-50 text-amber-500' },
  { name: 'Hot & Cold Water', icon: 'fa-droplet', color: 'bg-cyan-50 text-cyan-500' },
  { name: 'Individual AC', icon: 'fa-snowflake', color: 'bg-indigo-50 text-indigo-500' },
  { name: 'Attached Washroom', icon: 'fa-bath', color: 'bg-emerald-50 text-emerald-500' },
  { name: 'Premium Toiletries', icon: 'fa-pump-soap', color: 'bg-rose-50 text-rose-500' },
  { name: 'Silent Ceiling Fans', icon: 'fa-fan', color: 'bg-teal-50 text-teal-500' }
];

export const ROOM_DETAILS = [
  {
    id: 1,
    name: 'Exclusive Room with Private Balcony',
    price: 8500,
    image: HOTEL_ASSETS.bedroom,
    description: 'Breathe in the HITEC City air from your private lush balcony.',
    features: ['Private Balcony', 'Emerald Garden View', 'Butterfly-soft Linens']
  },
  {
    id: 2,
    name: 'Executive Suite (HITEC City View)',
    price: 12500,
    image: HOTEL_ASSETS.bedroom, // Using the premium bedroom shot for suites
    description: 'Unparalleled panoramic views of the Cyber Towers skyline.',
    features: ['Panoramic Windows', 'Business Lounge Access', 'High-speed Wi-Fi 6']
  },
  {
    id: 3,
    name: 'Luxury Twin Room',
    price: 7200,
    image: HOTEL_ASSETS.bedroom, // Consistent theme
    description: 'Perfect for business pairs or families visiting the city.',
    features: ['Dual Master Beds', 'Work Station', 'Premium Minibar']
  },
  {
    id: 4,
    name: 'Deccan Premium King',
    price: 9800,
    image: HOTEL_ASSETS.bedroom,
    description: 'The pinnacle of Deccan luxury with an oversized King bed.',
    features: ['King Size Bed', 'Smart TV with Streaming', 'Soaking Tub']
  }
];