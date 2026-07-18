import { NextResponse } from 'next/server';
import { sql, checkDbConnection } from '@/lib/db';
import { defaultGalleryItems } from '@/data/defaultMockData';

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
    let items = await sql`
      SELECT id, category, image, title 
      FROM gallery_items 
      ORDER BY created_at DESC, id DESC
    `;

    // Automatically seed database with default gallery items if it's empty and has never been seeded before
    await sql`
      CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `;

    const seedCheck = await sql`SELECT value FROM system_settings WHERE key = 'seeded_gallery'`;
    const isSeeded = seedCheck.length > 0 && seedCheck[0].value === 'true';

    if (items.length === 0 && !isSeeded) {
      console.log('Seeding PostgreSQL gallery_items table with default items...');
      for (const item of defaultGalleryItems) {
        await sql`
          INSERT INTO gallery_items (id, title, category, image)
          VALUES (${item.id}, ${item.title}, ${item.category}, ${item.image})
          ON CONFLICT (id) DO NOTHING
        `;
      }
      await sql`
        INSERT INTO system_settings (key, value)
        VALUES ('seeded_gallery', 'true')
        ON CONFLICT (key) DO UPDATE SET value = 'true'
      `;
      items = await sql`
        SELECT id, category, image, title 
        FROM gallery_items 
        ORDER BY created_at DESC, id DESC
      `;
    }

    return NextResponse.json({ 
      success: true, 
      databaseConfigured: true, 
      data: items 
    });
  } catch (error: any) {
    console.error('Failed to fetch gallery items from PostgreSQL:', error);
    return NextResponse.json({ 
      success: false, 
      databaseConfigured: true, 
      error: error.message || 'Database error occurred' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ 
      success: false, 
      databaseConfigured: false, 
      error: 'PostgreSQL database not configured or offline' 
    }, { status: 503 });
  }

  try {
    const { id, title, category, image } = await request.json();
    
    if (!title || !category || !image) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: title, category, or image' 
      }, { status: 400 });
    }

    const itemId = id || `g${Date.now()}`;

    await sql`
      INSERT INTO gallery_items (id, title, category, image)
      VALUES (${itemId}, ${title}, ${category}, ${image})
      ON CONFLICT (id) DO UPDATE 
      SET title = EXCLUDED.title, 
          category = EXCLUDED.category, 
          image = EXCLUDED.image
    `;

    return NextResponse.json({ 
      success: true, 
      data: { id: itemId, title, category, image } 
    });
  } catch (error: any) {
    console.error('Failed to save gallery item to PostgreSQL:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Database error occurred' 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isConnected = await checkDbConnection();
  if (!isConnected || !sql) {
    return NextResponse.json({ 
      success: false, 
      databaseConfigured: false, 
      error: 'PostgreSQL database not configured or offline' 
    }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required parameter: id' 
      }, { status: 400 });
    }

    await sql`
      DELETE FROM gallery_items 
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete gallery item from PostgreSQL:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Database error occurred' 
    }, { status: 500 });
  }
}
