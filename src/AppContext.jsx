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
      logo: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop&crop=center",
      brandName: "HerbalMed",
      tagline: "Nature's Healing Power",
      primaryColor: "#6589a4"
    },
    hero: {
      title: "Welcome to HerbalMed - Premium Herbal Medicine",
      subtitle: "Discover the healing power of nature with our premium collection of herbal medicines and natural remedies",
      ctaPrimary: "Shop Now",
      ctaSecondary: "Learn More",
      visualTitle: "HerbalMed",
      visualSubtitle: "Pure, natural, effective",
      heroIcon: "ShieldCheckIcon"
    },
    company: {
      name: "HerbalMed",
      description: "Your trusted source for premium herbal medicines and natural healing solutions.",
      address: "123 Wellness Street, Green City, State 12345",
      phone: "(555) 123-4567",
      email: "info@herbalmed.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    services: [
      {
        title: "Premium Quality",
        description: "100% natural, organic herbal medicines",
        icon: "ShieldCheckIcon"
      },
      {
        title: "Expert Consultation",
        description: "Professional herbal medicine guidance",
        icon: "PhoneIcon"
      },
      {
        title: "Fast Delivery",
        description: "Quick and secure shipping worldwide",
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
        name: "Turmeric Golden Blend",
        image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop&crop=center",
        description: "Premium organic turmeric with anti-inflammatory properties",
        benefits: [
          "Reduces inflammation naturally",
          "Supports joint health and mobility",
          "Boosts immune system function",
          "Promotes healthy digestion"
        ]
      },
      {
        name: "Ginger Root Extract", 
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        description: "Pure ginger root extract for digestive health",
        benefits: [
          "Soothes digestive discomfort",
          "Reduces nausea and motion sickness",
          "Supports healthy metabolism",
          "Natural anti-inflammatory properties"
        ]
      },
      {
        name: "Echinacea Immune Support",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&crop=center",
        description: "Natural immune system booster from echinacea",
        benefits: [
          "Strengthens immune system",
          "Reduces cold and flu duration",
          "Supports respiratory health",
          "Natural antioxidant properties"
        ]
      },
      {
        name: "Ashwagandha Stress Relief",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&crop=center",
        description: "Ancient herb for stress management and vitality",
        benefits: [
          "Reduces stress and anxiety",
          "Improves sleep quality",
          "Boosts energy and vitality",
          "Supports adrenal gland function"
        ]
      },
      {
        name: "Ginkgo Biloba Memory",
        image: "https://images.unsplash.com/photo-1594736797933-d0d4b7a8b4b4?w=400&h=300&fit=crop&crop=center",
        description: "Traditional herb for cognitive function and memory",
        benefits: [
          "Enhances memory and focus",
          "Improves blood circulation",
          "Supports brain health",
          "Natural antioxidant protection"
        ]
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
    modals: {
      shopNow: {
        title: 'How to Order',
        description: 'Ready to start your wellness journey? Here\'s where you can order our premium herbal medicines:',
        methods: [
          {
            title: 'Facebook Page',
            description: 'Message us on Facebook for orders and inquiries'
          },
          {
            title: 'Phone Orders',
            description: 'Call us directly for personalized service'
          },
          {
            title: 'Email Orders',
            description: 'Send us an email with your requirements'
          }
        ]
      }
    },
    sections: {
      features: {
        title: 'Everything You Need to Know',
        subtitle: 'Comprehensive information designed to help you make informed decisions.'
      },
      products: {
        title: 'Featured Herbal Products',
        subtitle: 'Premium quality herbal medicines and natural remedies for your wellness journey.'
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
