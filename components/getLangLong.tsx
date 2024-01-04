const axios = require('axios');

async function getLangLong(link: string) {
  try {
    const response = await axios.get(link);
    const html = response.data;

    // Extract longitude and latitude from the HTML
    const match = html.match(/@(-?\d+.\d+),(-?\d+.\d+)/);
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    } else {
      throw new Error('Coordinates not found in the Google Maps link.');
    }
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error fetching coordinates:', error.message);
  }
}
}



module.exports = {getLangLong}
