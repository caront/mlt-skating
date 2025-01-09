import React, { useContext } from 'react'
import { DistrictContext, DistrictContextType } from '../contexts/DistrictContext';

export const useDistricts = (): DistrictContextType => {
  const context = useContext(DistrictContext);
  if (context === null) {
    throw new Error('useDistricts must be used within a DisctictContext');
  }
  return context;
};