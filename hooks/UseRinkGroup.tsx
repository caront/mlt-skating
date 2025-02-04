import React, { useContext } from 'react'
import { RinkGroupContext, RinkGroupContextType } from '../contexts/RinkGroupContext';

export const useRinkGroups = (): RinkGroupContextType => {
  const context = useContext(RinkGroupContext);
  if (context === null) {
    throw new Error('useRinkGroups must be used within a DisctictContext');
  }
  return context;
};