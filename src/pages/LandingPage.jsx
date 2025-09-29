import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, StarIcon, CheckIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import FloatingChatbot from '../components/FloatingChatbot';
import { useApp } from '../hooks/useApp';

const LandingPage = () => {
  const { landingPageContent } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{landingPageContent.company.name}</span>
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
              <Link to="/admin/login">
                <Button variant="ghost" size="md" className="!w-auto">Admin Login</Button>
              </Link>
              <Button variant="primaryOutline" size="md">Get Started</Button>
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
                  <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="md" className="w-full">Admin Login</Button>
                  </Link>
                  <Button variant="primaryOutline" size="md" className="w-full">Get Started</Button>
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
                <Button variant="primary" size="lg" className="!w-auto min-w-[160px]">
                  {landingPageContent.hero.ctaPrimary}
                </Button>
                <Button variant="primaryOutline" size="lg" className="!w-auto min-w-[160px]">
                  {landingPageContent.hero.ctaSecondary}
                </Button>
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              {/* Hero Image/Illustration */}
              <div className="w-full h-80 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🛍️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">E-commerce Store</h3>
                  <p className="text-primary-600">Quality products, exceptional service</p>
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
              Everything You Need to Succeed
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Comprehensive services designed to meet your e-commerce needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {landingPageContent.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Discover our carefully curated selection of quality products.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {landingPageContent.products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">{product.price}</span>
                    <Button variant="primary" size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                About {landingPageContent.company.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                {landingPageContent.company.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm text-gray-700">Quality guaranteed products</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm text-gray-700">Fast and reliable shipping</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm text-gray-700">24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quality Products</h4>
                    <p className="text-sm text-gray-600">Carefully selected items from trusted brands</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Quick and secure shipping to your doorstep</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Customer Support</h4>
                    <p className="text-sm text-gray-600">Dedicated support team ready to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {landingPageContent.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
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
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-sm text-gray-600">{landingPageContent.company.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-sm text-gray-600">{landingPageContent.company.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-sm text-gray-600">{landingPageContent.company.email}</p>
                </div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-sm text-gray-600">{landingPageContent.company.hours}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your message"
                  />
                </div>
                <Button variant="primary" size="md" className="w-full">
                  Send Message
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
            Ready to Start Shopping?
          </h2>
          <p className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10 font-medium">
            Join thousands of satisfied customers who trust us for their e-commerce needs.
          </p>
          <div className="flex flex-row sm:flex-row items-center justify-center space-x-4 sm:space-x-6">
            <Button variant="light" size="lg" className="!w-auto min-w-[160px]">
              Shop Now
            </Button>
            <Button variant="secondaryOutline" size="lg" className="!w-auto min-w-[160px] !border-white !text-white hover:!bg-white hover:!text-primary-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-gray-400 py-6 px-4 sm:px-6">
        <p className="text-xs sm:text-sm">&copy; 2024 {landingPageContent.company.name}. All rights reserved.</p>
      </footer>

      {/* Floating Elements */}
      <FloatingChatbot />
    </div>
  );
};

export default LandingPage;
