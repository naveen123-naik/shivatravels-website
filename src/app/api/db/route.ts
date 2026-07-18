import { NextResponse } from 'next/server';
import { sql, checkDbConnection } from '@/lib/db';
import { 
  defaultVehicles, 
  defaultDestinations, 
  defaultReviews, 
  defaultGalleryItems, 
  defaultDrivers, 
  defaultContactMessages
} from '@/data/defaultMockData';

// Type casting mappers to ensure numeric database values are parsed back to JS Numbers
const mapVehicle = (v: any) => ({
  ...v,
  seatingCapacity: Number(v.seatingCapacity),
  pricePerKm: Number(v.pricePerKm),
  driverAllowance: Number(v.driverAllowance)
});

const mapDestination = (d: any) => ({
  ...d,
  distance: Number(d.distance),
  startingFare: Number(d.startingFare)
});

const mapReview = (r: any) => ({
  ...r,
  rating: Number(r.rating)
});

const mapDriver = (d: any) => ({
  ...d,
  experience: Number(d.experience)
});

const mapMessage = (m: any) => ({
  ...m
});

// Auto-seed database tables if they are empty on startup
// Auto-seed database tables if they are empty on startup
async function ensureSeeded() {
  const db = sql;
  if (!db) return;

  // Create system_settings table if it doesn't exist
  await db`
    CREATE TABLE IF NOT EXISTS system_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;

  // Ensure contact_messages table exists
  await db`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unread',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Helper functions to check and mark table seeding status
  const isTableSeeded = async (key: string): Promise<boolean> => {
    const res = await db`SELECT value FROM system_settings WHERE key = ${key}`;
    return res.length > 0 && res[0].value === 'true';
  };

  const markTableSeeded = async (key: string) => {
    await db`
      INSERT INTO system_settings (key, value)
      VALUES (${key}, 'true')
      ON CONFLICT (key) DO UPDATE SET value = 'true'
    `;
  };

  // 1. Vehicles
  if (!(await isTableSeeded('seeded_vehicles'))) {
    const vehiclesCount = await db`SELECT count(*)::int as count FROM vehicles`;
    if (vehiclesCount[0].count === 0) {
      console.log('Seeding vehicles table...');
      for (const v of defaultVehicles) {
        await db`
          INSERT INTO vehicles (id, name, category, image, "seatingCapacity", "luggageCapacity", ac, "fuelType", "pricePerKm", "driverAllowance", features, available)
          VALUES (${v.id}, ${v.name}, ${v.category}, ${v.image}, ${v.seatingCapacity}, ${v.luggageCapacity}, ${v.ac}, ${v.fuelType}, ${v.pricePerKm}, ${v.driverAllowance}, ${v.features}, ${v.available})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_vehicles');
  }

  // 2. Destinations
  if (!(await isTableSeeded('seeded_destinations'))) {
    const destCount = await db`SELECT count(*)::int as count FROM destinations`;
    if (destCount[0].count === 0) {
      console.log('Seeding destinations table...');
      for (const d of defaultDestinations) {
        await db`
          INSERT INTO destinations (id, name, image, distance, duration, "startingFare")
          VALUES (${d.id}, ${d.name}, ${d.image}, ${d.distance}, ${d.duration}, ${d.startingFare})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_destinations');
  }



  // 4. Reviews
  if (!(await isTableSeeded('seeded_reviews'))) {
    const reviewsCount = await db`SELECT count(*)::int as count FROM reviews`;
    if (reviewsCount[0].count === 0) {
      console.log('Seeding reviews table...');
      for (const r of defaultReviews) {
        await db`
          INSERT INTO reviews (id, name, photo, rating, review, "tripDetails", date)
          VALUES (${r.id}, ${r.name}, ${r.photo}, ${r.rating}, ${r.review}, ${r.tripDetails}, ${r.date})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_reviews');
  }

  // 5. Gallery Items
  if (!(await isTableSeeded('seeded_gallery'))) {
    const galleryCount = await db`SELECT count(*)::int as count FROM gallery_items`;
    if (galleryCount[0].count === 0) {
      console.log('Seeding gallery_items table...');
      for (const g of defaultGalleryItems) {
        await db`
          INSERT INTO gallery_items (id, category, image, title)
          VALUES (${g.id}, ${g.category}, ${g.image}, ${g.title})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_gallery');
  }



  // 7. Drivers
  if (!(await isTableSeeded('seeded_drivers'))) {
    const driversCount = await db`SELECT count(*)::int as count FROM drivers`;
    if (driversCount[0].count === 0) {
      console.log('Seeding drivers table...');
      for (const d of defaultDrivers) {
        await db`
          INSERT INTO drivers (id, name, mobile, license, experience, status, "assignedVehicle")
          VALUES (${d.id}, ${d.name}, ${d.mobile}, ${d.license}, ${d.experience}, ${d.status}, ${d.assignedVehicle || null})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_drivers');
  }



  // 9. Contact Messages
  if (!(await isTableSeeded('seeded_messages'))) {
    const messagesCount = await db`SELECT count(*)::int as count FROM contact_messages`;
    if (messagesCount[0].count === 0) {
      console.log('Seeding contact_messages table...');
      for (const m of defaultContactMessages) {
        await db`
          INSERT INTO contact_messages (id, name, phone, email, message, date, status)
          VALUES (${m.id}, ${m.name}, ${m.phone}, ${m.email}, ${m.message}, ${m.date}, ${m.status})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }
    await markTableSeeded('seeded_messages');
  }
}

export async function GET() {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ 
      success: false, 
      databaseConfigured: false, 
      error: 'PostgreSQL database not configured or offline' 
    });
  }

  try {
    // Make sure tables are created and seeded if empty
    await ensureSeeded();

    // Query all tables in parallel
    const [
      vehiclesRaw,
      destinationsRaw,
      reviewsRaw,
      galleryRaw,
      driversRaw,
      messagesRaw
    ] = await Promise.all([
      sql`SELECT * FROM vehicles ORDER BY id ASC`,
      sql`SELECT * FROM destinations ORDER BY id ASC`,
      sql`SELECT * FROM reviews ORDER BY date DESC, id DESC`,
      sql`SELECT * FROM gallery_items ORDER BY created_at DESC, id DESC`,
      sql`SELECT * FROM drivers ORDER BY id ASC`,
      sql`SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC`
    ]);

    // Format & map results back to expected client-side types
    const data = {
      vehicles: vehiclesRaw.map(mapVehicle),
      destinations: destinationsRaw.map(mapDestination),
      reviews: reviewsRaw.map(mapReview),
      gallery: galleryRaw,
      drivers: driversRaw.map(mapDriver),
      messages: messagesRaw.map(mapMessage)
    };

    return NextResponse.json({ 
      success: true, 
      databaseConfigured: true, 
      data 
    });
  } catch (error: any) {
    console.error('Failed to fetch data from PostgreSQL:', error);
    return NextResponse.json({ 
      success: false, 
      databaseConfigured: true, 
      error: error.message || 'Database fetch error' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ success: false, error: 'Database offline' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { entity, data } = body;

    if (!entity || !data) {
      return NextResponse.json({ success: false, error: 'Missing entity or data' }, { status: 400 });
    }

    switch (entity) {
      case 'vehicles': {
        const v = data;
        const result = await sql`
          INSERT INTO vehicles (id, name, category, image, "seatingCapacity", "luggageCapacity", ac, "fuelType", "pricePerKm", "driverAllowance", features, available)
          VALUES (${v.id}, ${v.name}, ${v.category}, ${v.image}, ${v.seatingCapacity}, ${v.luggageCapacity}, ${v.ac}, ${v.fuelType}, ${v.pricePerKm}, ${v.driverAllowance}, ${v.features}, ${v.available})
          RETURNING *
        `;
        return NextResponse.json({ success: true, data: mapVehicle(result[0]) });
      }
      case 'reviews': {
        const r = data;
        const result = await sql`
          INSERT INTO reviews (id, name, photo, rating, review, "tripDetails", date)
          VALUES (${r.id}, ${r.name}, ${r.photo}, ${r.rating}, ${r.review}, ${r.tripDetails}, ${r.date})
          RETURNING *
        `;
        return NextResponse.json({ success: true, data: mapReview(result[0]) });
      }
      case 'drivers': {
        const dr = data;
        const result = await sql`
          INSERT INTO drivers (id, name, mobile, license, experience, status, "assignedVehicle")
          VALUES (${dr.id}, ${dr.name}, ${dr.mobile}, ${dr.license}, ${dr.experience}, ${dr.status}, ${dr.assignedVehicle || null})
          RETURNING *
        `;
        return NextResponse.json({ success: true, data: mapDriver(result[0]) });
      }
      case 'messages': {
        const m = data;
        const result = await sql`
          INSERT INTO contact_messages (id, name, phone, email, message, date, status)
          VALUES (${m.id}, ${m.name}, ${m.phone}, ${m.email}, ${m.message}, ${m.date}, ${m.status})
          RETURNING *
        `;
        return NextResponse.json({ success: true, data: mapMessage(result[0]) });
      }
      case 'gallery': {
        const g = data;
        const result = await sql`
          INSERT INTO gallery_items (id, category, image, title)
          VALUES (${g.id}, ${g.category}, ${g.image}, ${g.title})
          RETURNING *
        `;
        return NextResponse.json({ success: true, data: result[0] });
      }
      default:
        return NextResponse.json({ success: false, error: 'Unknown entity' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Failed to create item in PostgreSQL:', error);
    return NextResponse.json({ success: false, error: error.message || 'Database create error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ success: false, error: 'Database offline' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { entity, data } = body;

    if (!entity || !data) {
      return NextResponse.json({ success: false, error: 'Missing entity or data' }, { status: 400 });
    }

    switch (entity) {
      case 'vehicles': {
        const v = data;
        await sql`
          UPDATE vehicles 
          SET name = ${v.name}, category = ${v.category}, image = ${v.image}, "seatingCapacity" = ${v.seatingCapacity}, "luggageCapacity" = ${v.luggageCapacity}, ac = ${v.ac}, "fuelType" = ${v.fuelType}, "pricePerKm" = ${v.pricePerKm}, "driverAllowance" = ${v.driverAllowance}, features = ${v.features}, available = ${v.available}
          WHERE id = ${v.id}
        `;
        return NextResponse.json({ success: true });
      }
      case 'drivers': {
        const dr = data;
        await sql`
          UPDATE drivers 
          SET name = ${dr.name}, mobile = ${dr.mobile}, license = ${dr.license}, experience = ${dr.experience}, status = ${dr.status}, "assignedVehicle" = ${dr.assignedVehicle || null}
          WHERE id = ${dr.id}
        `;
        return NextResponse.json({ success: true });
      }
      case 'messages': {
        const m = data;
        await sql`
          UPDATE contact_messages 
          SET name = ${m.name}, phone = ${m.phone}, email = ${m.email}, message = ${m.message}, date = ${m.date}, status = ${m.status}
          WHERE id = ${m.id}
        `;
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ success: false, error: 'Unknown entity' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Failed to update item in PostgreSQL:', error);
    return NextResponse.json({ success: false, error: error.message || 'Database update error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ success: false, error: 'Database offline' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get('entity');
    const id = searchParams.get('id');

    if (!entity || !id) {
      return NextResponse.json({ success: false, error: 'Missing entity or id' }, { status: 400 });
    }

    switch (entity) {
      case 'vehicles':
        await sql`DELETE FROM vehicles WHERE id = ${id}`;
        break;

      case 'drivers':
        await sql`DELETE FROM drivers WHERE id = ${id}`;
        break;
      case 'messages':
        await sql`DELETE FROM contact_messages WHERE id = ${id}`;
        break;
      case 'gallery':
        await sql`DELETE FROM gallery_items WHERE id = ${id}`;
        break;
      default:
        return NextResponse.json({ success: false, error: 'Unknown entity' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete item from PostgreSQL:', error);
    return NextResponse.json({ success: false, error: error.message || 'Database delete error' }, { status: 500 });
  }
}
