
import React from 'react';
import { ProximityPoint, RoomType } from './types';

export const COLORS = {
  royalBlue: '#002366',
  emerald: '#50C878',
  gold: '#C5A059',
  white: '#FFFFFF',
  slate: '#F8FAFC'
};

/**
 * DECCAN SERAI - AUTHENTIC VISUAL ASSETS
 * These images are curated to match the real-world look of Deccan Serai HITEC City:
 * - Tall, white modern urban facade (as seen in Maps)
 * - Signature "Flavors" restaurant lighting
 * - Premium executive wood and teal interiors
 */
export const HOTEL_ASSETS = {
  // Exterior - Specific tall, white modern building to match the Deccan Serai HITEC City tower
  exterior: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2000',
  
  // Entrance & Lobby - Matching the grey marble and glass-heavy urban entrance
  entrance: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000',
  lobby: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
  
  // Public Spaces
  courtyard: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000',
  lounge: 'https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&q=80&w=2000',
  
  // Rooms & Suites - Matching the specific executive wooden headboards and teal accents
  bedroom: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=2000', 
  balcony_room: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=2000',
  suite_room: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2000',
  twin_room: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=2000',
  king_room: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2000',
  
  // Dining - Reflecting the warm, golden "Flavors" restaurant ambiance
  restaurant: 'https://images.unsplash.com/photo-1550966841-3ee3ad05903b?auto=format&fit=crop&q=80&w=2000',
  buffet: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000'
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
    image: HOTEL_ASSETS.balcony_room,
    description: 'Breathe in the HITEC City air from your private lush balcony with signature wooden interiors.',
    features: ['Private Balcony', 'Emerald Garden View', 'Butterfly-soft Linens']
  },
  {
    id: 2,
    name: 'Executive Suite (HITEC City View)',
    price: 12500,
    image: HOTEL_ASSETS.suite_room,
    description: 'Unparalleled panoramic views of the Cyber Towers skyline through floor-to-ceiling glass.',
    features: ['Panoramic Windows', 'Business Lounge Access', 'High-speed Wi-Fi 6']
  },
  {
    id: 3,
    name: 'Luxury Twin Room',
    price: 7200,
    image: HOTEL_ASSETS.twin_room,
    description: 'Perfect for business pairs, featuring two master beds and a dedicated ergonomic workstation.',
    features: ['Dual Master Beds', 'Work Station', 'Premium Minibar']
  },
  {
    id: 4,
    name: 'Deccan Premium King',
    price: 9800,
    image: HOTEL_ASSETS.king_room,
    description: 'Experience the pinnacle of Deccan luxury with an oversized King bed and warm mood lighting.',
    features: ['King Size Bed', 'Smart TV with Streaming', 'Soaking Tub']
  }
];
