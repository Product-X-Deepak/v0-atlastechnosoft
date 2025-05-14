import { NextRequest, NextResponse } from 'next/server'

// Types for performance metrics
interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  page: string;
  href: string;
  eventTime: number;
  userAgent: string;
  networkInfo?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  deviceType: 'mobile' | 'tablet' | 'desktop';
  navigationType?: string;
}

/**
 * API route for collecting performance metrics
 * This endpoint receives performance data from the client
 * and can store it or forward it to an analytics service
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const metric: PerformanceMetric = await request.json()
    
    // Validate the metric data
    if (!metric || !metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }
    
    // Add timestamp if not provided
    if (!metric.eventTime) {
      metric.eventTime = Date.now()
    }
    
    // Log the metric data (in production we would save to a database)
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service, database, or logging system
      // This is a placeholder for actual implementation
      await logMetricToAnalytics(metric)
    } else {
      // In development, just log to console
      console.log('📊 Performance Metric:', {
        name: metric.name,
        value: metric.value,
        page: metric.page,
        device: metric.deviceType,
        network: metric.networkInfo?.effectiveType || 'unknown',
      })
    }
    
    // Return success response
    return NextResponse.json(
      { success: true },
      { 
        status: 200,
        headers: {
          // Cache control to prevent caching of this API endpoint
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    )
  } catch (error) {
    console.error('Error processing performance metric:', error)
    
    // Return error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET handler to provide API documentation
 */
export async function GET() {
  return NextResponse.json(
    {
      api: 'Performance Metrics API',
      version: '1.0',
      description: 'API for collecting Core Web Vitals and performance metrics',
      endpoints: {
        'POST /api/performance-metrics': {
          description: 'Submit performance metrics',
          bodyParams: {
            name: 'Metric name (CLS, LCP, FID, TTFB, etc.)',
            value: 'Metric value (number)',
            id: 'Unique identifier for the metric',
            page: 'Page URL path',
            href: 'Full page URL',
            eventTime: 'Timestamp when the metric was recorded',
            deviceType: 'Device type (mobile, tablet, desktop)',
            userAgent: 'User agent string',
            networkInfo: 'Network information (optional)',
            navigationType: 'Navigation type (optional)',
          },
        },
      },
    },
    { 
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      }
    }
  )
}

/**
 * Placeholder function for logging metrics to an analytics service
 * In a real application, this would send data to a database or analytics platform
 */
async function logMetricToAnalytics(metric: PerformanceMetric): Promise<void> {
  // This is a placeholder for actual implementation
  // In a real application, you would:
  
  // 1. Send to Google Analytics 4
  // if (typeof window !== 'undefined' && 'gtag' in window) {
  //   (window as any).gtag('event', 'web_vitals', {
  //     event_category: 'Web Vitals',
  //     event_label: metric.page,
  //     value: Math.round(metric.value),
  //     metric_id: metric.id,
  //     metric_name: metric.name,
  //     metric_value: metric.value,
  //     non_interaction: true,
  //   });
  // }
  
  // 2. Or send to a database like MongoDB/PostgreSQL/etc.
  // const db = await connectToDatabase();
  // await db.collection('performance_metrics').insertOne(metric);
  
  // 3. Or send to a logging/monitoring service like Datadog, New Relic, etc.
  // await fetch('https://api.newrelic.com/v1/metrics', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Api-Key': process.env.NEW_RELIC_API_KEY!,
  //   },
  //   body: JSON.stringify({
  //     metrics: [{
  //       name: `web_vitals.${metric.name.toLowerCase()}`,
  //       value: metric.value,
  //       timestamp: metric.eventTime,
  //       attributes: {
  //         page: metric.page,
  //         device: metric.deviceType,
  //         network: metric.networkInfo?.effectiveType || 'unknown',
  //       },
  //     }],
  //   }),
  // });
  
  // For now, just log to server console
  console.log(`[Server] Performance Metric: ${metric.name} = ${metric.value} on ${metric.page}`);
}

/**
 * Define allowed HTTP methods
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS'
    }
  })
} 