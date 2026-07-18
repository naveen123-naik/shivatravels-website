export interface Vehicle {
  id: string;
  name: string;
  category: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury SUV' | 'Tempo Traveller' | 'Mini Bus';
  image: string;
  seatingCapacity: number;
  luggageCapacity: string;
  ac: boolean;
  fuelType: string;
  pricePerKm: number;
  driverAllowance: number;
  features: string[];
  available: boolean;
}

export interface Review {
  id: string;
  name: string;
  photo: string;
  rating: number;
  review: string;
  tripDetails: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  category: 'Cars' | 'Places' | 'Customers' | 'Roads';
  image: string;
  title: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  distance: number; // in km
  duration: string; // e.g. "3.5 hrs"
  startingFare: number;
}

export const defaultVehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Suzuki Swift / Hyundai i10',
    category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 4,
    luggageCapacity: '1 Large Bag',
    ac: true,
    fuelType: 'Petrol/CNG',
    pricePerKm: 11,
    driverAllowance: 300,
    features: ['Power Windows', 'USB Charger', 'Bluetooth Audio', 'Airbags'],
    available: true,
  },
  {
    id: 'v2',
    name: 'Suzuki Dzire / Toyota Etios',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 4,
    luggageCapacity: '2 Large Bags',
    ac: true,
    fuelType: 'Diesel/Petrol',
    pricePerKm: 13,
    driverAllowance: 350,
    features: ['Extra Legroom', 'Spacious Boot', 'Rear AC Vents', 'Charging Ports'],
    available: true,
  },
  {
    id: 'v3',
    name: 'Maruti Ertiga / Kia Carens',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 7,
    luggageCapacity: '3 Medium Bags',
    ac: true,
    fuelType: 'CNG/Diesel',
    pricePerKm: 17,
    driverAllowance: 400,
    features: ['Flexible Seating', 'Roof AC Vents', 'Dual Airbags', 'GPS Enabled'],
    available: true,
  },
  {
    id: 'v4',
    name: 'Toyota Innova Crysta',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 7,
    luggageCapacity: '4 Large Bags',
    ac: true,
    fuelType: 'Diesel',
    pricePerKm: 21,
    driverAllowance: 450,
    features: ['Premium Leather Seats', 'Captain Seats', 'Ambient Lighting', 'Superior Suspension'],
    available: true,
  },
  {
    id: 'v5',
    name: 'Force Tempo Traveller',
    category: 'Tempo Traveller',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 12,
    luggageCapacity: '8 Bags (Carrier Available)',
    ac: true,
    fuelType: 'Diesel',
    pricePerKm: 26,
    driverAllowance: 500,
    features: ['Pushback Seats', 'Individual AC Vents', 'LED TV & Music System', 'Spacious Aisle'],
    available: true,
  },
  {
    id: 'v6',
    name: 'Luxury Mini Bus',
    category: 'Mini Bus',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80',
    seatingCapacity: 25,
    luggageCapacity: 'Under-bus Storage',
    ac: true,
    fuelType: 'Diesel',
    pricePerKm: 38,
    driverAllowance: 600,
    features: ['Reclining Seats', 'Ice Box Available', 'PA Mic System', 'Pneumatic Doors'],
    available: true,
  },
];

export const defaultDestinations: Destination[] = [
  {
    id: 'd1',
    name: 'Tirupati',
    image: 'https://images.unsplash.com/photo-1600100397990-14b584043ee7?w=600&auto=format&fit=crop&q=80',
    distance: 570,
    duration: '10.5 hrs',
    startingFare: 6270,
  },
  {
    id: 'd2',
    name: 'Srisailam',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
    distance: 230,
    duration: '5.5 hrs',
    startingFare: 2530,
  },
  {
    id: 'd3',
    name: 'Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a523?w=600&auto=format&fit=crop&q=80',
    distance: 620,
    duration: '11.5 hrs',
    startingFare: 6820,
  },
  {
    id: 'd4',
    name: 'Araku Valley',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    distance: 730,
    duration: '13.5 hrs',
    startingFare: 8030,
  },
  {
    id: 'd5',
    name: 'Vijayawada',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
    distance: 275,
    duration: '5 hrs',
    startingFare: 3025,
  },
  {
    id: 'd6',
    name: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=600&auto=format&fit=crop&q=80',
    distance: 120, // Assume local trip distance or starting point
    duration: 'Local',
    startingFare: 1500,
  },
  {
    id: 'd7',
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    distance: 650,
    duration: '14 hrs',
    startingFare: 7150,
  },
  {
    id: 'd8',
    name: 'Ooty',
    image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9400c7e?w=600&auto=format&fit=crop&q=80',
    distance: 850,
    duration: '16.5 hrs',
    startingFare: 9350,
  },
  {
    id: 'd9',
    name: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80',
    distance: 575,
    duration: '9.5 hrs',
    startingFare: 6325,
  },
  {
    id: 'd10',
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
    distance: 630,
    duration: '11 hrs',
    startingFare: 6930,
  },
];



