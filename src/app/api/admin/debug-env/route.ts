import { NextResponse } from 'next/server';

export async function GET() {
  const u = process.env.ADMIN_USERNAME || '';
  const p = process.env.ADMIN_PASSWORD || '';

  return NextResponse.json({
    ADMIN_USERNAME: {
      exists: process.env.ADMIN_USERNAME !== undefined,
      length: u.length,
      firstChar: u.slice(0, 1),
      lastChar: u.slice(-1),
      hasQuotes: u.startsWith('"') && u.endsWith('"'),
    },
    ADMIN_PASSWORD: {
      exists: process.env.ADMIN_PASSWORD !== undefined,
      length: p.length,
      firstChar: p.slice(0, 1),
      lastChar: p.slice(-1),
      hasQuotes: p.startsWith('"') && p.endsWith('"'),
    }
  });
}
