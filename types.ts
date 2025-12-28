
export type RoomType = 
  | 'Exclusive Room with Private Balcony'
  | 'Executive Suite (HITEC City View)'
  | 'Luxury Twin Room'
  | 'Deccan Premium King';

export interface GuestDetails {
  fullName: string;
  origin: string;
  address: string;
  purpose: string;
  cellNo: string;
  aadhaarNo: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  adults: number;
  children: number;
  childAges: number[];
  roomType?: RoomType;
  guestDetails?: GuestDetails;
  addOns: {
    airportTransfer: boolean;
    breakfastIncluded: boolean;
    earlyCheckIn: boolean;
  };
}

export interface ProximityPoint {
  name: string;
  distance: string;
  type: 'business' | 'leisure';
}

export interface WeatherData {
  temp: number;
  condition: string;
  trafficStatus: 'Low' | 'Moderate' | 'Heavy';
}
