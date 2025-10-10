// FAQ Service - Shared FAQ data and logic
class FAQService {
  constructor() {
    this.faqData = [
      {
        id: 1,
        question: "What services do you offer?",
        answer: "I specialize in full-stack web development, mobile app development, and digital consulting. My services include custom website development, e-commerce solutions, API development, database design, and technical consulting for businesses of all sizes.",
        keywords: "services, development, web, mobile, consulting, full-stack, API, database",
        category: "Services",
        priority: 10,
        status: "active",
        lastUpdated: "2024-01-15T10:30:00Z",
        createdBy: "Admin User"
      },
      {
        id: 2,
        question: "How can I contact you for a project?",
        answer: "You can reach me through the contact form on this website, email me directly, or connect with me on LinkedIn. I typically respond within 24 hours and offer free initial consultations to discuss your project requirements.",
        keywords: "contact, project, email, linkedin, consultation, reach, connect",
        category: "Contact",
        priority: 9,
        status: "active",
        lastUpdated: "2024-01-14T14:20:00Z",
        createdBy: "Admin User"
      },
      {
        id: 3,
        question: "What technologies do you work with?",
        answer: "I work with modern web technologies including React, Node.js, Python, JavaScript, TypeScript, and various databases. I'm also experienced with cloud platforms like AWS, mobile development with React Native, and have expertise in both frontend and backend development.",
        keywords: "technologies, react, node, python, javascript, typescript, aws, mobile, frontend, backend",
        category: "Technical",
        priority: 8,
        status: "active",
        lastUpdated: "2024-01-13T09:15:00Z",
        createdBy: "Admin User"
      },
      {
        id: 4,
        question: "Do you work with startups or only established companies?",
        answer: "I work with both startups and established companies! I understand the unique challenges that startups face and can provide flexible solutions that grow with your business. I offer scalable development approaches and can work within various budget constraints.",
        keywords: "startup, company, established, business, budget, flexible, scalable",
        category: "Business",
        priority: 7,
        status: "active",
        lastUpdated: "2024-01-12T16:45:00Z",
        createdBy: "Admin User"
      },
      {
        id: 5,
        question: "What is your typical project timeline?",
        answer: "Project timelines vary depending on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. I provide detailed project timelines during our initial consultation and keep you updated throughout the development process.",
        keywords: "timeline, duration, how long, project length, schedule, deadline",
        category: "Project",
        priority: 6,
        status: "active",
        lastUpdated: "2024-01-11T11:30:00Z",
        createdBy: "Admin User"
      },
      {
        id: 6,
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes! I offer ongoing maintenance and support packages to ensure your project continues to run smoothly. This includes bug fixes, updates, security patches, and feature enhancements. Support packages are tailored to your specific needs.",
        keywords: "support, maintenance, ongoing, bug fixes, updates, security, after completion",
        category: "Support",
        priority: 8,
        status: "active",
        lastUpdated: "2024-01-10T13:20:00Z",
        createdBy: "Admin User"
      },
      {
        id: 7,
        question: "Can you help with existing projects or only new ones?",
        answer: "I work on both new projects and existing ones! Whether you need to fix bugs, add new features, optimize performance, or modernize legacy code, I can help improve your existing applications and systems.",
        keywords: "existing, legacy, bug fixes, features, optimization, modernization, improve",
        category: "Services",
        priority: 7,
        status: "active",
        lastUpdated: "2024-01-09T15:20:00Z",
        createdBy: "Admin User"
      },
      {
        id: 8,
        question: "What makes your approach different?",
        answer: "I focus on clean, maintainable code and user-centered design. My approach combines technical expertise with business understanding, ensuring that the solutions I build not only work well but also drive real business value. I believe in transparent communication and collaborative development.",
        keywords: "approach, different, clean code, user-centered, business value, communication, collaborative",
        category: "About",
        priority: 6,
        status: "active",
        lastUpdated: "2024-01-08T12:15:00Z",
        createdBy: "Admin User"
      },
      {
        id: 9,
        question: "Do you work remotely or on-site?",
        answer: "I primarily work remotely, which allows me to serve clients globally while maintaining flexible communication through video calls, project management tools, and regular updates. For local clients, I can arrange on-site meetings when needed for project kickoffs or important milestones.",
        keywords: "remote, on-site, location, global, video calls, meetings, flexible",
        category: "Work",
        priority: 5,
        status: "active",
        lastUpdated: "2024-01-07T10:30:00Z",
        createdBy: "Admin User"
      },
      {
        id: 10,
        question: "How do you handle project communication and updates?",
        answer: "I maintain regular communication through your preferred channels - email, Slack, or project management tools. You'll receive weekly progress updates, have access to development staging environments, and can provide feedback throughout the development process. I believe in keeping you informed every step of the way.",
        keywords: "communication, updates, progress, staging, feedback, weekly, informed",
        category: "Process",
        priority: 7,
        status: "active",
        lastUpdated: "2024-01-06T14:45:00Z",
        createdBy: "Admin User"
      }
    ];
  }

