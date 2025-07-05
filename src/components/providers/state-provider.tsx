'use client';

import type { ReactNode } from 'react';
import JotaiProvider from './jotai-provider';

interface StateProviderProps {
  children: ReactNode;
}

export default function StateProvider({ children }: StateProviderProps) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
