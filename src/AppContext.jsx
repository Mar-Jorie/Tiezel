import { createContext, useState, useEffect } from 'react';

// App Context for global state management
export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Landing page content state
  const [landingPageContent, setLandingPageContent] = useState({
    hero: {
      title: "Welcome to TechStore - Your Trusted E-commerce Partner",
      subtitle: "Discover quality products and exceptional service that exceeds your expectations",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More"
    },
    company: {
      name: "TechStore",
      description: "Your premier destination for quality technology products and exceptional customer service.",
      address: "123 Business Street, City, State 12345",
      phone: "(555) 123-4567",
      email: "info@techstore.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    services: [
      {
        title: "Product Sales",
        description: "Wide selection of quality products",
        icon: "🛍️"
      },
      {
        title: "Customer Support",
        description: "24/7 customer service support",
        icon: "🎧"
      },
      {
        title: "Fast Shipping",
        description: "Quick and reliable delivery",
        icon: "🚚"
      },
      {
        title: "Quality Guarantee",
        description: "100% satisfaction guarantee",
        icon: "⭐"
      }
    ],
    products: [
      {
        name: "Premium Laptop",
        price: "$999",
        image: "/api/placeholder/300/200",
        description: "High-performance laptop for professionals"
      },
      {
        name: "Wireless Headphones",
        price: "$199",
        image: "/api/placeholder/300/200",
        description: "Noise-cancelling wireless headphones"
      },
      {
        name: "Smart Watch",
        price: "$299",
        image: "/api/placeholder/300/200",
        description: "Advanced fitness tracking smartwatch"
      }
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        rating: 5,
        text: "Excellent service and fast delivery. Highly recommended!",
        company: "Tech Solutions Inc."
      },
      {
        name: "Mike Chen",
        rating: 5,
        text: "Great products and outstanding customer support.",
        company: "Digital Innovations"
      },
      {
        name: "Emily Davis",
        rating: 5,
        text: "Best e-commerce experience I've had. Will definitely shop again!",
        company: "Creative Agency"
      }
    ]
  });

  // Check for existing admin session on app load
  useEffect(() => {
    const checkAdminSession = () => {
      const adminToken = localStorage.getItem('adminToken');
      const adminUserData = localStorage.getItem('adminUser');
      
      if (adminToken && adminUserData) {
        try {
          const user = JSON.parse(adminUserData);
          setIsAdmin(true);
          setAdminUser(user);
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
      }
    };

    checkAdminSession();
  }, []);

  // Admin login function
  const loginAdmin = async (credentials) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with real API call
      if (credentials.email === 'admin@techstore.com' && credentials.password === 'admin123') {
        const user = {
          id: 1,
          email: credentials.email,
          name: 'Admin User',
          role: 'admin'
        };
        
        const token = 'mock-admin-token-' + Date.now();
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        setIsAdmin(true);
        setAdminUser(user);
        
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Admin logout function
  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdmin(false);
    setAdminUser(null);
  };

  // Update landing page content
  const updateLandingPageContent = (newContent) => {
    setLandingPageContent(prev => ({
      ...prev,
      ...newContent
    }));
  };

  const value = {
    // Admin state
    isAdmin,
    adminUser,
    isLoading,
    loginAdmin,
    logoutAdmin,
    
    // Landing page content
    landingPageContent,
    updateLandingPageContent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
