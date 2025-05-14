import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Fix for 'Cannot find module' errors
declare module 'react' {
  interface CSSProperties {
    [key: string]: any;
  }
}

// Fix for framer-motion related errors
declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: React.ComponentType<any>;
  export const useScroll: () => { scrollY: any };
  export const useMotionValueEvent: (value: any, event: string, callback: (latest: any) => void) => void;
  export const useTransform: (value: any, input: any[], output: any[]) => any;
  export const useAnimation: () => any;
  export const useMotionValue: (initialValue: number) => any;
  export const useInView: (ref: React.RefObject<Element>, options?: any) => boolean;
}

// Fix for lucide-react icon related errors
declare module 'lucide-react' {
  export const Menu: React.FC<any>;
  export const X: React.FC<any>;
  export const ChevronRight: React.FC<any>;
  // Add other icons as needed
}

export {}; 