import postgres from 'postgres';

let connString = process.env.DATABASE_URL;

if (connString && connString.includes('supabase.co')) {
  // Supabase recommends port 6543 (connection pooler) for serverless and Next.js environments.
  // Port 5432 (direct connection) frequently results in CONNECT_TIMEOUT or connection exhaustion.
  if (connString.includes(':5432')) {
    connString = connString.replace(':5432', ':6543');
  } else if (!connString.includes(':6543')) {
    try {
      const url = new URL(connString);
      if (url.port === '5432' || !url.port) {
        url.port = '6543';
        connString = url.toString();
      }
    } catch {
      // Fallback if URL parsing fails
      connString = connString.replace(':5432', ':6543');
    }
  }
}

// Declare global variable for hot-reload caching in Next.js development
declare global {
  var sql: ReturnType<typeof postgres> | undefined;
}

let sqlInstance: ReturnType<typeof postgres> | null = null;

if (connString) {
  if (process.env.NODE_ENV === 'production') {
    sqlInstance = postgres(connString, {
      ssl: connString.includes('supabase') || connString.includes('localhost') ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 3,
      onnotice: () => {},
    });
  } else {
    // Reuse connection pool across hot reloads in development to prevent connection leaks
    if (!globalThis.sql) {
      globalThis.sql = postgres(connString, {
        ssl: connString.includes('supabase') || connString.includes('localhost') ? { rejectUnauthorized: false } : undefined,
        max: 10,
        idle_timeout: 20,
        connect_timeout: 3,
        onnotice: () => {},
      });
    }
    sqlInstance = globalThis.sql;
  }
}

export const sql = sqlInstance;

// Cache connection check result to prevent blocking API routes when database is down
let lastCheckTime = 0;
let cachedIsConnected = false;
const CACHE_DURATION_MS = 30000; // Cache connection status for 30 seconds

/**
 * Checks if the PostgreSQL database is configured and reachable
 */
export async function checkDbConnection(): Promise<boolean> {
  if (!sql) return false;

  const now = Date.now();
  if (now - lastCheckTime < CACHE_DURATION_MS) {
    return cachedIsConnected;
  }

  try {
    // Run a quick query to test connection
    await sql`SELECT 1`;
    cachedIsConnected = true;
    lastCheckTime = now;
    return true;
  } catch (e) {
    console.error('PostgreSQL Connection Test Failed:', e);
    cachedIsConnected = false;
    lastCheckTime = now; // Cache the failure to avoid spamming connection attempts
    return false;
  }
}
