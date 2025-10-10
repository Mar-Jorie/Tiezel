# Tiezel System Requirements

## 1. Title & Purpose
**Tiezel** - A comprehensive personal portfolio and resume funnel management system that allows individuals to showcase their work, skills, and experience through a professional landing page. The system provides a public-facing portfolio website and a secure admin interface for content management, enabling real-time updates to personal information, projects, experience, skills, and contact details.

## 2. Scope & Non-Goals

### In Scope
- Public portfolio landing page with personal information, projects, and experience
- Admin authentication and content management system
- Real-time content editing and publishing
- Personal photo upload and management
- Project showcase with image galleries and detailed information
- PDF resume generation from portfolio data
- Contact form integration with email services or database collection
- Settings management and audit trail

### Non-Goals
- E-commerce transaction processing
- User registration for visitors
- Payment processing
- Multi-user portfolio management
- Client project management

## 3. Core Domain Concepts

### Primary Entities
- **Tiezel Landing Page**: Public-facing personal portfolio website with professional information, projects, and experience
- **Admin Dashboard**: Secure interface for content management and editing with metrics and navigation
- **Content Management**: Comprehensive system for editing portfolio sections, personal info, projects, experience, skills, and contact details
- **Project Management**: System for managing Tiezel projects with image galleries, descriptions, and technologies
- **PDF Resume Generator**: System for generating downloadable PDF resumes from portfolio data
- **Settings Management**: System for managing admin settings, user preferences, and system configuration
- **Audit Trail**: Complete logging system for tracking admin actions and content changes
- **Authentication**: Secure admin login system with session management

## 4. Data Concepts

### Core Data Entities

**portfolio_content** (main content store)
- id: String
- personal_info: Object
- hero_section: Object
- about_section: Object
- projects: Array
- experience: Array
- skills: Array
- testimonials: Array
- contact_info: Object
- section_headers: Object
- created: Date
- updated: Date

**admin_users** (system accounts)
- id: String
- username: String
- email: String
- password: String(hash)
- role: String[admin]
- is_active: Boolean
- created: Date
- updated: Date

**audit_logs** (action tracking)
- id: String
- user_id: String
- action: String
- entity_type: String
- entity_id: String
- details: Object
- ip_address: String
- timestamp: Date

**settings** (system configuration)
- id: String
- category: String
- key: String
- value: String
- updated: Date

**faq_entries** (planned)
- id: String
- question: String
- answer: String
- category: String
- keywords: Array
- priority: Number
- status: String[active|inactive]
- created: Date
- updated: Date

## 5. Key Processes & Flows

### Public Landing Page Display
- **Inputs:** Visitor request, landing page content
- **What the system does:** Renders public landing page with company information, products, services, and contact details
- **Outputs:** Complete landing page with all sections, floating chatbot, responsive design

### Admin Authentication
- **Inputs:** Admin credentials (email/username, password)
- **What the system does:** Validates credentials, creates secure session, redirects to dashboard
- **Outputs:** Authenticated admin session, dashboard access, navigation menu

### Content Editing
- **Inputs:** Admin user, content changes, section type
- **What the system does:** Validates input, updates content store, logs changes, refreshes preview
- **Outputs:** Updated content, audit log entry, real-time preview

### Content Publishing
- **Inputs:** Updated content, admin confirmation
- **What the system does:** Publishes changes to public landing page, updates cache, logs publication
- **Outputs:** Live updated landing page, publication confirmation, audit trail

### Settings Management
- **Inputs:** Admin user, setting changes, category
- **What the system does:** Validates settings, updates configuration, applies changes
- **Outputs:** Updated system settings, configuration confirmation, audit log

### Audit Logging
- **Inputs:** Admin action, user context, change details
- **What the system does:** Records action details, timestamps, user information, IP address
- **Outputs:** Audit log entry, compliance record, security trail

### FAQ Management
- **Inputs:** FAQ question, answer, keywords, category, admin user
- **What the system does:** Creates/updates FAQ entry, categorizes, indexes keywords for chatbot matching
- **Outputs:** FAQ entry, searchable content, chatbot integration, audit log

### Chatbot Integration
- **Inputs:** User query, FAQ database, keyword matching
- **What the system does:** Matches query to FAQ keywords, provides exact answer or fallback response
- **Outputs:** Chatbot response, usage analytics, contact escalation for unmatched queries

### Admin Login Process
- **Inputs:** Admin credentials (email/username, password)
- **What the system does:** Validates credentials, creates secure session, redirects to dashboard
- **Outputs:** Authenticated admin session, dashboard access, navigation menu

## 6. High-Level Architecture Intent

### Frontend Modules
- **Public Landing Page**: React component with responsive design, floating chatbot
- **Admin Interface**: Secure dashboard with content management, settings, audit trail
- **Authentication System**: Login/logout with session management
- **Content Editor**: Tabbed interface for editing all landing page sections

