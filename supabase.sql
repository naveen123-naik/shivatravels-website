-- Enable Row Level Security (RLS) on all tables
-- Note: For a production app, restrict INSERT/UPDATE/DELETE on vehicles, destinations,
-- packages, coupons, drivers, and gallery items to authenticated admin users only.
-- For ease of development, these policies allow public access.

-- 1. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  "seatingCapacity" INTEGER NOT NULL,
  "luggageCapacity" TEXT,
  ac BOOLEAN NOT NULL,
  "fuelType" TEXT,
  "pricePerKm" NUMERIC NOT NULL,
  "driverAllowance" NUMERIC NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public write access to vehicles" ON vehicles FOR ALL USING (true);

-- 2. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT,
  distance NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  "startingFare" NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Allow public write access to destinations" ON destinations FOR ALL USING (true);

-- 3. TOUR PACKAGES TABLE
CREATE TABLE IF NOT EXISTS tour_packages (
  id TEXT PRIMARY KEY,
  destination TEXT NOT NULL,
  duration TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "placesCovered" TEXT[] NOT NULL DEFAULT '{}',
  "vehicleIncluded" TEXT NOT NULL,
  "hotelIncluded" BOOLEAN NOT NULL,
  "mealsIncluded" BOOLEAN NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to tour_packages" ON tour_packages FOR SELECT USING (true);
CREATE POLICY "Allow public write access to tour_packages" ON tour_packages FOR ALL USING (true);

-- 4. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT,
  rating NUMERIC NOT NULL,
  review TEXT NOT NULL,
  "tripDetails" TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public write access to reviews" ON reviews FOR ALL USING (true);

-- 5. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public write access to gallery_items" ON gallery_items FOR ALL USING (true);

-- 6. COUPONS TABLE
CREATE TABLE IF NOT EXISTS coupons (
  code TEXT PRIMARY KEY,
  "discountType" TEXT NOT NULL,
  value NUMERIC NOT NULL,
  "minBookingValue" NUMERIC NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to coupons" ON coupons FOR SELECT USING (true);
CREATE POLICY "Allow public write access to coupons" ON coupons FOR ALL USING (true);

-- 7. DRIVERS TABLE
CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  license TEXT NOT NULL,
  experience INTEGER NOT NULL,
  status TEXT NOT NULL,
  "assignedVehicle" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to drivers" ON drivers FOR SELECT USING (true);
CREATE POLICY "Allow public write access to drivers" ON drivers FOR ALL USING (true);

-- 8. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  "mobileNumber" TEXT NOT NULL,
  "pickupLocation" TEXT NOT NULL,
  destination TEXT NOT NULL,
  "pickupDate" TEXT NOT NULL,
  "pickupTime" TEXT NOT NULL,
  "returnDate" TEXT,
  "tripType" TEXT NOT NULL,
  passengers INTEGER NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "vehicleName" TEXT NOT NULL,
  "specialInstructions" TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  "bookingDate" TEXT NOT NULL,
  "estimatedFare" NUMERIC NOT NULL,
  "discountApplied" NUMERIC NOT NULL,
  "totalFare" NUMERIC NOT NULL,
  "couponCode" TEXT,
  favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public write access to bookings" ON bookings FOR ALL USING (true);


-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Vehicles Seed
INSERT INTO vehicles (id, name, category, image, "seatingCapacity", "luggageCapacity", ac, "fuelType", "pricePerKm", "driverAllowance", features, available)
VALUES
('v1', 'Suzuki Swift / Hyundai i10', 'Hatchback', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80', 4, '1 Large Bag', true, 'Petrol/CNG', 11, 300, ARRAY['Power Windows', 'USB Charger', 'Bluetooth Audio', 'Airbags'], true),
('v2', 'Suzuki Dzire / Toyota Etios', 'Sedan', 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop&q=80', 4, '2 Large Bags', true, 'Diesel/Petrol', 13, 350, ARRAY['Extra Legroom', 'Spacious Boot', 'Rear AC Vents', 'Charging Ports'], true),
('v3', 'Maruti Ertiga / Kia Carens', 'SUV', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80', 7, '3 Medium Bags', true, 'CNG/Diesel', 17, 400, ARRAY['Flexible Seating', 'Roof AC Vents', 'Dual Airbags', 'GPS Enabled'], true),
('v4', 'Toyota Innova Crysta', 'Luxury SUV', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80', 7, '4 Large Bags', true, 'Diesel', 21, 450, ARRAY['Premium Leather Seats', 'Captain Seats', 'Ambient Lighting', 'Superior Suspension'], true),
('v5', 'Force Tempo Traveller', 'Tempo Traveller', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80', 12, '8 Bags (Carrier Available)', true, 'Diesel', 26, 500, ARRAY['Pushback Seats', 'Individual AC Vents', 'LED TV & Music System', 'Spacious Aisle'], true),
('v6', 'Luxury Mini Bus', 'Mini Bus', 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80', 25, 'Under-bus Storage', true, 'Diesel', 38, 600, ARRAY['Reclining Seats', 'Ice Box Available', 'PA Mic System', 'Pneumatic Doors'], true)
ON CONFLICT (id) DO NOTHING;

-- Destinations Seed
INSERT INTO destinations (id, name, image, distance, duration, "startingFare")
VALUES
('d1', 'Tirupati', 'https://images.unsplash.com/photo-1600100397990-14b584043ee7?w=600&auto=format&fit=crop&q=80', 570, '10.5 hrs', 6270),
('d2', 'Srisailam', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80', 230, '5.5 hrs', 2530),
('d3', 'Visakhapatnam', 'https://images.unsplash.com/photo-1596422846543-75c6fc18a523?w=600&auto=format&fit=crop&q=80', 620, '11.5 hrs', 6820),
('d4', 'Araku Valley', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', 730, '13.5 hrs', 8030),
('d5', 'Vijayawada', 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80', 275, '5 hrs', 3025),
('d6', 'Hyderabad', 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=600&auto=format&fit=crop&q=80', 120, 'Local', 1500),
('d7', 'Goa', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', 650, '14 hrs', 7150),
('d8', 'Ooty', 'https://images.unsplash.com/photo-1589136777351-fdc9c9400c7e?w=600&auto=format&fit=crop&q=80', 850, '16.5 hrs', 9350),
('d9', 'Bangalore', 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80', 575, '9.5 hrs', 6325),
('d10', 'Chennai', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80', 630, '11 hrs', 6930)
ON CONFLICT (id) DO NOTHING;

-- Tour Packages Seed
INSERT INTO tour_packages (id, destination, duration, price, "placesCovered", "vehicleIncluded", "hotelIncluded", "mealsIncluded", image)
VALUES
('p1', 'Hyderabad to Tirupati Tempo Traveller', '3 Days / 2 Nights', 29999, ARRAY['Tirumala Temple', 'Padmavathi Temple', 'Sri Kalahasti Temple', 'Kapila Theertham'], 'Force Tempo Traveller', true, true, 'https://images.unsplash.com/photo-1600100397990-14b584043ee7?w=600&auto=format&fit=crop&q=80'),
('p2', 'Hyderabad to Shirdi Tempo Traveller', '3 Days / 2 Nights', 34999, ARRAY['Sai Baba Samadhi Temple', 'Dwarkamai', 'Chavadi', 'Shani Shingnapur'], 'Force Tempo Traveller', true, true, 'https://images.unsplash.com/photo-1602631985686-2bb0604191c4?w=600&auto=format&fit=crop&q=80'),
('p3', 'Hyderabad to Goa Tempo Traveller', '4 Days / 3 Nights', 39999, ARRAY['Calangute Beach', 'Baga Beach', 'Basilica of Bom Jesus', 'Fort Aguada'], 'Force Tempo Traveller', true, false, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'),
('p4', 'Hyderabad to Srisailam Tempo Traveller', '2 Days / 1 Night', 15999, ARRAY['Mallikarjuna Jyotirlinga Temple', 'Srisailam Dam', 'Patala Ganga', 'Sakshi Ganapathi Temple'], 'Force Tempo Traveller', true, true, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80'),
('p5', 'Hyderabad to Bangalore Tempo Traveller', '3 Days / 2 Nights', 32999, ARRAY['Bangalore Palace', 'Lalbagh Botanical Garden', 'Cubbon Park', 'Wonderla'], 'Force Tempo Traveller', true, true, 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80'),
('p6', 'Hyderabad to Ooty Tempo Traveller', '4 Days / 3 Nights', 45999, ARRAY['Ooty Lake', 'Doddabetta Peak', 'Botanical Gardens', 'Pykara Waterfalls'], 'Force Tempo Traveller', true, true, 'https://images.unsplash.com/photo-1589136777351-fdc9c9400c7e?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO NOTHING;

-- Reviews Seed
INSERT INTO reviews (id, name, photo, rating, review, "tripDetails", date)
VALUES
('r1', 'Naveen Naik', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80', 5, 'I had a good experience with Shiva Naik Car Travel Agent. The booking process was smooth, the vehicle was clean and well-maintained, and the driver was punctual, polite, and drove safely. The trip was comfortable, and the service was professional throughout. I would recommend Shiva Naik Car Travel Agent to anyone looking for reliable and affordable travel services.', 'Safe Journey • Professional Driver', '2026-07-12'),
('r2', 'Pathlavath Ramesh', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', 5, 'Shiva travels,Car was super clean and smell less too.rate also reasonable per k/m', 'Clean Car • Reasonable Rates', '2026-06-15'),
('r3', 'Pillunaik007 007', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', 5, 'Excellent performance driver is very senior and safe journey 100% train pickup and drop very super', 'Safe Journey • Punctual Service', '2026-05-10'),
('r4', 'Sainath Haravath', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80', 5, 'Good car and good service this shiva naik travels😻', 'Good Car • Excellent Service', '2026-04-20'),
('r5', 'KETHAVATH REDYA', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80', 5, 'Nice car. Driver behaviour good.', 'Nice Car • Friendly Driver', '2026-03-01')
ON CONFLICT (id) DO NOTHING;

-- Gallery Items Seed
INSERT INTO gallery_items (id, category, image, title)
VALUES
('g1', 'Cars', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop&q=80', 'Premium Sedan Fleet'),
('g2', 'Places', 'https://images.unsplash.com/photo-1600100397990-14b584043ee7?w=600&auto=format&fit=crop&q=80', 'Tirupati Temple Hilltop'),
('g3', 'Customers', 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80', 'Happy Family Vacation'),
('g4', 'Roads', 'https://images.unsplash.com/photo-1547841243-eacb14453cd9?w=600&auto=format&fit=crop&q=80', 'Scenic Mountain Highway'),
('g5', 'Cars', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80', 'SUV Ready for Outstation'),
('g6', 'Places', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80', 'Srisailam Dam Overlook')
ON CONFLICT (id) DO NOTHING;

-- Coupons Seed
INSERT INTO coupons (code, "discountType", value, "minBookingValue", description)
VALUES
('WELCOME10', 'percentage', 10, 1000, 'Get 10% off on your first trip with us! (Max discount ₹500)'),
('FESTIVAL500', 'fixed', 500, 4000, 'Flat ₹500 off on long outstation round trips.'),
('TEMPLE200', 'fixed', 200, 2000, 'Special discount for holy temple tours.')
ON CONFLICT (code) DO NOTHING;

-- Drivers Seed
INSERT INTO drivers (id, name, mobile, license, experience, status, "assignedVehicle")
VALUES
('d1', 'M. Rama Rao', '9848099881', 'AP09DL12345', 8, 'Available', 'Toyota Innova Crysta'),
('d2', 'K. Chandra Shekhar', '9000128833', 'AP10DL67890', 12, 'On Duty', 'Force Tempo Traveller'),
('d3', 'P. Yadagiri', '8123488112', 'AP11DL11223', 5, 'Leave', NULL)
ON CONFLICT (id) DO NOTHING;

-- Bookings Seed
INSERT INTO bookings (id, "fullName", "mobileNumber", "pickupLocation", destination, "pickupDate", "pickupTime", "returnDate", "tripType", passengers, "vehicleId", "vehicleName", "specialInstructions", status, "bookingDate", "estimatedFare", "discountApplied", "totalFare", "couponCode", favorite)
VALUES
('SNT-78291', 'Ramesh Naidu', '9848022338', 'Kukatpally, Hyderabad', 'Tirupati Temple', '2026-07-15', '06:00', '2026-07-17', 'Round Trip', 5, 'v4', 'Toyota Innova Crysta', 'Need a senior-citizen friendly route and regular stops.', 'Approved', '2026-07-11T14:22:00Z', 24450, 500, 23950, 'FESTIVAL500', true),
('SNT-19284', 'Anjali Sharma', '8123456789', 'Gachibowli, Hyderabad', 'RGIA Airport', '2026-07-13', '03:30', NULL, 'Airport Drop', 2, 'v2', 'Suzuki Dzire / Toyota Etios', NULL, 'Completed', '2026-07-12T10:05:00Z', 1500, 150, 1350, 'WELCOME10', false),
('SNT-38290', 'Venkatesh Prasad', '9000123456', 'Secunderabad', 'Srisailam Temple', '2026-07-20', '05:00', NULL, 'One Way', 10, 'v5', 'Force Tempo Traveller', 'Wheelchair storage space required.', 'Pending', '2026-07-13T16:45:00Z', 6480, 0, 6480, NULL, false)
ON CONFLICT (id) DO NOTHING;
