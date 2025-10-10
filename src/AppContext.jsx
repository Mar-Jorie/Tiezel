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
    personal_info: {
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      name: "John Doe",
      title: "UI/UX Designer & Developer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      experience: "5+ Years",
      education: "Bachelor's in Computer Science",
      bio: "I am a passionate UI/UX designer and developer with a deep understanding of user psychology and modern design principles. My approach combines creative thinking with technical expertise to deliver solutions that not only look beautiful but also solve real problems.",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      website: "https://johndoe.com",
      twitter: "https://twitter.com/johndoe"
    },
    hero: {
      statusBadge: "Available for new opportunities",
      title: "Hi, I'm John Doe",
      subtitle: "UI/UX Designer & Developer",
      description: "Passionate designer with 5+ years of experience in creating beautiful, functional, and user-centered digital experiences.",
      ctaPrimary: "View My Work",
      ctaSecondary: "Get In Touch",
      heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
      visualTitle: "John Doe",
      visualSubtitle: "Creative & Technical",
      heroIcon: "SparklesIcon"
    },
    about: {
      professionalBio: "I am a passionate UI/UX designer and developer with a deep understanding of user psychology and modern design principles. My approach combines creative thinking with technical expertise to deliver solutions that not only look beautiful but also solve real problems.",
      educationBackground: "Bachelor's Degree in Computer Science with a focus on Human-Computer Interaction. Certified in UX Design and Frontend Development.",
      personalQuote: "Design is not just what it looks like and feels like. Design is how it works.",
      additionalInfo: "When I'm not designing, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
    },
    projects: [
      {
        title: "E-Commerce Platform",
        coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        description: "A modern e-commerce platform built with React and Node.js, featuring responsive design, secure payment processing, and advanced search functionality.",
        showcaseImages: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop"
        ],
        details: [
          "Built with React and Node.js",
          "Responsive design for all devices",
          "Secure payment processing with Stripe",
          "Advanced search and filtering",
          "Admin dashboard for inventory management"
        ]
      },
      {
        title: "Mobile Banking App",
        coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        description: "A comprehensive mobile banking application with biometric authentication, real-time transactions, and intuitive user interface design.",
        showcaseImages: [
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
        ],
        details: [
          "React Native for cross-platform development",
          "Biometric authentication integration",
          "Real-time transaction processing",
          "Intuitive user interface design",
          "Bank-level security implementation"
        ]
      }
    ],
    experience: [
      {
        title: "Senior UI/UX Designer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description: "Leading design initiatives for enterprise applications, mentoring junior designers, and collaborating with cross-functional teams to deliver exceptional user experiences.",
        achievements: [
          "Increased user engagement by 40% through improved UX design",
          "Led design system implementation across 5 product teams",
          "Mentored 3 junior designers and improved team productivity"
        ]
      },
      {
        title: "UI/UX Designer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Designed and developed user interfaces for web and mobile applications, conducted user research, and created wireframes and prototypes.",
        achievements: [
          "Designed 10+ mobile and web applications",
          "Conducted user research with 500+ participants",
          "Improved app store ratings from 3.2 to 4.7 stars"
        ]
      }
    ],
    skills: [
      {
        category: "Design",
        skills: ["UI/UX Design", "User Research", "Wireframing", "Prototyping", "Figma", "Adobe Creative Suite"]
      },
      {
        category: "Frontend Development",
        skills: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"]
      },
      {
        category: "Backend Development",
        skills: ["Node.js", "Python", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"]
      },
      {
        category: "Tools & Technologies",
        skills: ["Git", "Docker", "AWS", "Figma", "Sketch", "InVision", "Jira", "Slack"]
      }
    ],
    section_headers: {
      hero: {
        title: "Welcome",
        subtitle: "Let's create something amazing together"
      },
      about: {
        title: "About Me",
        subtitle: "Get to know me better"
      },
      projects: {
        title: "My Projects",
        subtitle: "Some of my recent work"
      },
      experience: {
        title: "Experience",
        subtitle: "My professional journey"
      },
      skills: {
        title: "Skills & Expertise",
        subtitle: "What I bring to the table"
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Let's work together"
      }
    },
    branding: {
      primaryColor: "#6589a4",
      secondaryColor: "#4f7897",
      accentColor: "#91abbe",
      textColor: "#1f2937",
      backgroundColor: "#ffffff",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      brandName: "John Doe",
      tagline: "UI/UX Designer & Developer"
    },
    navigation: {
      link1: 'About',
      link2: 'Projects', 
      link3: 'Experience',
      link4: 'Contact',
      ctaButton1: 'View Work',
      ctaButton2: 'Get In Touch'
    },
    cta: {
      title: 'Ready to Work Together?',
      subtitle: 'Let\'s discuss your next project and how I can help bring your ideas to life.',
      button1: 'View My Work',
      button2: 'Get In Touch'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project in mind? I\'d love to hear from you. Send me a message and I\'ll respond as soon as possible.',
      infoTitle: 'Contact Information',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      address: 'San Francisco, CA',
      formTitle: 'Send me a message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your Message',
      submitButton: 'Send Message'
    },
    modals: {
      contact: {
        title: 'Let\'s Connect',
        description: 'Ready to start your next project? Here\'s how you can reach me:',
        methods: [
          {
            title: 'Email',
            description: 'Send me an email for project inquiries and collaboration'
          },
          {
            title: 'LinkedIn',
            description: 'Connect with me on LinkedIn for professional networking'
          },
          {
            title: 'Phone',
            description: 'Call me directly for urgent project discussions'
          }
        ]
      }
    },
    sections: {
      hero: {
        title: 'Welcome',
        subtitle: 'Let\'s create something amazing together'
      },
      about: {
        title: 'About Me',
        subtitle: 'Get to know me better'
      },
      projects: {
        title: 'My Projects',
        subtitle: 'Some of my recent work'
      },
      experience: {
        title: 'Experience',
        subtitle: 'My professional journey'
      },
      skills: {
        title: 'Skills & Expertise',
        subtitle: 'What I bring to the table'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Let\'s work together'
      },
      footer: {
        copyright: '© 2024 John Doe. All rights reserved.'
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
    const updatedContent = {
      ...landingPageContent,
      ...newContent
    };
    
    // Force a new object reference to ensure React detects the change
    const newContentObj = {
      ...JSON.parse(JSON.stringify(updatedContent)),
      _lastUpdated: Date.now() // Add timestamp to force unique reference
    };
    setLandingPageContent(newContentObj);
    
    // Save to localStorage for persistence (without images to avoid quota issues)
    try {
      // Create a copy without blob URLs to reduce size
      const contentForStorage = JSON.parse(JSON.stringify(newContentObj));
      
      // Remove blob URLs from images to reduce localStorage size
      if (contentForStorage.personal_info?.photo && contentForStorage.personal_info.photo.startsWith('blob:')) {
        delete contentForStorage.personal_info.photo;
      }
      
      if (contentForStorage.projects) {
        contentForStorage.projects.forEach(project => {
          if (project.coverImage && project.coverImage.startsWith('blob:')) {
            delete project.coverImage;
          }
          if (project.showcaseImages) {
            project.showcaseImages = project.showcaseImages.filter(img => !img.startsWith('blob:'));
          }
        });
      }
      
      // Try to save to localStorage with error handling
      const dataToStore = JSON.stringify(contentForStorage);
      
      // Check if data is too large (localStorage limit is usually 5-10MB)
      if (dataToStore.length > 4 * 1024 * 1024) { // 4MB limit
        console.warn('Data too large for localStorage, skipping persistence');
        return;
      }
      
      localStorage.setItem('landingPageContent', dataToStore);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
      // Continue without localStorage persistence
    }
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('landingPageContentUpdated', {
      detail: newContentObj
    }));
  };

  // Reset landing page content to default
  const resetLandingPageContent = () => {
    const defaultContent = {
      personal_info: {
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        name: "John Doe",
        title: "UI/UX Designer & Developer",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        experience: "5+ Years",
        education: "Bachelor's in Computer Science",
        bio: "I am a passionate UI/UX designer and developer with a deep understanding of user psychology and modern design principles. My approach combines creative thinking with technical expertise to deliver solutions that not only look beautiful but also solve real problems.",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        website: "https://johndoe.com",
        twitter: "https://twitter.com/johndoe"
      },
      hero: {
        statusBadge: "Available for new opportunities",
        title: "Hi, I'm John Doe",
        subtitle: "UI/UX Designer & Developer",
        description: "Passionate designer with 5+ years of experience in creating beautiful, functional, and user-centered digital experiences.",
        ctaPrimary: "View My Work",
        ctaSecondary: "Get In Touch",
        heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
        visualTitle: "John Doe",
        visualSubtitle: "Creative & Technical",
        heroIcon: "SparklesIcon"
      },
      about: {
        professionalBio: "I am a passionate UI/UX designer and developer with a deep understanding of user psychology and modern design principles. My approach combines creative thinking with technical expertise to deliver solutions that not only look beautiful but also solve real problems.",
        educationBackground: "Bachelor's Degree in Computer Science with a focus on Human-Computer Interaction. Certified in UX Design and Frontend Development.",
        personalQuote: "Design is not just what it looks like and feels like. Design is how it works.",
        additionalInfo: "When I'm not designing, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
      },
      projects: [
        {
          title: "E-Commerce Platform",
          coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
          description: "A modern e-commerce platform built with React and Node.js, featuring responsive design, secure payment processing, and advanced search functionality.",
          showcaseImages: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop"
          ],
          details: [
            "Built with React and Node.js",
            "Responsive design for all devices",
            "Secure payment processing with Stripe",
            "Advanced search and filtering",
            "Admin dashboard for inventory management"
          ]
        },
        {
          title: "Mobile Banking App",
          coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
          description: "A comprehensive mobile banking application with biometric authentication, real-time transactions, and intuitive user interface design.",
          showcaseImages: [
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
          ],
          details: [
            "React Native for cross-platform development",
            "Biometric authentication integration",
            "Real-time transaction processing",
            "Intuitive user interface design",
            "Bank-level security implementation"
          ]
        }
      ],
      experience: [
        {
          title: "Senior UI/UX Designer",
          company: "TechCorp Inc.",
          period: "2022 - Present",
          description: "Leading design initiatives for enterprise applications, mentoring junior designers, and collaborating with cross-functional teams to deliver exceptional user experiences.",
          achievements: [
            "Increased user engagement by 40% through improved UX design",
            "Led design system implementation across 5 product teams",
            "Mentored 3 junior designers and improved team productivity"
          ]
        },
        {
          title: "UI/UX Designer",
          company: "StartupXYZ",
          period: "2020 - 2022",
          description: "Designed and developed user interfaces for web and mobile applications, conducted user research, and created wireframes and prototypes.",
          achievements: [
            "Designed 10+ mobile and web applications",
            "Conducted user research with 500+ participants",
            "Improved app store ratings from 3.2 to 4.7 stars"
          ]
        }
      ],
      skills: [
        {
          category: "Design",
          skills: ["UI/UX Design", "User Research", "Wireframing", "Prototyping", "Figma", "Adobe Creative Suite"]
        },
        {
          category: "Frontend Development",
          skills: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"]
        },
        {
          category: "Backend Development",
          skills: ["Node.js", "Python", "Express.js", "MongoDB", "PostgreSQL", "REST APIs"]
        },
        {
          category: "Tools & Technologies",
          skills: ["Git", "Docker", "AWS", "Figma", "Sketch", "InVision", "Jira", "Slack"]
        }
      ],
      section_headers: {
        hero: {
          title: "Welcome",
          subtitle: "Let's create something amazing together"
        },
        about: {
          title: "About Me",
          subtitle: "Get to know me better"
        },
        projects: {
          title: "My Projects",
          subtitle: "Some of my recent work"
        },
        experience: {
          title: "Experience",
          subtitle: "My professional journey"
        },
        skills: {
          title: "Skills & Expertise",
          subtitle: "What I bring to the table"
        },
        contact: {
          title: "Get In Touch",
          subtitle: "Let's work together"
        }
      },
      branding: {
        primaryColor: "#6589a4",
        secondaryColor: "#4f7897",
        accentColor: "#91abbe",
        textColor: "#1f2937",
        backgroundColor: "#ffffff",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        brandName: "John Doe",
        tagline: "UI/UX Designer & Developer"
      },
      navigation: {
        link1: 'About',
        link2: 'Projects', 
        link3: 'Experience',
        link4: 'Contact',
        ctaButton1: 'View Work',
        ctaButton2: 'Get In Touch'
      },
      cta: {
        title: 'Ready to Work Together?',
        subtitle: 'Let\'s discuss your next project and how I can help bring your ideas to life.',
        button1: 'View My Work',
        button2: 'Get In Touch'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Have a project in mind? I\'d love to hear from you. Send me a message and I\'ll respond as soon as possible.',
        infoTitle: 'Contact Information',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        address: 'San Francisco, CA',
        formTitle: 'Send me a message',
        namePlaceholder: 'Your Name',
        emailPlaceholder: 'Your Email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Your Message',
        submitButton: 'Send Message'
      },
      modals: {
        contact: {
          title: 'Let\'s Connect',
          description: 'Ready to start your next project? Here\'s how you can reach me:',
          methods: [
            {
              title: 'Email',
              description: 'Send me an email for project inquiries and collaboration'
            },
            {
              title: 'LinkedIn',
              description: 'Connect with me on LinkedIn for professional networking'
            },
            {
              title: 'Phone',
              description: 'Call me directly for urgent project discussions'
            }
          ]
        }
      },
      sections: {
        hero: {
          title: 'Welcome',
          subtitle: 'Let\'s create something amazing together'
        },
        about: {
          title: 'About Me',
          subtitle: 'Get to know me better'
        },
        projects: {
          title: 'My Projects',
          subtitle: 'Some of my recent work'
        },
        experience: {
          title: 'Experience',
          subtitle: 'My professional journey'
        },
        skills: {
          title: 'Skills & Expertise',
          subtitle: 'What I bring to the table'
        },
        contact: {
          title: 'Get In Touch',
          subtitle: 'Let\'s work together'
        },
        footer: {
          copyright: '© 2024 John Doe. All rights reserved.'
        }
      }
    };
    
    setLandingPageContent(defaultContent);
    localStorage.setItem('landingPageContent', JSON.stringify(defaultContent));
  };

  // Load content from localStorage on app start
  useEffect(() => {
    const savedContent = localStorage.getItem('landingPageContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // Check if the saved content has the old structure (like "HerbalMed" data)
        // If it does, clear it and use default content instead
        const hasOldData = (
          (parsedContent.hero && parsedContent.hero.visualTitle === "HerbalMed") ||
          (parsedContent.hero && parsedContent.hero.visualSubtitle === "Pure, natural, effective") ||
          (parsedContent.hero && parsedContent.hero.heroIcon === "ShieldCheckIcon") ||
          (parsedContent.hero && parsedContent.hero.ctaPrimary === "Shop Now") ||
          (parsedContent.hero && parsedContent.hero.ctaSecondary === "Learn More")
        );
        
        if (hasOldData) {
          console.log('Detected old content structure, clearing localStorage and using default content');
          localStorage.removeItem('landingPageContent');
          // The default content is already set in the initial state, so no need to set it again
        } else {
          setLandingPageContent(parsedContent);
        }
      } catch (error) {
        console.error('Error parsing saved content:', error);
        localStorage.removeItem('landingPageContent');
      }
    }
  }, []);

  const value = {
    // Admin state
    isAdmin,
    adminUser,
    isLoading,
    loginAdmin,
    logoutAdmin,
    
    // Landing page content
    landingPageContent,
    updateLandingPageContent,
    resetLandingPageContent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