### Backend Services
- **Content API**: CRUD operations for landing page content
- **Authentication Service**: Admin login, session management, security
- **Audit Service**: Action logging, compliance tracking
- **Settings Service**: Configuration management, preferences

### Data Layer
- **Content Store**: Landing page content, images, settings
- **User Store**: Admin accounts, authentication data
- **Audit Store**: Action logs, compliance records
- **FAQ Store**: FAQ entries, chatbot data (planned)

## 7. Integrations & Externalities

### Required Integrations
- **Image Storage**: Cloud storage for product images and company assets
- **Email Service**: Contact form submissions and admin notifications
- **Analytics**: Website traffic and user behavior tracking (planned)

### External Dependencies
- **Hosting Platform**: Web server for public landing page
- **CDN**: Content delivery for images and assets
- **SSL Certificate**: Secure HTTPS for admin interface

### Assumptions
- Admin users are pre-created and managed externally
- Image uploads are handled by cloud storage service
- Email delivery is managed by external service provider

## 8. Non-Functional Requirements

### Security
- **Authentication**: Secure admin login with session management
- **Authorization**: Admin-only access to content management features
- **Data Protection**: Encrypted passwords, secure session handling
- **Audit Trail**: Complete logging of all admin actions

### Performance
- **Page Load**: Fast loading public landing page (< 3 seconds)
- **Admin Interface**: Responsive content editing with real-time preview
- **Scalability**: Support for multiple admin users and content updates

### Availability
- **Uptime**: 99.9% availability for public landing page
- **Admin Access**: Reliable admin interface with session persistence
- **Backup**: Regular content backups and audit log retention

## 9. Implementability Notes

### Implementable Now
- **Public Landing Page**: ✅ Complete with responsive design and floating chatbot
- **Admin Authentication**: ✅ Complete with secure login and session management
- **Content Management**: ✅ Complete with tabbed interface and real-time editing
- **Settings Management**: ✅ Complete with multiple configuration tabs
- **Audit Trail**: ✅ Complete with search, filter, and detailed logging

### External/Assumption
- **FAQ Management**: Requires database schema setup and chatbot keyword matching logic
- **Chatbot Fallback**: Requires contact information configuration for escalation
- **Advanced Analytics**: Requires external analytics service integration
- **Email Notifications**: Requires external email service configuration

### Minimal Scaffolding Needed
- Database schema for FAQ entries with keywords field (planned)
- Chatbot keyword matching algorithm (planned)
- Fallback response system with contact escalation (planned)
- Analytics tracking for FAQ usage (planned)

## 10. Build Slices

### Phase 1: Core Landing Page ✅ COMPLETED
- Public landing page with e-commerce content and company information
- Responsive design implementation with mobile-first approach
- Floating chatbot integration for customer support
- Hero section, services, products, testimonials, and contact sections
- Professional design with HerbalMed branding

### Phase 2: Admin Authentication ✅ COMPLETED
- Admin access page with security messaging
- Admin login page with email/password authentication
- Session management with secure logout
- Admin-only access controls and route protection

### Phase 3: Content Management ✅ COMPLETED
- Comprehensive admin dashboard with metrics and navigation
- Tabbed content management interface for all landing page sections
- Real-time content editing with form validation
- Icon selection system with 30+ available icons
- Image upload and management capabilities
- Company info, hero section, services, products, testimonials, and order methods editing

### Phase 4: Settings & Audit System ✅ COMPLETED
- Admin settings management with multiple configuration tabs
- Complete audit trail system with action logging
- Search and filter functionality for audit logs
- User preferences and system configuration
- Security and compliance tracking

### Phase 5: FAQ Management System (PLANNED)
- FAQ management interface with CRUD operations for chatbot setup
- Keyword-based chatbot integration with exact answer matching
- Fallback mechanism for unmatched questions with contact escalation
- Search and filter functionality for FAQs
- Bulk operations for FAQ management
- Chatbot analytics and performance tracking

### Phase 6: Advanced Features (PLANNED)
- SEO optimization tools
- Advanced analytics integration
- Enhanced chatbot AI capabilities
- Content versioning and rollback

## 11. Tiezel Landing Page Details

### Hero Section Content
- **Personal Introduction**: "Hi, I'm [Name] - [Professional Title]" (editable)
- **Professional Headline**: "Passionate [profession] with [X] years of experience in [field]" (editable)
- **Primary CTA**: "View My Work" or "Download Resume" button (editable)
- **Secondary CTA**: "Get In Touch" button (editable)
- **Personal Photo**: Professional headshot with upload capability
- **Background**: Professional gradient or subtle pattern

### Key Sections to Highlight
- **About Section**: Professional summary, skills overview, and personal story
- **Projects Section**: Featured work with detailed project showcases and image galleries
- **Experience Section**: Work history, education, and career milestones
- **Skills Section**: Technical skills, tools, certifications, and competencies
- **Contact Section**: Multiple contact methods and professional information

