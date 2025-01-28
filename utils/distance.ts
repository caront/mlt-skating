const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const getDistanceBetweenCoordinates = (
  pos1 = { latitude: 0, longitude: 0 },
  pos2 = { latitude: 0, longitude: 0 }
): number => {
  const { latitude: lat1, longitude: lon1 } = pos1;
  const { latitude: lat2, longitude: lon2 } = pos2;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return parseFloat(distance.toFixed(2));
};
