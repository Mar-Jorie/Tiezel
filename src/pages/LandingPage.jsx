import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  ShieldCheckIcon, 
  PhoneIcon, 
  TruckIcon, 
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
  CursorArrowRaysIcon,
  LightBulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import FloatingChatbot from '../components/FloatingChatbot';
import { useApp } from '../hooks/useApp';

const LandingPage = () => {
  const { landingPageContent } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Button click handlers
  const handleGetStarted = () => {
    setShowGetStartedModal(true);
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactUs = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Carousel navigation functions
  const totalSlides = Math.ceil(landingPageContent.products.length / 3);
  
  const handlePreviousProduct = () => {
    setCurrentProductIndex((prev) => 
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) => 
      prev === totalSlides - 1 ? 0 : prev + 1
    );
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
                {landingPageContent.branding.brandName}
              </span>
            </div>
            
            {/* Navigation Links - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Features</a>
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">Products</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">About</a>
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
              <Button variant="primaryOutline" size="md">Learn More</Button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-3">
                  <a href="#features" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Features</a>
                  <a href="#products" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Products</a>
                  <a href="#about" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">About</a>
                  <a href="#contact" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm py-2">Contact</a>
                </div>
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <Button variant="primaryOutline" size="md" className="w-full">Learn More</Button>
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
                {landingPageContent.hero.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {landingPageContent.hero.subtitle}
              </p>
              <div className="flex flex-row sm:flex-row items-start space-x-4 sm:space-x-4 mb-6 sm:mb-8">
                <Button variant="primary" size="lg" className="!w-auto min-w-[160px]" onClick={handleGetStarted}>
                  Shop Now
                </Button>
                <Button variant="primaryOutline" size="lg" className="!w-auto min-w-[160px]" onClick={handleContactUs}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              {/* Hero Image/Illustration */}
              <div className="bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheckIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {landingPageContent.hero.visualTitle}
                  </h3>
                  <p className="text-gray-600">
                    {landingPageContent.hero.visualSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.sections.features.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.sections.features.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {landingPageContent.services.map((service, index) => {
              const IconComponent = {
                ShieldCheckIcon,
                PhoneIcon,
                TruckIcon,
                StarIcon
              }[service.icon] || ShieldCheckIcon;
              
              return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed text-center">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.sections.products.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.sections.products.subtitle}
            </p>
          </div>
          {/* Products Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentProductIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(landingPageContent.products.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {landingPageContent.products
                        .slice(slideIndex * 3, (slideIndex + 1) * 3)
                        .map((product, index) => (
                          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-9">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">{product.name}</h3>
                              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                              <div className="text-center">
                                <Button variant="primary" size="sm" className="w-full" onClick={() => handleViewDetails(product)}>
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {landingPageContent.products.length > 3 && (
              <>
                <button
                  onClick={handlePreviousProduct}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Previous product"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextProduct}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Next product"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {landingPageContent.products.length > 3 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentProductIndex 
                        ? 'bg-primary-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 sm:py-10 md:py-15 lg:py-15 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.about?.title || `About ${landingPageContent.company?.name || 'Our Company'}`}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.about?.subtitle || 'Learn more about our company and mission.'}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {landingPageContent.about?.heading || 'Our Story'}
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  {landingPageContent.company?.description || 'It all started in a small garage in 2020, where three friends with a shared passion for technology came together with a simple dream: to make cutting-edge technology accessible to everyone. What began as weekend projects and late-night coding sessions quickly evolved into something much bigger.'}
                </p>
                <p>
                  {landingPageContent.company?.storyPart2 || 'Our first breakthrough came when we helped a local business streamline its operations with a custom software solution. The success of that project fueled our ambition, and soon, word of mouth spread. We expanded our team, bringing in diverse talents who shared our commitment to innovation and customer satisfaction.'}
                </p>
                <p>
                  {landingPageContent.company?.storyPart3 || 'Today, TechStore stands as a testament to that initial dream. We are a trusted technology partner, serving thousands of customers worldwide with quality products and exceptional service. Our journey is ongoing, driven by the same passion that started it all, and a vision to continuously bridge the gap between technology and practical solutions for a seamless future.'}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {landingPageContent.about?.whyChooseTitle || 'Why Choose Us?'}
                </h4>
              </div>
              <div className="space-y-6">
                {landingPageContent.services?.slice(0, 3).map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-900 text-base mb-2">
                        {service.title || `Service ${index + 1}`}
                      </h6>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {service.description || 'Professional service description'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mission & Vision Section */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CursorArrowRaysIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {landingPageContent.about?.missionTitle || 'Our Mission'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {landingPageContent.about?.missionDescription || 'To provide innovative technology solutions that empower businesses and individuals to achieve their goals through reliable, high-quality products and exceptional customer service.'}
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LightBulbIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {landingPageContent.about?.visionTitle || 'Our Vision'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {landingPageContent.about?.visionDescription || 'To be the leading technology partner that bridges the gap between cutting-edge innovation and practical business solutions, creating a world where technology serves humanity seamlessly.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.sections.testimonials.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.sections.testimonials.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {landingPageContent.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.contact.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.contact.subtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {landingPageContent.contact.infoTitle}
              </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-gray-600">{landingPageContent.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-gray-600">{landingPageContent.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TruckIcon className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-gray-600">{landingPageContent.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {landingPageContent.contact.formTitle}
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={landingPageContent.contact.namePlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={landingPageContent.contact.emailPlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={landingPageContent.contact.subjectPlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder={landingPageContent.contact.messagePlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <Button variant="primary" size="md" className="w-full">
                  {landingPageContent.contact.submitButton}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 bg-gradient-to-r from-primary-400 to-indigo-600 opacity-90">
        <div className="w-full text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
            {landingPageContent.cta.title}
          </h2>
          <p className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10 font-medium">
            {landingPageContent.cta.subtitle}
          </p>
          <div className="flex flex-row sm:flex-row items-center justify-center space-x-4 sm:space-x-6">
            <Button variant="light" size="lg" className="!w-auto min-w-[160px]" onClick={handleLearnMore}>
              {landingPageContent.cta.button1}
            </Button>
            <Button variant="secondaryOutline" size="lg" className="!w-auto min-w-[160px] !border-white !text-white hover:!bg-white hover:!text-primary-600" onClick={handleContactUs}>
              {landingPageContent.cta.button2}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-gray-400 py-6 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm mb-2 sm:mb-0">
            {landingPageContent.sections.footer.copyright.replace('{brandName}', landingPageContent.branding.brandName)}
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/admin" className="text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Admin
            </Link>
            <span className="text-gray-600">•</span>
            <a href="#privacy" className="text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Privacy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#terms" className="text-gray-500 hover:text-gray-300 transition-colors duration-200">
              Terms
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <FloatingChatbot />

      {/* Get Started Modal */}
      {showGetStartedModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowGetStartedModal(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
              {/* Fixed Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">How to Get Started</h3>
                <button
                  onClick={() => setShowGetStartedModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="max-h-96 overflow-y-auto p-6">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Ready to start your wellness journey? Here's where you can order our premium herbal medicines:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Facebook Page</p>
                        <p className="text-xs text-gray-600">Message us on Facebook for orders and inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <PhoneIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone Orders</p>
                        <p className="text-xs text-gray-600">Call us directly for personalized service</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <EnvelopeIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Orders</p>
                        <p className="text-xs text-gray-600">Send us an email with your requirements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed Footer */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setShowGetStartedModal(false);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Products
                  </Button>
                  <Button 
                    variant="secondaryOutline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowGetStartedModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowProductModal(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
              {/* Fixed Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="max-h-96 overflow-y-auto p-6">
                <div className="space-y-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Product Benefits:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• 100% natural and organic ingredients</li>
                        <li>• Traditional herbal medicine properties</li>
                        <li>• Premium quality and purity guaranteed</li>
                        <li>• Expertly formulated for maximum effectiveness</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-green-900">Premium Quality</span>
                      </div>
                      <p className="text-xs text-green-700">
                        Certified organic and natural ingredients for your wellness journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed Footer */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setShowProductModal(false);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button 
                    variant="secondaryOutline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setShowProductModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;