### Navigation Elements
- **Navigation Menu**: About, Projects, Experience, Skills, Contact links
- **Authentication Buttons**: Admin Login button (for portfolio owner)
- **Mobile Menu**: Hamburger menu with responsive navigation
- **Personal Branding**: Name and professional title display

### Content Sections
- **Personal Information**: Name, title, bio, contact details, social media links
- **About Section**: Professional summary, skills overview, personal story
- **Projects Section**: Tiezel projects with images, descriptions, and technologies
- **Experience Section**: Work history, education, achievements, and milestones
- **Skills Section**: Technical skills, tools, certifications, and competencies
- **Testimonials Section**: Professional recommendations and client feedback
- **Contact Section**: Contact form, email, phone, and social media links
- **Footer**: Personal branding and contact information

## 12. Signup Page Details

### Personal Information Fields
- **First Name**: Required text field
- **Last Name**: Required text field
- **Email Address**: Required email field with validation
- **Professional Title**: Required text field (e.g., "Software Developer", "Graphic Designer")
- **Years of Experience**: Required number field
- **Primary Skills**: Required multi-select field with common skills
- **Location**: Required text field (city, country)
- **Phone Number**: Optional text field
- **LinkedIn Profile**: Optional URL field
- **Tiezel Website**: Optional URL field
- **Bio/Summary**: Required textarea field for professional summary

### Role-Based Fields
- **Developer**: Programming languages, frameworks, tools, GitHub profile
- **Designer**: Design tools, specialties, Behance/Dribbble profile
- **Marketing**: Marketing tools, specialties, campaign examples
- **Writer**: Writing specialties, published works, writing samples
- **Consultant**: Industry expertise, consulting areas, client testimonials
- **Other**: Custom field for other professions

### Account Setup
- **Username**: Required unique identifier
- **Password**: Required with strength validation
- **Confirm Password**: Required matching validation
- **Terms and Conditions**: Required checkbox acceptance
- **Privacy Policy**: Required checkbox acceptance
- **Email Notifications**: Optional checkbox for updates

## 13. FAQ Management System

### FAQ Chatbot Interface
- **FAQ List View**: Display all FAQ entries with question, answer, keywords, and status
- **FAQ Editor**: Create and edit FAQ entries with question, answer, and keyword setup
- **Keyword Management**: Setup multiple keywords that trigger each FAQ response
- **Search and Filter**: Find specific FAQs by question, answer, or keywords
- **Bulk Operations**: Enable/disable multiple FAQs, bulk status changes

### FAQ Entry Fields
- **Question**: The frequently asked question (required)
- **Answer**: Detailed answer that chatbot will provide (required)
- **Keywords**: Comma-separated keywords that trigger this FAQ (required)
- **Category**: FAQ category for organization (General, Products, Shipping, Support, etc.)
- **Priority**: Display order priority (1-10, higher number = higher priority)
- **Status**: Active/Inactive toggle for FAQ visibility
- **Last Updated**: Automatic timestamp of last modification
- **Created By**: Admin user who created the FAQ

### Chatbot Integration
- **Keyword Matching**: Chatbot matches user queries to FAQ keywords
- **Response Generation**: Provides the exact answer from FAQ when keywords match
- **Fallback Response**: When no FAQ matches, suggests contacting support
- **Context Awareness**: Chatbot considers conversation context for better matching
- **Analytics**: Track which FAQs are most accessed through chatbot

### Fallback Mechanism
- **No Match Response**: "I couldn't find an answer to your question. For more complex inquiries, please contact us:"
- **Contact Options**: 
  - Email: "Email us at info@herbalmed.com"
  - Phone: "Call us at (555) 123-4567"
  - Live Chat: "Start a live chat with our support team"
- **Escalation**: Direct users to human support for complex questions

### FAQ Categories
- **General**: Basic company and service information
- **Products**: Product details, specifications, availability
- **Shipping**: Delivery information, shipping costs, timelines
- **Support**: Technical support, troubleshooting, help topics
- **Returns**: Return policies, exchange procedures
- **Account**: User account management, login issues

## 13. Assumptions & Open Questions

### Assumptions
- Admin users are pre-created and managed externally (no signup page)
- Image uploads are handled by cloud storage service
- Email delivery is managed by external service provider
- FAQ management will be implemented in future phases
- Chatbot uses keyword matching (not AI) for FAQ responses
- Contact information is available for chatbot fallback responses

### Open Questions
- Should FAQ management include rich text editing capabilities for answers?
- How many keywords should be allowed per FAQ entry?
- Should the system support multiple admin users simultaneously?
- What analytics and reporting features are needed for FAQ usage?
- Should the system support content versioning and rollback?
- What contact methods should be included in chatbot fallback responses?