/**
 * API Configuration utility
 * Uses Vite environment variables to build the correct API base URL
 * Supports both Codespaces and localhost environments
 */

// Get Codespace name from environment
const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

// Build API base URL with Codespaces support and fallback
export const getApiBaseUrl = () => {
  if (CODESPACE_NAME && CODESPACE_NAME !== 'undefined') {
    return `https://${CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Fetch data from API endpoint
 * @param {string} endpoint - API endpoint path (e.g., '/api/users')
 * @param {object} options - Fetch options
 * @returns {Promise<array|object>} Response data
 */
export const fetchFromApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle both paginated and array responses
    return Array.isArray(data) ? data : data.data || data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};
