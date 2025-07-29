import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Your existing function - now enhanced to handle new API response
export const getProblems = async () => {
  try {
    console.log('Fetching problems...');
    const res = await axios.get(`${BASE_URL}/api/problems`);
    console.log('Problems response:', res.data);
    // Return the problems array whether it's the old format or new format
    return res.data.problems || res.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw new Error('Failed to fetch problems. Please try again.');
  }
};

// New function to get a specific problem
export const getProblemById = async (id) => {
  try {
    console.log(`Fetching problem ${id}...`);
    const res = await axios.get(`${BASE_URL}/api/problems/${id}`);
    console.log('Problem response:', res.data);
    return res.data;
  } catch (error) {
    console.error(`Error fetching problem ${id}:`, error);
    throw new Error('Failed to fetch problem details.');
  }
};

// FIXED: Updated function to get statistics (changed endpoint)
export const getProblemsStats = async () => {
  try {
    console.log('Fetching stats...');
    const res = await axios.get(`${BASE_URL}/api/stats`);
    console.log('Stats response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Failed to fetch statistics.');
  }
};

// Test function to check if API is working
export const testAPI = async () => {
  try {
    console.log('Testing API...');
    const res = await axios.get(`${BASE_URL}/api/test`);
    console.log('API test response:', res.data);
    return res.data;
  } catch (error) {
    console.error('API test failed:', error);
    throw new Error('API is not responding.');
  }
};