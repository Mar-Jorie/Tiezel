import { useState } from 'react';
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  EyeIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

const ProjectModal = ({ 
  isOpen, 
  onClose, 
  project, 
  projectIndex 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    const images = project.showcaseImages || project.images;
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    const images = project.showcaseImages || project.images;
    if (images && images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 z-40 transition-opacity bg-black/50" 
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative z-50 w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Fixed Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{project.title || project.name}</h2>
              {project.category && (
                <p className="text-sm text-gray-600 mt-1">{project.category}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Project Images Carousel */}
            {(project.showcaseImages || project.images) && (project.showcaseImages || project.images).length > 0 && (
              <div className="relative bg-gray-100">
                <div className="h-64 relative overflow-hidden">
                  {/* Main Image */}
                  <img
                    src={(project.showcaseImages || project.images)[currentImageIndex]}
                    alt={`${project.title || project.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {(project.showcaseImages || project.images).length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  {(project.showcaseImages || project.images).length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {(project.showcaseImages || project.images).length}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Navigation */}
                {(project.showcaseImages || project.images).length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex space-x-2 overflow-x-auto">
                      {(project.showcaseImages || project.images).map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex 
                              ? 'border-primary-500' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Details */}
            <div className="p-6 space-y-6">
              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Project</h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Project Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technologies */}
                {project.technologies && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <CodeBracketIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Technologies Used
                    </h4>
                    <p className="text-gray-600">{project.technologies}</p>
                  </div>
                )}

                {/* Status */}
                {project.status && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <TagIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Project Status
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                )}

                {/* Category */}
                {project.category && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <TagIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Category
                    </h4>
                    <p className="text-gray-600">{project.category}</p>
                  </div>
                )}

                {/* Date */}
                {project.date && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Project Date
                    </h4>
                    <p className="text-gray-600">{project.date}</p>
                  </div>
                )}
              </div>

              {/* Project Details List */}
              {project.details && project.details.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features & Details</h3>
                  <ul className="space-y-2">
                    {project.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <GlobeAltIcon className="h-4 w-4 mr-2" />
                        View Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <CodeBracketIcon className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            <Button
              onClick={onClose}
              variant="primaryOutline"
              size="md"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
