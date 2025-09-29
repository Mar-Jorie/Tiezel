// API Configuration - MANDATORY PATTERN
const APP_ID = import.meta.env.VITE_APP_ID || "landing-page-system";
const MASTER_KEY = import.meta.env.VITE_MASTER_KEY || "your-master-key";

// Base API URL
const BASE_URL = "https://api.innque.com/v1";

// API Client Configuration
const apiConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Application-Id': APP_ID,
    'X-Master-Key': MASTER_KEY
  }
};

// Generic API Client
class ApiClient {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.headers = config.headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient(apiConfig);

// Landing Page Content API
export const landingPageApi = {
  // Get landing page content
  getContent: async () => {
    try {
      return await apiClient.get('/landing-page-content');
    } catch (error) {
      console.error('Failed to fetch landing page content:', error);
      throw error;
    }
  },

  // Update landing page content
  updateContent: async (content) => {
    try {
      return await apiClient.put('/landing-page-content', content);
    } catch (error) {
      console.error('Failed to update landing page content:', error);
      throw error;
    }
  }
};

// Admin Authentication API
export const authApi = {
  // Admin login
  login: async (credentials) => {
    try {
      return await apiClient.post('/admin/login', credentials);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Admin logout
  logout: async () => {
    try {
      return await apiClient.post('/admin/logout');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  // Verify admin session
  verifySession: async () => {
    try {
      return await apiClient.get('/admin/verify');
    } catch (error) {
      console.error('Session verification failed:', error);
      throw error;
    }
  }
};

// Company Information API
export const companyApi = {
  // Get company information
  getInfo: async () => {
    try {
      return await apiClient.get('/company-info');
    } catch (error) {
      console.error('Failed to fetch company info:', error);
      throw error;
    }
  },

  // Update company information
  updateInfo: async (info) => {
    try {
      return await apiClient.put('/company-info', info);
    } catch (error) {
      console.error('Failed to update company info:', error);
      throw error;
    }
  }
};

// Products/Services API
export const productsApi = {
  // Get featured products
  getFeatured: async () => {
    try {
      return await apiClient.get('/products/featured');
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      throw error;
    }
  },

  // Update featured products
  updateFeatured: async (products) => {
    try {
      return await apiClient.put('/products/featured', products);
    } catch (error) {
      console.error('Failed to update featured products:', error);
      throw error;
    }
  }
};

// Testimonials API
export const testimonialsApi = {
  // Get testimonials
  getTestimonials: async () => {
    try {
      return await apiClient.get('/testimonials');
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      throw error;
    }
  },

  // Update testimonials
  updateTestimonials: async (testimonials) => {
    try {
      return await apiClient.put('/testimonials', testimonials);
    } catch (error) {
      console.error('Failed to update testimonials:', error);
      throw error;
    }
  }
};

export default apiClient;
