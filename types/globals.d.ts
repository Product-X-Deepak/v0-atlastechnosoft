// Global type definitions for various third-party libraries

// Type definitions for next/navigation
declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
  };
  export function useSearchParams(): URLSearchParams;
}

// Type definitions for next/link
declare module 'next/link' {
  import { ComponentProps, ReactNode } from 'react';
  
  type LinkProps = {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    children: ReactNode;
  } & ComponentProps<'a'>;
  
  export default function Link(props: LinkProps): JSX.Element;
}

// Type definitions for next/image
declare module 'next/image' {
  import { ComponentProps, ReactElement } from 'react';
  
  type ImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    loader?: (resolverProps: ImageLoaderProps) => string;
    quality?: number | string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    lazyBoundary?: string;
    lazyRoot?: React.RefObject<HTMLElement>;
  } & ComponentProps<'img'>;
  
  type ImageLoaderProps = {
    src: string;
    width: number;
    quality?: number | string;
  };
  
  export default function Image(props: ImageProps): ReactElement;
} 