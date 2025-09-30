import { createPortal } from 'react-dom';
import Button from './Button';
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon,
  iconColor = 'text-red-600',
  iconBgColor = 'bg-red-100',
  variant = 'danger',
  customContent,
  hasContent = false // New prop to determine if modal has content to display
}) => {
  if (!isOpen) return null;

  const getIconComponent = () => {
    switch (variant) {
      case 'danger':
        return XCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
      default:
        return XCircleIcon;
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'danger':
        return { iconColor: 'text-red-600', iconBgColor: 'bg-red-100' };
      case 'warning':
        return { iconColor: 'text-orange-600', iconBgColor: 'bg-orange-100' };
      case 'info':
        return { iconColor: 'text-blue-600', iconBgColor: 'bg-blue-100' };
      default:
        return { iconColor: 'text-red-600', iconBgColor: 'bg-red-100' };
    }
  };

  const IconComponent = getIconComponent();
  const iconStyles = getIconStyles();

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={onClose}></div>
        
        {/* Modal Content */}
        <div className={`relative z-50 w-full ${hasContent ? 'max-w-2xl max-h-[90vh]' : 'max-w-md'} overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl ${hasContent ? 'flex flex-col' : ''}`}>
          {/* Close Button - Only show when no cancel button */}
          {(!cancelLabel || cancelLabel === '') && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          
          {hasContent ? (
            <>
              {/* Fixed Header */}
              <div className="flex-shrink-0 p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconStyles.iconBgColor}`}>
                    <IconComponent className={`w-5 h-5 ${iconStyles.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {title}
                    </h3>
                    {message && (
                      <p className="text-sm text-gray-500 mt-1">
                        {message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                {customContent}
              </div>
            </>
          ) : (
            <>
              {/* Standard Modal Layout */}
              <div className="p-6">
                <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${iconStyles.iconBgColor}`}>
                  <IconComponent className={`w-6 h-6 ${iconStyles.iconColor}`} />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {message}
                  </p>
                </div>
                
                {/* Custom Content */}
                {customContent ? (
                  customContent
                ) : (
                  <div className="flex flex-row space-x-3">
                    <Button
                      onClick={onConfirm}
                      variant={variant === 'danger' ? 'danger' : variant === 'warning' ? 'warning' : 'primary'}
                      size="md"
                      className="w-full"
                    >
                      {confirmLabel}
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="primaryOutline"
                      size="md"
                      className="w-full"
                    >
                      {cancelLabel}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
