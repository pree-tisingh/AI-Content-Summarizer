// fetchHTML.js
import axios from 'axios';

const fetchHTML = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch HTML from ${url}: ${error.message}`);
  }
};

export default fetchHTML;
