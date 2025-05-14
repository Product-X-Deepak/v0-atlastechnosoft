/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  eslint: {
    // Enable ESLint for proper checking
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
  typescript: {
    // Enable TypeScript checking
    ignoreBuildErrors: false,
  },

  // Image optimization configuration - enhanced for SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days caching for better performance
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance and caching - enhanced options
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
      'recharts',
      '@radix-ui/react-icons',
      'tailwind-merge',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
    ],
    optimisticClientCache: true,
    ppr: false, // Disable PPR to avoid issues
    taint: false, // Disable taint tracking (requires canary version)
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'INP', 'TTFB'], // Track all Core Web Vitals
    scrollRestoration: true,
    // Add turbo configuration to address webpack/turbopack compatibility
    turbo: {
      loaders: {
        '.css': ['style-loader', 'css-loader'],
        '.module.css': ['style-loader', 'css-loader', 'postcss-loader'],
      },
      rules: {
        // Add turbo-specific rules here
      },
    },
    // Enable memory cache for improved performance
    memoryBasedWorkersCount: true,
    // Additional performance optimizations
    isrFlushToDisk: true,
  },

  // Disable the X-Powered-By header for security
  poweredByHeader: false,

  // Strict mode for better dev experience
  reactStrictMode: true,

  // Better compression
  compress: true,

  // Fix timeout issues for sitemap.xml and robots.txt
  staticPageGenerationTimeout: 180, // Increase timeout to 3 minutes

  // Webpack configuration to fix chunk loading errors
  webpack: (config, { isServer, dev, webpack }) => {
    // Optimize chunking strategy
    if (!isServer) {
      // Add bundle analyzer if enabled
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }

      // Simplify the chunking strategy to reduce chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for node_modules
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
          },
          // Commons chunk for shared code
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
          // Separate framer-motion due to its size
          framer: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          // Separate radix UI components
          radix: {
            name: 'radix',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            chunks: 'all',
            priority: 25,
            enforce: true,
          },
          // Separate Three.js related code
          three: {
            name: 'three-js',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            chunks: 'all',
            priority: 35,
            enforce: true,
          },
        },
      };

      // Ensure stable chunk names
      config.output.chunkFilename = dev
        ? '[name].js'
        : '[name].[contenthash].js';

      // Limit the number of parallel requests
      config.optimization.runtimeChunk = {
        name: 'runtime',
      };
      
      // Improve tree-shaking
      if (!dev) {
        config.optimization.usedExports = true;
        config.optimization.providedExports = true;
        config.optimization.sideEffects = true;
        
        // Add ModuleConcatenationPlugin for scope hoisting
        config.optimization.concatenateModules = true;
      }
      
      // Add module prefetching plugin
      config.plugins.push(
        new webpack.AutomaticPrefetchPlugin()
      );
    }

    // Fix cache directory path - use absolute path for Windows compatibility
    if (config.cache && typeof config.cache === 'object') {
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        buildDependencies: config.cache.buildDependencies || {
          config: [new URL(import.meta.url).pathname],
        },
        cacheDirectory: path.resolve(__dirname, '.next', 'cache', 'webpack'),
      };
    }

    return config;
  },

  // Enhanced Security headers for SEO and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
          // Add Link header for preconnect to key domains
          {
            key: 'Link',
            value: '<https://www.google-analytics.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com>; rel=preconnect; crossorigin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable', // 30 days
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      // SEO-friendly caching for sitemaps and robots
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 day
          },
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 day
          },
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
      // Static assets caching
      {
        source: '/public/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable', // 30 days
          },
        ],
      },
      // JS/CSS files caching 
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
    ]
  },

  // Enhanced redirects for SEO - ensures proper canonical URLs
  async redirects() {
    return [
      // Redirect URLs with trailing slashes
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Redirect old service pages 
      {
        source: '/services',
        destination: '/about',
        permanent: true,
      },
      // Redirect shortened URLs to full canonical paths
      {
        source: '/sap',
        destination: '/sap-solutions/business-one',
        permanent: true,
      },
      {
        source: '/automation',
        destination: '/automation-solutions/rpa-solutions',
        permanent: true,
      },
      // Redirect old blog structure if it exists
      {
        source: '/blog/archive/:year/:month',
        destination: '/blog',
        permanent: true,
      },
      // Redirect missing service pages
      {
        source: '/services/consulting',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services/training',
        destination: '/about',
        permanent: true,
      },
      // Redirect lowercase to proper case URLs for consistency
      {
        source: '/sap-solutions/businessone',
        destination: '/sap-solutions/business-one',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/aboutus',
        destination: '/about',
        permanent: true,
      },
      // Additional redirects from previous config
      {
        source: '/sap-solutions/implementation',
        destination: '/sap-solutions/erp-planning',
        permanent: true,
      },
      {
        source: '/automation-solutions/consultation#team',
        destination: '/automation-solutions/consultation',
        permanent: true,
      },
      // New redirects for common variations
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/careers/:path*',
        has: [
          {
            type: 'query',
            key: 'ref',
            value: 'homepage',
          },
        ],
        destination: '/careers/:path*',
        permanent: false,
      },
      {
        source: '/industry/:path*',
        destination: '/industries/:path*',
        permanent: true,
      },
      {
        source: '/industries',
        destination: '/industries/manufacturing',
        permanent: false, 
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/contact-form',
        destination: '/contact/request-form',
        permanent: true,
      },
      // Redirects for problematic links found in validation
      {
        source: '/automation-solutions/ui-path#capabilities',
        destination: '/automation-solutions/ui-path',
        permanent: false,
      },
      {
        source: '/automation-solutions/ui-path#business-value',
        destination: '/automation-solutions/ui-path',
        permanent: false,
      },
      {
        source: '/contact/demo',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/resources/brochure',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/sap-solutions/business-one/boyum-it',
        destination: '/sap-solutions/business-one',
        permanent: false,
      },
      {
        source: '/sap-solutions/business-one-cloud/features',
        destination: '/sap-solutions/business-one-cloud',
        permanent: false,
      },
      {
        source: '/careers/life-at-atlas',
        destination: '/careers',
        permanent: false,
      },
      // Additional redirects for remaining problematic links
      {
        source: '/fonts/:path*',
        destination: '/fonts/:path*',
        permanent: false,
      },
    ]
  },

  // Rewrites for cleaner URLs and tracking
  async rewrites() {
    return [
      // Analytics proxy to respect GDPR
      {
        source: '/analytics/script.js',
        destination: 'https://www.googletagmanager.com/gtag/js',
      },
      // Canonical content URLs
      {
        source: '/contact',
        destination: '/contact',
      },
      {
        source: '/about',
        destination: '/about',
      },
      // API proxies for better security and performance
      {
        source: '/api/status',
        destination: '/api/performance-metrics/status',
      },
      // Clean URLs for blog posts
      {
        source: '/blog/:slug',
        destination: '/blog/[slug]',
      },
    ]
  },
}

export default nextConfig
