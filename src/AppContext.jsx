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
    branding: {
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
      brandName: "TechStore",
      tagline: "Your Trusted Technology Partner",
      primaryColor: "#6589a4"
    },
    hero: {
      title: "Welcome to TechStore - Your Trusted Technology Partner",
      subtitle: "Discover comprehensive information and expert guidance that helps you make informed decisions",
      ctaPrimary: "Learn More",
      ctaSecondary: "Contact Us",
      visualTitle: "TechStore",
      visualSubtitle: "Expert information, trusted guidance",
      heroIcon: "ShieldCheckIcon"
    },
    company: {
      name: "TechStore",
      description: "Your trusted source for comprehensive technology information and expert guidance.",
      address: "123 Business Street, City, State 12345",
      phone: "(555) 123-4567",
      email: "info@techstore.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    services: [
      {
        title: "Expert Information",
        description: "Comprehensive guides and detailed specifications",
        icon: "ShieldCheckIcon"
      },
      {
        title: "Technical Support",
        description: "Expert guidance and technical assistance",
        icon: "PhoneIcon"
      },
      {
        title: "Quick Access",
        description: "Fast and reliable information delivery",
        icon: "TruckIcon"
      },
      {
        title: "Quality Content",
        description: "Rigorous fact-checking and verification",
        icon: "StarIcon"
      }
    ],
    products: [
      {
        name: "Laptop Buying Guide",
        value: "Save $500+ on your next laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center",
        description: "Complete guide to choosing the right laptop for your needs"
      },
      {
        name: "Audio Equipment Guide",
        value: "Find your perfect audio solution",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
        description: "Expert advice on selecting the best audio equipment"
      },
      {
        name: "Wearable Tech Guide",
        value: "Maximize your productivity",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
        description: "Everything you need to know about wearable technology"
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
        text: "Best technology information and support I've experienced. Highly recommended!",
        company: "Creative Agency"
      }
    ],
    navigation: {
      link1: 'Features',
      link2: 'Products', 
      link3: 'About',
      link4: 'Contact',
      ctaButton1: 'Learn More',
      ctaButton2: 'Learn More'
    },
    cta: {
      title: 'Ready to Learn More?',
      subtitle: 'Get in touch with us to learn more about our products and services.',
      button1: 'Learn More',
      button2: 'Contact Us'
    },
    about: {
      title: 'About TechStore',
      subtitle: 'Learn more about our company and mission.',
      heading: 'Our Story',
      description: 'We are a technology company dedicated to providing quality products and exceptional service to our customers.',
      feature1: 'Quality Products',
      feature2: 'Expert Support',
      feature3: 'Customer Satisfaction',
      visualTitle: 'Trusted Partner',
      visualSubtitle: 'Your technology needs, our expertise'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      infoTitle: 'Contact Information',
      phone: '+1 (555) 123-4567',
      email: 'info@techstore.com',
      address: '123 Tech Street, Digital City, DC 12345',
      formTitle: 'Send us a message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your Message',
      submitButton: 'Send Message'
    },
    sections: {
      features: {
        title: 'Everything You Need to Know',
        subtitle: 'Comprehensive information designed to help you make informed decisions.'
      },
      products: {
        title: 'Free Resources & Guides',
        subtitle: 'Expert knowledge and comprehensive guides to help you make informed decisions.'
      },
      about: {
        title: 'About {company.name}',
        subtitle: 'Why Choose Us?'
      },
      testimonials: {
        title: 'What Our Customers Say',
        subtitle: 'Don\'t just take our word for it - hear from our satisfied customers.'
      },
      footer: {
        copyright: '© 2024 {brandName}. All rights reserved.'
      }
    }
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
