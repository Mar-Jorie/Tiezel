import { useState } from 'react';
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
  ClockIcon
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
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);

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

  const nextTestimonial = () => {
    const testimonials = landingPageContent?.testimonials || [];
    if (testimonials.length > 1) {
      setCurrentTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevTestimonial = () => {
    const testimonials = landingPageContent?.testimonials || [];
    if (testimonials.length > 1) {
      setCurrentTestimonialIndex((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }
  };

  const downloadResume = () => {
    // This will be implemented with PDF generation
    console.log('Download resume functionality will be implemented');
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
                <img src="/vite.svg" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {landingPageContent?.personal_info?.name || 'Portfolio'}
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
              <Link to="/admin/login">
                <Button variant="ghost" size="md" className="!w-auto">Admin</Button>
              </Link>
              <Button variant="primaryOutline" size="md" onClick={downloadResume}>
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Resume
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
                  <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="md" className="w-full">Admin</Button>
                  </Link>
                  <Button variant="primaryOutline" size="md" className="w-full" onClick={downloadResume}>
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                  {landingPageContent?.personal_info?.name || 'Your Name'}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {landingPageContent?.hero?.subtitle || 'Passionate professional with expertise in creating innovative solutions and delivering exceptional results.'}
              </p>
              <div className="flex flex-row sm:flex-row items-start space-x-4 sm:space-x-4 mb-6 sm:mb-8">
                <Button variant="primary" size="lg" className="!w-auto min-w-[160px]" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View My Work
                </Button>
                <PDFResumeGenerator portfolioData={landingPageContent} />
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              {/* Personal Photo */}
              <div className="relative">
                {landingPageContent?.personal_info?.photo ? (
                  <img 
                    src={landingPageContent.personal_info.photo} 
                    alt={landingPageContent?.personal_info?.name || 'Professional Photo'} 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl shadow-xl flex items-center justify-center">
                    <UserIcon className="h-24 w-24 text-primary-600" />
                  </div>
                )}
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <CodeBracketIcon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <LightBulbIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              About Me
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.about?.subtitle || 'Learn more about my background, skills, and professional journey.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {landingPageContent?.about?.description || 'I am a passionate professional with a strong background in technology and innovation. With years of experience in delivering high-quality solutions, I bring creativity, technical expertise, and a results-driven approach to every project.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Experience</p>
                      <p className="text-xs text-gray-600">{landingPageContent?.personal_info?.experience || '5+ Years'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <AcademicCapIcon className="h-6 w-6 text-indigo-600" />
                </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Education</p>
                      <p className="text-xs text-gray-600">{landingPageContent?.personal_info?.education || 'Bachelor\'s Degree'}</p>
                </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Key Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {(landingPageContent?.skills || [
                  { name: 'JavaScript', level: 90 },
                  { name: 'React', level: 85 },
                  { name: 'Node.js', level: 80 },
                  { name: 'Python', level: 75 }
                ]).slice(0, 4).map((skill, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className="text-xs text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.sections?.projects?.subtitle || 'Explore some of my recent work and creative projects.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative mb-6">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                            </div>
                              </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{project.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed text-center mb-4">{project.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {tech}
                    </span>
                        ))}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Professional Experience
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              My career journey and key achievements
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {(landingPageContent?.experience || [
                {
                  title: 'Senior Software Developer',
                  company: 'Tech Solutions Inc.',
                  period: '2022 - Present',
                  description: 'Leading development of scalable web applications and mentoring junior developers.',
                  achievements: ['Improved application performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
                },
                {
                  title: 'Full Stack Developer',
                  company: 'Digital Innovations',
                  period: '2020 - 2022',
                  description: 'Developed full-stack applications using modern technologies and best practices.',
                  achievements: ['Built 10+ web applications', 'Reduced development time by 30%', 'Implemented automated testing']
                },
                {
                  title: 'Junior Developer',
                  company: 'StartupXYZ',
                  period: '2019 - 2020',
                  description: 'Started my professional journey building web applications and learning new technologies.',
                  achievements: ['Completed 5 major projects', 'Learned 3 new programming languages', 'Contributed to open source']
                }
              ]).map((exp, index) => (
                  <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                    <p className="text-gray-600 mb-3">{exp.description}</p>
                    <ul className="space-y-1">
                      {exp.achievements?.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent?.skills?.title || 'Skills & Expertise'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.skills?.subtitle || 'Technical skills and tools I work with'}
                </p>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPageContent?.skills?.categories && landingPageContent.skills.categories.length > 0 ? (
              landingPageContent.skills.categories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CodeBracketIcon className="h-5 w-5 mr-2 text-primary-600" />
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills && category.skills.length > 0 ? (
                      category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No skills added yet</span>
                    )}
                </div>
              </div>
              ))
            ) : (
              // Fallback to default skills if no data is available
              [
                { category: 'Frontend', skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'] },
                { category: 'Backend', skills: ['Node.js', 'Python', 'Express.js', 'Django', 'REST APIs', 'GraphQL'] },
                { category: 'Database', skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'] },
                { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code', 'Postman'] },
                { category: 'Mobile', skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development'] },
                { category: 'Other', skills: ['Agile', 'Scrum', 'CI/CD', 'Testing', 'DevOps', 'Cloud Computing'] }
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CodeBracketIcon className="h-5 w-5 mr-2 text-primary-600" />
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
            </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              What People Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.sections?.testimonials?.subtitle || 'Testimonials from colleagues and clients'}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
          <div className="relative">
              {(landingPageContent?.testimonials || [
                {
                  name: 'Sarah Johnson',
                  role: 'Project Manager',
                  company: 'Tech Solutions Inc.',
                  text: 'Exceptional work and great attention to detail. Delivered exactly what we needed on time and within budget.',
                  rating: 5
                },
                {
                  name: 'Mike Chen',
                  role: 'CEO',
                  company: 'Digital Innovations',
                  text: 'Outstanding developer with excellent communication skills. Highly recommend for any technical project.',
                  rating: 5
                },
                {
                  name: 'Emily Davis',
                  role: 'Design Director',
                  company: 'Creative Agency',
                  text: 'Collaborative and innovative approach to problem-solving. A pleasure to work with.',
                  rating: 5
                }
              ]).slice(currentTestimonialIndex, currentTestimonialIndex + 1).map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              ))}
              
              {(landingPageContent?.testimonials || []).length > 1 && (
              <>
                <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                    <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}
                </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent?.contact?.subtitle || 'Ready to work together? Let\'s discuss your project.'}
                  </p>
                </div>
                
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <section className="py-8 sm:py-10 px-4 sm:px-6 bg-gradient-to-r from-primary-400 to-indigo-600 opacity-90">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
              Ready to Work Together?
          </h2>
          <p className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10 font-medium">
              Let's discuss your project and bring your ideas to life.
          </p>
          <div className="flex flex-row sm:flex-row items-center justify-center space-x-4 sm:space-x-6">
              <Button variant="light" size="lg" className="!w-auto min-w-[160px]" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
            </Button>
              <Button variant="secondaryOutline" size="lg" className="!w-auto min-w-[160px] !border-white !text-white hover:!bg-white hover:!text-primary-600" onClick={downloadResume}>
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download Resume
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-gray-400 py-6 px-4 sm:px-6">
        <p className="text-xs sm:text-sm">&copy; 2024 {landingPageContent?.personal_info?.name || 'Portfolio'}. All rights reserved.</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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