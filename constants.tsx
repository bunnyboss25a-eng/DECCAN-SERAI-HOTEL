
import React from 'react';
import { ProximityPoint, RoomType } from './types';

export const COLORS = {
  royalBlue: '#002366',
  emerald: '#50C878',
  gold: '#C5A059',
  white: '#FFFFFF',
  slate: '#F8FAFC'
};

// Curated high-resolution hospitality imagery
export const HOTEL_ASSETS = {
  exterior: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000',
  lobby: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000',
  bedroom: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2000',
  restaurant: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2000',
  buffet: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
  courtyard: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=2000',
  bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
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
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
    description: 'Breathe in the HITEC City air from your private lush balcony.',
    features: ['Private Balcony', 'Emerald Garden View', 'Butterfly-soft Linens']
  },
  {
    id: 2,
    name: 'Executive Suite (HITEC City View)',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    description: 'Unparalleled panoramic views of the Cyber Towers skyline.',
    features: ['Panoramic Windows', 'Business Lounge Access', 'High-speed Wi-Fi 6']
  },
  {
    id: 3,
    name: 'Luxury Twin Room',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1200',
    description: 'Perfect for business pairs or families visiting the city.',
    features: ['Dual Master Beds', 'Work Station', 'Premium Minibar']
  },
  {
    id: 4,
    name: 'Deccan Premium King',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    description: 'The pinnacle of Deccan luxury with an oversized King bed.',
    features: ['King Size Bed', 'Smart TV with Streaming', 'Soaking Tub']
  }
];
