import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { webcrypto } from 'crypto';

// Define the type for chunk error data
interface ChunkErrorData {
  chunkId: string;
  timestamp: string;
  path: string;
  userAgent: string;
  error: string;
  message?: string;
  url?: string;
}

// Define the type for sanitized error data
interface SanitizedErrorData extends ChunkErrorData {
  clientIp: string;
  id: string;
}

// Rate limiting state (in-memory for simplicity)
const rateLimitState: Record<string, { count: number; resetAt: number }> = {};

/**
 * POST handler for chunk error logging
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Extract client IP for rate limiting
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Apply rate limiting
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'Too many error reports' },
      { status: 429 }
    );
  }
  
  // Parse error data
  let errorData: ChunkErrorData;
  try {
    errorData = await request.json();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  } catch (_) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
  
  // Validate required fields
  if (!errorData.chunkId || !errorData.timestamp) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Sanitize and format error data
  const sanitizedData: SanitizedErrorData = {
    ...errorData,
    chunkId: String(errorData.chunkId).slice(0, 100),
    timestamp: errorData.timestamp || new Date().toISOString(),
    userAgent: (errorData.userAgent || request.headers.get('user-agent') || 'unknown').slice(0, 500),
    error: (errorData.error || 'Unknown error').slice(0, 1000),
    path: (errorData.path || request.headers.get('referer') || 'unknown').slice(0, 500),
    clientIp: clientIp,
    id: generateId()
  };
  
  // Log error data to stdout for cloud environments
  console.error('[CHUNK ERROR]', JSON.stringify(sanitizedData));
  
  // In development, also log to file
  if (process.env.NODE_ENV === 'development') {
    await logToFile(sanitizedData);
  }
  
  // Return success
  return NextResponse.json({ status: 'ok' });
}

/**
 * Generate a unique ID for the error
 */
function generateId(): string {
  if (typeof webcrypto.randomUUID === 'function') {
    return webcrypto.randomUUID();
  }
  
  // Fallback for environments without randomUUID
  const bytes = new Uint8Array(16);
  webcrypto.getRandomValues(bytes);
  
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Apply rate limiting based on client IP
 */
function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const limit = 10; // Max 10 errors per minute
  const windowMs = 60000; // 1 minute
  
  // Initialize or reset state if expired
  if (!rateLimitState[clientIp] || rateLimitState[clientIp].resetAt < now) {
    rateLimitState[clientIp] = {
      count: 1,
      resetAt: now + windowMs
    };
    return true;
  }
  
  // Check if limit exceeded
  if (rateLimitState[clientIp].count >= limit) {
    return false;
  }
  
  // Increment counter
  rateLimitState[clientIp].count++;
  return true;
}

/**
 * Log error to file in development environment
 */
async function logToFile(data: SanitizedErrorData): Promise<void> {
  try {
    const logDir = path.join(process.cwd(), '.next', 'logs');
    
    // Create log directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Determine log file path
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logDir, `chunk-errors-${today}.json`);
    
    // Read existing logs or initialize empty array
    let logs: SanitizedErrorData[] = [];
    if (fs.existsSync(logFile)) {
      const content = fs.readFileSync(logFile, 'utf-8');
      try {
        logs = JSON.parse(content);
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (_) {
        // If file is corrupted, start fresh
        logs = [];
      }
    }
    
    // Add new log entry
    logs.push({
      ...data,
      loggedAt: new Date().toISOString()
    } as SanitizedErrorData & { loggedAt: string });
    
    // Limit log size
    if (logs.length > 1000) {
      logs = logs.slice(logs.length - 1000);
    }
    
    // Write back to file
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Failed to write chunk error log to file:', error);
  }
} 