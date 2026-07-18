import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || 'shiva123';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'shiva@123';

    if (
      username &&
      username.toLowerCase() === expectedUsername.toLowerCase() &&
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
