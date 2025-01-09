import React, { useContext } from 'react'
import { RinkContext, RinkContextType } from '../contexts/RinkContext';

export const useRinks = (): RinkContextType => {
  const context = useContext(RinkContext);
  if (context === null) {
    throw new Error('useRinks must be used within a DisctictContext');
  }
  return context;
};