export const defaultReviews: Review[] = [
  {
    id: 'r1',
    name: 'Naveen Naik',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'I had a good experience with Shiva Naik Car Travel Agent. The booking process was smooth, the vehicle was clean and well-maintained, and the driver was punctual, polite, and drove safely. The trip was comfortable, and the service was professional throughout. I would recommend Shiva Naik Car Travel Agent to anyone looking for reliable and affordable travel services.',
    tripDetails: 'Safe Journey • Professional Driver',
    date: '2026-07-12',
  },
  {
    id: 'r2',
    name: 'Pathlavath Ramesh',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Shiva travels,Car was super clean and smell less too.rate also reasonable per k/m',
    tripDetails: 'Clean Car • Reasonable Rates',
    date: '2026-06-15',
  },
  {
    id: 'r3',
    name: 'Pillunaik007 007',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Excellent performance driver is very senior and safe journey 100% train pickup and drop very super',
    tripDetails: 'Safe Journey • Punctual Service',
    date: '2026-05-10',
  },
  {
    id: 'r4',
    name: 'Sainath Haravath',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Good car and good service this shiva naik travels😻',
    tripDetails: 'Good Car • Excellent Service',
    date: '2026-04-20',
  },
  {
    id: 'r5',
    name: 'KETHAVATH REDYA',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Nice car. Driver behaviour good.',
    tripDetails: 'Nice Car • Friendly Driver',
    date: '2026-03-01',
  }
];

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'g-new1',
    category: 'Cars',
    image: '/gallery/white_ertiga.png',
    title: 'Suzuki Ertiga (TS 32 U 0086)',
  },
  {
    id: 'g-new2',
    category: 'Cars',
    image: '/gallery/blue_ertiga.png',
    title: 'Suzuki Ertiga (TS 07 U J 6236)',
  },
  {
    id: 'g-new3',
    category: 'Customers',
    image: '/gallery/driver_selfie.jpg',
    title: 'Happy Journey with Shiva & Tours',
  },
  {
    id: 'g1',
    category: 'Cars',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80',
    title: 'Premium Sedan Fleet',
  },
  {
    id: 'g2',
    category: 'Places',
    image: 'https://images.unsplash.com/photo-1600100397990-14b584043ee7?w=600&auto=format&fit=crop&q=80',
    title: 'Tirupati Temple Hilltop',
  },
  {
    id: 'g3',
    category: 'Customers',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80',
    title: 'Happy Family Vacation',
  },
  {
    id: 'g4',
    category: 'Roads',
    image: 'https://images.unsplash.com/photo-1547841243-eacb14453cd9?w=600&auto=format&fit=crop&q=80',
    title: 'Scenic Mountain Highway',
  },
  {
    id: 'g5',
    category: 'Cars',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80',
    title: 'SUV Ready for Outstation',
  },
  {
    id: 'g6',
    category: 'Places',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
    title: 'Srisailam Dam Overlook',
  },
];


export interface Driver {
  id: string;
  name: string;
  mobile: string;
  license: string;
  experience: number;
  status: 'Available' | 'On Duty' | 'Leave';
  assignedVehicle?: string;
}

export const defaultDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'M. Rama Rao',
    mobile: '9848099881',
    license: 'AP09DL12345',
    experience: 8,
    status: 'Available',
    assignedVehicle: 'Toyota Innova Crysta'
  },
  {
    id: 'd2',
    name: 'K. Chandra Shekhar',
    mobile: '9000128833',
    license: 'AP10DL67890',
    experience: 12,
    status: 'On Duty',
    assignedVehicle: 'Force Tempo Traveller'
  },
  {
    id: 'd3',
    name: 'P. Yadagiri',
    mobile: '8123488112',
    license: 'AP11DL11223',
    experience: 5,
    status: 'Leave'
  }
];

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read';
}

export const defaultContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Ramesh Kumar',
    phone: '9876543210',
    email: 'ramesh@gmail.com',
    message: 'I want to book an outstation trip to Tirupati for 3 days next week. Please send details.',
    date: '2026-07-15T10:30:00Z',
    status: 'Unread'
  },
  {
    id: 'msg-2',
    name: 'Anjali Sharma',
    phone: '8765432109',
    email: 'anjali@yahoo.com',
    message: 'Are there AC and non-AC options available for the Tempo Traveller? What is the pricing difference?',
    date: '2026-07-14T14:20:00Z',
    status: 'Read'
  }
];

