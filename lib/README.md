# Library

This directory contains core functionality, utilities, and configurations used throughout the application.

## Subdirectories

- **api/**: API client functions and utilities for interacting with backend services
- **config/**: Application configuration, including environment-specific settings
- **utils/**: Utility functions organized by domain
  - **formatting/**: Utilities for formatting data (dates, currency, etc.)
  - **validation/**: Utilities for validating data
  - **helpers/**: General helper functions
- **constants/**: Application constants and enums

## Guidelines

- Avoid UI components or React hooks in this directory
- Keep functions pure and focused on a single responsibility
- Use TypeScript for better type safety and developer experience
- Document functions with JSDoc comments 