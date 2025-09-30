import { createPortal } from 'react-dom';
import Button from './Button';
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon,
  XCircleIcon
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
  variant = 'danger'
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
        <div className="relative z-50 w-full max-w-md p-6 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl">
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
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
