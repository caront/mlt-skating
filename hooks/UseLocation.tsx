import React, { useContext } from 'react'
import { LocateContext, LocateContextType } from '../contexts/LocateContext';

export const useLocates = (): LocateContextType => {
  const context = useContext(LocateContext);
  if (context === null) {
    throw new Error('useLocates must be used within a DisctictContext');
  }
  return context;
};