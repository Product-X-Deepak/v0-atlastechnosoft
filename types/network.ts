// NetworkConnection interface for TypeScript
export interface NetworkConnection {
  effectiveType?: string;
  saveData?: boolean;
  downlink?: number;
  rtt?: number;
  onchange?: () => void;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
}

// Extend the Navigator interface using declaration merging
declare global {
  interface Navigator {
    connection?: NetworkConnection;
  }
} 