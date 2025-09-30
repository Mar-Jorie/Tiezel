import React from 'react';
import { 
  Bars3Icon, 
  StarIcon, 
  CheckIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeartIcon, 
  CursorArrowRaysIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';
import Button from './Button';

const LandingPagePreview = ({ landingPageContent }) => {
  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactUs = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      ShoppingBagIcon,
      TruckIcon,
      ShieldCheckIcon,
      HeartIcon,
      StarIcon
    };
    
    const IconComponent = iconMap[iconName] || StarIcon;
    return <IconComponent className="h-8 w-8 text-primary-600" />;
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
                {landingPageContent.branding?.logo ? (
                  <img src={landingPageContent.branding.logo} alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                ) : (
                  <img src="/vite.svg" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                )}
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                {landingPageContent.branding?.brandName || landingPageContent.company?.name || 'Our Company'}
              </span>
            </div>
            
            {/* Navigation Links - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">{landingPageContent.navigation?.link1 || 'Features'}</a>
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">{landingPageContent.navigation?.link2 || 'Products'}</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">{landingPageContent.navigation?.link3 || 'About'}</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">{landingPageContent.navigation?.link4 || 'Contact'}</a>
            </div>
            
            {/* Desktop CTA Buttons - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="primaryOutline" size="md" onClick={handleContactUs}>{landingPageContent.navigation?.ctaButton2 || 'Contact Us'}</Button>
            </div>
          </div>
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
                <Button variant="primary" size="lg" className="!w-auto min-w-[160px]" onClick={handleLearnMore}>
                  {landingPageContent.hero.ctaPrimary || 'Learn More'}
                </Button>
                <Button variant="primaryOutline" size="lg" className="!w-auto min-w-[160px]" onClick={handleContactUs}>
                  {landingPageContent.hero.ctaSecondary || 'Contact Us'}
                </Button>
              </div>
            </div>
            <div className="relative order-last lg:order-last">
              {/* Hero Visual Section */}
              <div className="w-full h-80 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  {/* Central Icon */}
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {landingPageContent.hero?.heroIcon === 'ShoppingBagIcon' ? (
                      <ShoppingBagIcon className="h-8 w-8 text-white" />
                    ) : landingPageContent.hero?.heroIcon === 'TruckIcon' ? (
                      <TruckIcon className="h-8 w-8 text-white" />
                    ) : landingPageContent.hero?.heroIcon === 'ShieldCheckIcon' ? (
                      <ShieldCheckIcon className="h-8 w-8 text-white" />
                    ) : landingPageContent.hero?.heroIcon === 'HeartIcon' ? (
                      <HeartIcon className="h-8 w-8 text-white" />
                    ) : (
                      <ShoppingBagIcon className="h-8 w-8 text-white" />
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {landingPageContent.hero?.visualTitle || 'Your Store'}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-primary-600 text-sm">
                    {landingPageContent.hero?.visualSubtitle || 'Quality products, exceptional service'}
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
              {landingPageContent.sections?.features?.title || 'Everything You Need to Succeed'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.sections?.features?.subtitle || 'Comprehensive tools designed to streamline your project management workflow.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {landingPageContent.features?.slice(0, 4).map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIconComponent(feature.icon)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed text-center">{feature.description}</p>
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
              {landingPageContent.sections?.products?.title || 'Featured Products'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.sections?.products?.subtitle || 'Discover our carefully curated selection of premium products.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {landingPageContent.products?.slice(0, 3).map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">
                      {(() => {
                        const price = product.price;
                        if (typeof price === 'object' && price?.amount && price?.currency) {
                          if (price.currency === 'PHP' || price.currency === 'USD') {
                            return `₱${parseFloat(price.amount).toLocaleString()}`;
                          }
                          return `${price.currency}${parseFloat(price.amount).toLocaleString()}`;
                        }
                        if (typeof price === 'string') {
                          if (price.includes('USD')) {
                            const amount = price.replace(/USD/g, '').replace(/\D/g, '');
                            return `₱${parseFloat(amount).toLocaleString()}`;
                          }
                          if (price.includes('$')) {
                            const amount = price.replace(/\$/g, '').replace(/\D/g, '');
                            return `₱${parseFloat(amount).toLocaleString()}`;
                          }
                          if (/^\d+$/.test(price)) {
                            return `₱${parseFloat(price).toLocaleString()}`;
                          }
                          return price;
                        }
                        return 'Price on request';
                      })()}
                    </span>
                    <span className="text-xs font-medium text-green-800 bg-green-50 px-2 py-1 rounded-full">
                      Featured Product
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
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

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              {landingPageContent.contact?.title || 'Get in Touch'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
              {landingPageContent.contact?.subtitle || 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'}
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
                  <input
                    type="text"
                    placeholder={landingPageContent.contact?.namePlaceholder || 'Your Name'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder={landingPageContent.contact?.emailPlaceholder || 'Your Email'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder={landingPageContent.contact?.subjectPlaceholder || 'Subject'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <textarea
                  rows={4}
                  placeholder={landingPageContent.contact?.messagePlaceholder || 'Your Message'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                ></textarea>
                <Button type="submit" variant="primary" size="md" className="w-full">
                  {landingPageContent.contact?.submitButton || 'Send Message'}
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
            {landingPageContent.cta?.title || 'Ready to Learn More?'}
          </h2>
          <p className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10 font-medium">
            {landingPageContent.cta?.subtitle || 'Get in touch with us to learn more about our products and services.'}
          </p>
          <div className="flex flex-row sm:flex-row items-center justify-center space-x-4 sm:space-x-6">
            <Button variant="light" size="lg" className="!w-auto min-w-[160px]" onClick={handleLearnMore}>
              {landingPageContent.cta?.button1 || 'Learn More'}
            </Button>
            <Button variant="secondaryOutline" size="lg" className="!w-auto min-w-[160px] !border-white !text-white hover:!bg-white hover:!text-primary-600" onClick={handleContactUs}>
              {landingPageContent.cta?.button2 || 'Contact Us'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center text-gray-400 py-6 px-4 sm:px-6">
        <p className="text-xs sm:text-sm">{landingPageContent.sections?.footer?.copyright || `© 2024 ${landingPageContent.branding?.brandName || landingPageContent.company?.name || 'Our Company'}. All rights reserved.`}</p>
      </footer>
    </div>
  );
};

export default LandingPagePreview;
