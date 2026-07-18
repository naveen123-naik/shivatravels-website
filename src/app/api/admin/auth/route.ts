import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    let expectedUsername = (process.env.ADMIN_USERNAME || 'shiva123').trim();
    let expectedPassword = (process.env.ADMIN_PASSWORD || 'shiva@123').trim();

    console.log('[Auth Debug] Received:', { username, passwordLength: password?.length });
    console.log('[Auth Debug] Env status:', {
      ADMIN_USERNAME_defined: process.env.ADMIN_USERNAME !== undefined,
      ADMIN_PASSWORD_defined: process.env.ADMIN_PASSWORD !== undefined,
      ADMIN_USERNAME_raw: process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD_raw: process.env.ADMIN_PASSWORD,
    });

    // Strip surrounding double quotes if present (common copy-paste issue)
    if (expectedUsername.startsWith('"') && expectedUsername.endsWith('"')) {
      expectedUsername = expectedUsername.slice(1, -1);
    }
    if (expectedPassword.startsWith('"') && expectedPassword.endsWith('"')) {
      expectedPassword = expectedPassword.slice(1, -1);
    }

    if (
      username &&
      username.toLowerCase().trim() === expectedUsername.toLowerCase() &&
      password === expectedPassword
    ) {
      return NextResponse.json({ success: true });
    }

    // Determine if we are using custom credentials from environment
    const isUsingCustomCredentials = 
      process.env.ADMIN_USERNAME !== undefined || 
      process.env.ADMIN_PASSWORD !== undefined;

    const errorMsg = isUsingCustomCredentials
      ? 'Invalid username or password.'
      : 'Invalid username or password. (Hint: shiva123 / shiva@123)';

    return NextResponse.json({ success: false, error: errorMsg }, { status: 401 });
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json({ success: false, error: 'Authentication service error' }, { status: 500 });
  }
}