  // Get all active FAQs
  getActiveFAQs() {
    return this.faqData.filter(faq => faq.status === 'active');
  }

  // Get FAQs by category
  getFAQsByCategory(category) {
    return this.faqData.filter(faq => faq.category === category && faq.status === 'active');
  }

  // Search FAQs by keyword matching
  searchFAQs(query) {
    const lowercaseQuery = query.toLowerCase();
    const activeFAQs = this.getActiveFAQs();
    
    return activeFAQs.filter(faq => {
      // Check if query matches question
      if (faq.question.toLowerCase().includes(lowercaseQuery)) {
        return true;
      }
      
      // Check if query matches answer
      if (faq.answer.toLowerCase().includes(lowercaseQuery)) {
        return true;
      }
      
      // Check if query matches any keyword
      const keywords = faq.keywords.toLowerCase().split(',').map(k => k.trim());
      return keywords.some(keyword => keyword.includes(lowercaseQuery));
    });
  }

  // Find best matching FAQ for a user query
  findBestMatch(userQuery) {
    const lowercaseQuery = userQuery.toLowerCase();
    const activeFAQs = this.getActiveFAQs();
    
    // Collect all matches with their priority scores
    const matches = [];
    
    // Check keyword matches (highest priority)
    for (const faq of activeFAQs) {
      const keywords = faq.keywords.toLowerCase().split(',').map(k => k.trim());
      for (const keyword of keywords) {
        if (lowercaseQuery.includes(keyword) || keyword.includes(lowercaseQuery)) {
          matches.push({ faq, score: faq.priority + 100 }); // Keyword match gets bonus
          break; // Only count once per FAQ
        }
      }
    }
    
    // Check question matches (medium priority)
    for (const faq of activeFAQs) {
      if (faq.question.toLowerCase().includes(lowercaseQuery) || 
          lowercaseQuery.includes(faq.question.toLowerCase())) {
        matches.push({ faq, score: faq.priority + 50 }); // Question match gets bonus
      }
    }
    
    // Check answer matches (lower priority)
    for (const faq of activeFAQs) {
      if (faq.answer.toLowerCase().includes(lowercaseQuery) || 
          lowercaseQuery.includes(faq.answer.toLowerCase())) {
        matches.push({ faq, score: faq.priority + 25 }); // Answer match gets bonus
      }
    }
    
    // If we have matches, return the one with highest score
    if (matches.length > 0) {
      // Sort by score (highest first), then by last updated for ties
      matches.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.faq.lastUpdated) - new Date(a.faq.lastUpdated);
      });
      return matches[0].faq;
    }
    
    return null;
  }

  // Get quick questions for the chatbot
  getQuickQuestions() {
    const activeFAQs = this.getActiveFAQs();
    return activeFAQs
      .sort((a, b) => {
        // First sort by priority (highest first)
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        // If priorities are equal, sort by last updated (most recent first)
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      })
      .slice(0, 3) // Get top 3
      .map(faq => faq.question);
  }

  // Get fallback response for unmatched queries
  getFallbackResponse() {
    return {
      text: "I couldn't find a specific answer to your question. Feel free to reach out to me directly through the contact form on this website or email me. I'm always happy to discuss your project needs and provide personalized answers to your questions!",
      isFallback: true
    };
  }

  // Update FAQ data (for management operations)
  updateFAQData(newData) {
    this.faqData = newData;
  }

  // Add new FAQ
  addFAQ(faq) {
    const newFAQ = {
      ...faq,
      id: Math.max(...this.faqData.map(f => f.id)) + 1,
      lastUpdated: new Date().toISOString(),
      createdBy: "Admin User"
    };
    this.faqData.push(newFAQ);
    return newFAQ;
  }

  // Update existing FAQ
  updateFAQ(id, updatedFAQ) {
    const index = this.faqData.findIndex(faq => faq.id === id);
    if (index !== -1) {
      this.faqData[index] = {
        ...this.faqData[index],
        ...updatedFAQ,
        lastUpdated: new Date().toISOString()
      };
      return this.faqData[index];
    }
    return null;
  }

  // Delete FAQ
  deleteFAQ(id) {
    const index = this.faqData.findIndex(faq => faq.id === id);
    if (index !== -1) {
      return this.faqData.splice(index, 1)[0];
    }
    return null;
  }
}

// Create and export a singleton instance
const faqService = new FAQService();
export default faqService;
