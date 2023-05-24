import axios from 'axios';

export async function getCoordinates(street, city, postalCode, country) {
  const address = `${street}, ${postalCode} ${city}, ${country}`;
  const apiKey = process.env.REACT_APP_API_KEY;
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: apiKey,
      },
    });

    const result = response.data.results[0];
    if (result) {
      const { lat, lng } = result.geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.log('Error:', error.message);
    throw new Error('Error retrieving coordinates');
  }
}