'use client';

import { Provider } from 'jotai';
import type { ReactNode } from 'react';

interface JotaiProviderProps {
  children: ReactNode;
}

export default function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider>{children}</Provider>;
}
