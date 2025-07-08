declare global {
  interface Window {
    umami: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      identify: {
        (uniqueId: string, userData?: Record<string, unknown>): void;
        (userData: Record<string, unknown>): void;
      };
    };
  }
}

export interface UmamiUser {
  id: string;
  sessionId: string;
  createdAt: number;
}

export interface UmamiEventData {
  userId: string;
  sessionId: string;
  timestamp: number;
  [key: string]: unknown;
}
