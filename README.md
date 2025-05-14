# Atlas Technosoft Website

Enterprise solutions for digital transformation.

## Project Structure

This project follows a modular and scalable architecture designed for maintainability and future expansion:

```
/
├── app/                      # Next.js App Router (pages, layouts, route handlers)
│   ├── (auth)/               # Auth-related pages (grouped routes)
│   ├── (marketing)/          # Marketing pages (grouped routes) 
│   ├── api/                  # API route handlers
│   └── [...other routes]     # Other page routes
├── components/               # UI Components
│   ├── ui/                   # Base UI components (shadcn/ui)
│   ├── common/               # Shared components used across multiple pages
│   │   ├── layout/           # Layout components (header, footer, navigation)
│   │   └── feedback/         # Feedback components (alerts, toasts)
│   └── features/             # Feature-specific components
│       ├── auth/             # Authentication components
│       ├── services/         # Service-related components
│       ├── careers/          # Career-related components
│       └── [...other features]
├── lib/                      # Core functionality
│   ├── api/                  # API client functions and utilities
│   ├── config/               # App configuration
│   ├── utils/                # Utility functions
│   │   ├── formatting/       # Data formatting utilities
│   │   ├── validation/       # Validation utilities
│   │   └── helpers/          # General helper functions
│   └── constants/            # App constants and enums
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
├── styles/                   # Global styles and theme definitions
├── public/                   # Static assets
└── scripts/                  # Build and development scripts
```

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm dev
   ```

## Building for Production

```
pnpm build:clean
```

For an optimized production build with asset optimization:

```
pnpm build:optimized
```

## Image Handling

The project includes robust image optimization:

- Use the `OptimizedImage` component from `components/ui/optimized-image.tsx` for best performance
- All images are properly sized, compressed, and served with modern formats
- Run `pnpm verify-images` to check for missing image references

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Helpful Scripts

- `pnpm typecheck`: Run TypeScript type checking
- `pnpm lint`: Run ESLint
- `pnpm build:clean`: Clean build
- `pnpm verify-images`: Verify all image references exist
- `pnpm analyze`: Analyze bundle size

## Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Use Next.js App Router for routing
- Follow the component structure outlined above
- Organize imports alphabetically
- Use named exports for better tree-shaking

## Project Structure Guidelines

### Components

- **UI Components**: Pure, reusable building blocks with minimal to no business logic
- **Common Components**: Shared components used across multiple features
- **Feature Components**: Components specific to a business feature or domain

### App Router

- Use route groups (folders with parentheses) to organize related routes without affecting the URL structure
- Implement layout components at appropriate levels for consistent UI
- Place page-specific components within their respective page directories

### Utilities

- Keep utility functions pure and focused on a single responsibility
- Organize utilities by domain or functionality
- Document complex utility functions with JSDoc comments

### Hooks

- Custom hooks should follow the React hooks naming convention (`use*`)
- Each hook should have a single responsibility
- Include TypeScript types for parameters and return values 

## Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run tests: `pnpm typecheck` and `pnpm lint`
4. Verify image references: `pnpm verify-images`
5. Submit a pull request

## License

Copyright © 2024 Atlas Technosoft 