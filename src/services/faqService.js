// FAQ Service - Shared FAQ data and logic
class FAQService {
  constructor() {
    this.faqData = [
      {
        id: 1,
        question: "What are your shipping rates?",
        answer: "We offer free shipping on orders over $50. Standard shipping (5-7 business days) is $8.99, and express shipping (2-3 business days) is $15.99.",
        keywords: "shipping, rates, delivery, cost, free shipping",
        category: "Shipping",
        priority: 8,
        status: "active",
        lastUpdated: "2024-01-15T10:30:00Z",
        createdBy: "Admin User"
      },
      {
        id: 2,
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using our tracking page or the carrier's website.",
        keywords: "track, tracking, order status, shipment, package",
        category: "Shipping",
        priority: 7,
        status: "active",
        lastUpdated: "2024-01-14T14:20:00Z",
        createdBy: "Admin User"
      },
      {
        id: 3,
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like electronics have a 14-day return window.",
        keywords: "return, refund, policy, exchange, 30 days",
        category: "Returns",
        priority: 9,
        status: "active",
        lastUpdated: "2024-01-13T09:15:00Z",
        createdBy: "Admin User"
      },
      {
        id: 4,
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team via email at support@techstore.com, phone at 1-800-TECH-HELP, or through our live chat feature available 24/7.",
        keywords: "contact, support, help, email, phone, live chat",
        category: "Support",
        priority: 10,
        status: "active",
        lastUpdated: "2024-01-12T16:45:00Z",
        createdBy: "Admin User"
      },
      {
        id: 5,
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to over 50 countries worldwide. International shipping rates vary by destination and package weight. You can calculate shipping costs at checkout.",
        keywords: "international, worldwide, country, outside, global, overseas",
        category: "Shipping",
        priority: 6,
        status: "active",
        lastUpdated: "2024-01-11T11:30:00Z",
        createdBy: "Admin User"
      },
      {
        id: 6,
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within the United States. We're working on expanding to international shipping in the future.",
        keywords: "international, worldwide, country, outside, global",
        category: "Shipping",
        priority: 5,
        status: "inactive",
        lastUpdated: "2024-01-10T13:20:00Z",
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
      text: "I couldn't find a specific answer to your question. For more complex inquiries, please contact our support team at support@techstore.com or call us at 1-800-TECH-HELP. Our team is available 24/7 to assist you!",
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
