import React, { useContext } from 'react'
import { CityContext, CityContextType } from '../contexts/CityContext';

export const useCities = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === null) {
    throw new Error('useCities must be used within a DisctictContext');
  }
  return context;
};