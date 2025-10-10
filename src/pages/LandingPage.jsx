import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  ArrowRightIcon,
  CheckIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LightBulbIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Button from '../components/Button';
import FloatingChatbot from '../components/FloatingChatbot';
import ProjectModal from '../components/ProjectModal';
import PDFResumeGenerator from '../components/PDFResumeGenerator';
import { useApp } from '../hooks/useApp';

const LandingPage = () => {
  const { landingPageContent } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentSkillSlide, setCurrentSkillSlide] = useState(0);

  // Set dynamic browser tab title based on user's name
  useEffect(() => {
    const userName = landingPageContent?.personal_info?.name;
    if (userName) {
      document.title = `By ${userName}`;
    } else {
      document.title = 'Tiezel';
    }
  }, [landingPageContent?.personal_info?.name]);

  // Function to generate dynamic gradient colors based on primary color
  const generateGradientColors = (primaryColor) => {
    if (!primaryColor) return { from: '#3B82F6', to: '#8B5CF6' };
    
    // Convert hex to HSL for better color manipulation
    const hexToHsl = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      return [h * 360, s * 100, l * 100];
    };
    
    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    
    const [h, s, l] = hexToHsl(primaryColor);
    
    // Generate contrasting colors for better gradient effect
    // Create a complementary color (180 degrees apart) and a triadic color (120 degrees apart)
    const complementaryH = (h + 180) % 360;
    const triadicH = (h + 120) % 360;
    
    // Choose the most contrasting color
    const contrastH = Math.abs(h - complementaryH) > Math.abs(h - triadicH) ? complementaryH : triadicH;
    
    return {
      from: hslToHex(h, Math.min(s + 20, 100), Math.min(l + 10, 90)), // Original color, enhanced
      to: hslToHex(contrastH, Math.min(s + 30, 100), Math.max(l - 20, 30)) // Contrasting color
    };
  };

  // Get dynamic gradient colors
  const gradientColors = generateGradientColors(landingPageContent?.branding?.primaryColor);
  
  // Debug: Log the gradient colors
  console.log('Primary Color:', landingPageContent?.branding?.primaryColor);
  console.log('Gradient Colors:', gradientColors);

  // Update CSS variables when branding data changes
  useEffect(() => {
    if (landingPageContent?.branding?.primaryColor) {
      document.documentElement.style.setProperty('--dynamic-primary-color', landingPageContent.branding.primaryColor);
      document.documentElement.style.setProperty('--gradient-from', gradientColors.from);
      document.documentElement.style.setProperty('--gradient-to', gradientColors.to);
      document.documentElement.classList.add('dynamic-primary');
    }
  }, [landingPageContent?.branding?.primaryColor, gradientColors]);

  // Update favicon when logo changes
  useEffect(() => {
    if (landingPageContent?.branding?.logo) {
      // Create a new link element for the favicon
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = landingPageContent.branding.logo;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [landingPageContent?.branding?.logo]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(false);
  };

  const nextSkillSlide = () => {
    const skillsData = landingPageContent?.skills || [
      { category: 'Frontend Development', skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend Development', skills: ['Node.js', 'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis'] },
      { category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel'] },
      { category: 'Design & UX', skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Framer'] },
      { category: 'Mobile Development', skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Swift'] },
      { category: 'AI & Data Science', skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'OpenAI', 'LangChain'] }
    ];
    setCurrentSkillSlide((prev) => (prev + 1) % skillsData.length);
  };

  const prevSkillSlide = () => {
    const skillsData = landingPageContent?.skills || [
      { category: 'Frontend Development', skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend Development', skills: ['Node.js', 'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis'] },
      { category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel'] },
      { category: 'Design & UX', skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Framer'] },
      { category: 'Mobile Development', skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Swift'] },
      { category: 'AI & Data Science', skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'OpenAI', 'LangChain'] }
    ];
    setCurrentSkillSlide((prev) => (prev - 1 + skillsData.length) % skillsData.length);
  };

  const handleProjectClick = (project) => {
    openProjectModal(project);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'portfolio_contact_form'
      };
      
      // Save contact form submission to database
      try {
        // Import MCP tools dynamically to avoid build issues
        const { mcp_innque_mcp_create_object } = await import('../api.js');
        
        const result = await mcp_innque_mcp_create_object({
          collection: 'contact_submissions',
          object: contactData
        });
        
        console.log('Contact form saved to database:', result);
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
        
      } catch (dbError) {
        console.error('Database error:', dbError);
        
        // Fallback: Still show success message but log the error
        console.log('Contact form submission (fallback):', contactData);
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
      }
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const nextImage = () => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images && selectedProject.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const nextProject = () => {
    const projects = landingPageContent?.projects || [];
    if (projects.length > 1) {
      setCurrentProjectIndex((prev) => 
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevProject = () => {
    const projects = landingPageContent?.projects || [];
    if (projects.length > 1) {
      setCurrentProjectIndex((prev) => 
        prev === 0 ? projects.length - 1 : prev - 1
      );
    }
  };



  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                {landingPageContent?.branding?.logo ? (
                  <img 
                    src={landingPageContent.branding.logo} 
                    alt="Logo" 
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain" 
                  />
                ) : (
                  <img src="/vite.svg" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                )}
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {landingPageContent?.personal_info?.name || 'Tiezel'}
              </span>
            </div>
            
            {/* Navigation Links - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Projects</a>
              <a href="#experience" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Experience</a>
              <a href="#skills" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Skills</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Contact</a>
            </div>
            
            {/* Mobile Hamburger Menu - Right Corner */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px]"
                aria-label="Toggle menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Desktop CTA Buttons - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="primaryOutline" size="md" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                <PhoneIcon className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-3">
                  <a href="#about" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">About</a>
                  <a href="#projects" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Projects</a>
                  <a href="#experience" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Experience</a>
                  <a href="#skills" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Skills</a>
                  <a href="#contact" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Contact</a>
                </div>
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <Button variant="primaryOutline" size="md" className="w-full" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${gradientColors.from}10, white, ${gradientColors.to}10)`
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ backgroundColor: `${gradientColors.from}20` }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" 
            style={{ 
              backgroundColor: `${gradientColors.to}20`,
              animationDelay: '2s'
            }}
          ></div>
        </div>
        
        <div className="relative w-full px-4 mx-auto">
          <div className="grid lg:grid-cols-12 2xl:grid-cols-12 gap-12 2xl:gap-16 items-center">
            {/* Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="space-y-8">
                {/* Greeting */}
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                    {landingPageContent?.hero?.statusBadge || 'Available for new opportunities'}
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                    Hi, I'm{' '}
                    <span className="gradient-text font-bold">
                      {landingPageContent?.personal_info?.name || 'Your Name'}
                    </span>
              </h1>
                  
                  <div className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 leading-relaxed">
                    {landingPageContent?.personal_info?.title || 'UI/UX Designer & Developer'}
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {landingPageContent?.hero?.subtitle || 'I craft beautiful, functional digital experiences that solve real problems and delight users. Passionate about clean design, intuitive interfaces, and meaningful interactions.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    variant="primaryOutline"
                    size="lg" 
                    className="!w-auto min-w-[200px] h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View My Work
                </Button>
                  <PDFResumeGenerator portfolioData={landingPageContent} />
              </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {landingPageContent?.projects?.length || '5+'}
            </div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {landingPageContent?.experience?.length || '3+'}
                </div>
                    <div className="text-sm text-gray-600">Years Experience</div>
              </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {landingPageContent?.skills?.reduce((total, cat) => total + (cat.skills?.length || 0), 0) || '20+'}
                    </div>
                    <div className="text-sm text-gray-600">Skills</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative">
              {/* Large decorative box - always present */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-3xl transform rotate-6 scale-105 opacity-20"
                  style={{ 
                    background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`
                  }}
                ></div>
                <div 
                  className="relative w-full max-w-lg mx-auto h-96 rounded-3xl shadow-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${gradientColors.from}20, ${gradientColors.from}40, ${gradientColors.to}40)`
                  }}
                >
                  {/* Profile image wrapper - centered in the box */}
                  <div className="relative">
                    {landingPageContent?.personal_info?.photo ? (
                      <img 
                        src={landingPageContent.personal_info.photo} 
                        alt={landingPageContent?.personal_info?.name || 'Profile'} 
                        className="w-50 h-50 shadow-2xl object-cover"
                        style={{ 
                          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                
                        }}
                      />
                    ) : (
                      <UserIcon className="h-32 w-32 text-primary-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236589a4' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative w-full px-4  mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6">
              <UserIcon className="h-4 w-4 mr-2" />
              About Me
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {landingPageContent?.sections?.about?.title || 'About Me'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {landingPageContent?.sections?.about?.subtitle || 'Get to know me better'}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-12 2xl:grid-cols-12 gap-12 lg:gap-16 2xl:gap-20 items-center">
            {/* Content */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {/* Professional Bio */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                    {landingPageContent?.about?.professionalBio || 'I am a passionate UI/UX designer and developer with a deep understanding of user psychology and modern design principles. My approach combines creative thinking with technical expertise to deliver solutions that not only look beautiful but also solve real problems.'}
                  </p>
                </div>
                
                {/* Education Background */}
                {landingPageContent?.about?.educationBackground && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Education & Background</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {landingPageContent.about.educationBackground}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Quote */}
                {landingPageContent?.about?.personalQuote && (
                  <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">My Philosophy</h3>
                        <blockquote className="text-gray-700 italic leading-relaxed">
                          "{landingPageContent.about.personalQuote}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
            
            {/* Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div 
                  className="rounded-3xl p-8 lg:p-12 mt-12 lg:mt-30"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${gradientColors.from}10, ${gradientColors.from}20, ${gradientColors.to}20)`
                  }}
                >
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <HeartIcon className="h-8 w-8 text-primary-800" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Beyond Work</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {landingPageContent?.about?.additionalInfo || 'When I\'m not designing, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
          <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        </div>
        
        <div className="relative w-full px-4 mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Tiezel
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {landingPageContent?.sections?.projects?.title || 'Featured Projects'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {landingPageContent?.sections?.projects?.subtitle || 'A showcase of my recent work, highlighting innovative solutions and creative problem-solving across various domains.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-12 2xl:gap-16">
            {(landingPageContent?.projects || [
              {
                name: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with React and Node.js',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center',
                technologies: ['React', 'Node.js', 'MongoDB'],
                images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center']
              },
              {
                name: 'Mobile App Design',
                description: 'UI/UX design for a mobile fitness tracking application',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
                technologies: ['Figma', 'Adobe XD', 'Sketch'],
                images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center']
              },
              {
                name: 'Data Analytics Dashboard',
                description: 'Interactive dashboard for business intelligence and reporting',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
                technologies: ['Python', 'D3.js', 'PostgreSQL'],
                images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center']
              }
            ]).map((project, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.coverImage || project.image} 
                    alt={project.title || project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <EyeIcon className="h-8 w-8 text-white" />
                              </div>
                      <p className="text-white font-medium">View Project</p>
                            </div>
                          </div>
                  
                  {/* Project Number */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {project.title || project.name}
                    </h3>
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-primary-600" />
              </div>
            </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                        {tech}
                      </span>
                ))}
              </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-auto py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to right, ${gradientColors.from}30, transparent, ${gradientColors.to}30)`
          }}
        ></div>
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl"
          style={{ backgroundColor: `${gradientColors.from}20` }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: `${gradientColors.to}20` }}
        ></div>
        
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Professional Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {landingPageContent?.sections?.experience?.title || 'Experience & Achievements'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {landingPageContent?.sections?.experience?.subtitle || 'A timeline of my professional growth, key roles, and significant contributions across different organizations.'}
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {(landingPageContent?.experience || [
                {
                  title: 'Senior Software Developer',
                  company: 'Tech Solutions Inc.',
                  period: '2022 - Present',
                  location: 'San Francisco, CA',
                  type: 'work',
                  description: 'Leading development of scalable web applications and mentoring junior developers.',
                  achievements: ['Improved application performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline'],
                  technologies: ['React', 'Node.js', 'AWS', 'Docker']
                },
                {
                  title: 'Full Stack Developer',
                  company: 'Digital Innovations',
                  period: '2020 - 2022',
                  location: 'New York, NY',
                  type: 'work',
                  description: 'Developed full-stack applications using modern technologies and best practices.',
                  achievements: ['Built 10+ web applications', 'Reduced development time by 30%', 'Implemented automated testing'],
                  technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Redis']
                },
                {
                  title: 'Bachelor of Computer Science',
                  company: 'University of Technology',
                  period: '2016 - 2020',
                  location: 'Boston, MA',
                  type: 'education',
                  description: 'Graduated with honors, focusing on software engineering and computer science fundamentals.',
                  achievements: ['Magna Cum Laude', 'Dean\'s List 6 semesters', 'Senior Capstone Project Award'],
                  technologies: ['Java', 'C++', 'Data Structures', 'Algorithms']
                }
              ]).map((exp, index) => (
                <div key={index} className="relative flex items-start lg:items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-white border-4 border-primary-500 rounded-full shadow-lg z-10 hidden lg:block"></div>
                  
                  {/* Content Card */}
                  <div className="ml-0 lg:ml-16 w-full">
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              exp.type === 'education' ? 'bg-emerald-100' : 'bg-primary-100'
                            }`}>
                              {exp.type === 'education' ? (
                                <AcademicCapIcon className="h-5 w-5 text-emerald-600" />
                              ) : (
                                <BriefcaseIcon className="h-5 w-5 text-primary-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {exp.title}
                              </h3>
                              <p className="text-primary-600 font-semibold">{exp.company}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{exp.period}</p>
                          {exp.location && (
                            <p className="text-xs text-gray-500 flex items-center justify-end mt-1">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6">
              <CodeBracketIcon className="h-4 w-4 mr-2" />
              Technical Expertise
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {landingPageContent?.sections?.skills?.title || 'Skills & Expertise'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {landingPageContent?.sections?.skills?.subtitle || 'A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital experiences.'}
            </p>
          </div>

          {/* Skills Slide Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSkillSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:border-primary-300 hover:shadow-xl transition-all duration-200"
              aria-label="Previous skill category"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
            
            <button
              onClick={nextSkillSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:border-primary-300 hover:shadow-xl transition-all duration-200"
              aria-label="Next skill category"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>

            {/* Slide Content */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSkillSlide * 100}%)` }}
              >
                {(() => {
                  const skillsData = landingPageContent?.skills || [
                    { 
                      name: 'Frontend Development', 
                      skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
                    },
                    { 
                      name: 'Backend Development', 
                      skills: ['Node.js', 'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis']
                    },
                    { 
                      name: 'Cloud & DevOps', 
                      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel']
                    },
                    { 
                      name: 'Design & UX', 
                      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Framer']
                    },
                    { 
                      name: 'Mobile Development', 
                      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Swift']
                    },
                    { 
                      name: 'AI & Data Science', 
                      skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'OpenAI', 'LangChain']
                    }
                  ];

                  return skillsData.map((category, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {/* Category Header */}
                        <div className="flex items-center mb-8">
                          <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-6">
                            <CodeBracketIcon className="h-8 w-8 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {category.category || category.name}
                            </h3>
                            <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 2xl:gap-6">
                          {category.skills && category.skills.length > 0 ? (
                            category.skills.map((skill, skillIndex) => (
                              <div key={skillIndex} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                                <span className="text-base font-medium text-gray-700">
                                  {skill}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 text-center py-12">
                              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <CodeBracketIcon className="h-10 w-10 text-gray-400" />
                              </div>
                              <p className="text-base text-gray-500">No skills added yet</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {(() => {
                const skillsData = landingPageContent?.skills || [
                  { name: 'Frontend Development', skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
                  { name: 'Backend Development', skills: ['Node.js', 'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Redis'] },
                  { name: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel'] },
                  { name: 'Design & UX', skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Framer'] },
                  { name: 'Mobile Development', skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo', 'Swift'] },
                  { name: 'AI & Data Science', skills: ['Machine Learning', 'TensorFlow', 'Python', 'Data Analysis', 'OpenAI', 'LangChain'] }
                ];

                return skillsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSkillSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSkillSlide 
                        ? 'bg-primary-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ));
              })()}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
              Continuously expanding my technical toolkit
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent?.sections?.contact?.title || 'Get In Touch'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.sections?.contact?.subtitle || 'Ready to work together? Let\'s discuss your project.'}
                  </p>
                </div>
                
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-8 2xl:gap-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                    </div>
            <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{landingPageContent?.personal_info?.email || 'your.email@example.com'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="h-5 w-5 text-primary-600" />
                </div>
                  <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{landingPageContent?.personal_info?.phone || '+1 (555) 123-4567'}</p>
              </div>
            </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{landingPageContent?.personal_info?.location || 'Your City, Country'}</p>
                    </div>
                    </div>
                  </div>

                {/* Social Links */}
                <div className="pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Follow Me</h4>
                  <div className="flex space-x-4">
                    {landingPageContent?.personal_info?.linkedin && (
                      <a 
                        href={landingPageContent.personal_info.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-100 transition-colors"
                        title="LinkedIn"
                      >
                        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {landingPageContent?.personal_info?.github && (
                      <a 
                        href={landingPageContent.personal_info.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-100 transition-colors"
                        title="GitHub"
                      >
                        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {landingPageContent?.personal_info?.website && (
                      <a 
                        href={landingPageContent.personal_info.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-100 transition-colors"
                        title="Personal Website"
                      >
                        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {landingPageContent?.personal_info?.twitter && (
                      <a 
                        href={landingPageContent.personal_info.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary-100 transition-colors"
                        title="Twitter/X"
                      >
                        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                      </a>
                    )}
                    {(!landingPageContent?.personal_info?.linkedin && 
                      !landingPageContent?.personal_info?.github && 
                      !landingPageContent?.personal_info?.website && 
                      !landingPageContent?.personal_info?.twitter) && (
                      <span className="text-sm text-gray-500">No social links added yet</span>
                    )}
                </div>
                    </div>
                  </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {landingPageContent?.contact?.form_title || 'Send a Message'}
                </h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4 2xl:gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder={landingPageContent?.contact?.name_placeholder || 'Your Name'}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={landingPageContent?.contact?.email_placeholder || 'Your Email'}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                  <input
                    type="text"
                    name="subject"
                    placeholder={landingPageContent?.contact?.subject_placeholder || 'Subject'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={landingPageContent?.contact?.message_placeholder || 'Your Message'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                  <Button type="submit" variant="primary" size="md" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                        Sending...
                    </div>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                        {landingPageContent?.contact?.submit_text || 'Send Message'}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-8 sm:py-10 px-4 sm:px-6 opacity-90"
        style={{ 
          background: `linear-gradient(to right, ${gradientColors.from}80, ${gradientColors.to}30)`
        }}
      >
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4 sm:mb-4 tracking-tight">
              Ready to Work Together?
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10">
              Let's discuss your project and bring your ideas to life.
          </p>
          <div className="flex flex-row sm:flex-row items-center justify-center space-x-4 sm:space-x-6">
              <Button variant="light" size="lg" className="!w-auto min-w-[160px]" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
            </Button>
              <div className="!w-auto min-w-[160px]">
                <PDFResumeGenerator portfolioData={landingPageContent} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-gray-400 py-6 px-4 sm:px-6">
        <p className="text-xs sm:text-sm">&copy; 2024 {landingPageContent?.personal_info?.name || 'Tiezel'}. All rights reserved.</p>
      </footer>

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={() => setShowProjectModal(false)}></div>
            
            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-4xl bg-white rounded-xl shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{selectedProject.name}</h3>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-6 2xl:gap-8">
                  {/* Image Gallery */}
                  <div className="relative">
                    {selectedProject.images && selectedProject.images.length > 0 ? (
                      <>
                        <img 
                          src={selectedProject.images[currentImageIndex]} 
                          alt={selectedProject.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                            >
                              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                            </button>
                <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                              {selectedProject.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`w-2 h-2 rounded-full ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                      </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="h-16 w-16 text-gray-400" />
                    </div>
                    )}
                  </div>
                  
                  {/* Project Details */}
                  <div>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    
                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                </div>
              </div>
                    )}
              
                    {selectedProject.link && (
                <div className="flex space-x-3">
                        <Button variant="primary" size="sm">
                          <GlobeAltIcon className="h-4 w-4 mr-2" />
                          View Project
                  </Button>
                        <Button variant="primaryOutline" size="sm">
                          <GlobeAltIcon className="h-4 w-4 mr-2" />
                          Source Code
                  </Button>
        </div>
      )}
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        project={selectedProject}
        projectIndex={currentProjectIndex}
      />

      {/* Floating Elements */}
      <FloatingChatbot />
    </div>
  );
};

export default LandingPage;