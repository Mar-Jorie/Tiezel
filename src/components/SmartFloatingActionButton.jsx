import { useState } from 'react';
import { 
  PlusIcon, 
  EllipsisVerticalIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  CheckCircleIcon,
  PlayIcon,
  EyeIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const SmartFloatingActionButton = ({ 
  variant = 'single', // 'single' or 'dots'
  icon = 'PlusIcon', // Icon name as string
  label = 'Add new item',
  action,
  selectedCount = 0,
  bulkActions = [],
  quickActions = []
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Icon component resolution
  const getIconComponent = (iconName) => {
    const iconMap = {
      PlusIcon,
      EllipsisVerticalIcon,
      ArrowUpTrayIcon,
      ArrowDownTrayIcon,
      TrashIcon,
      CalendarDaysIcon,
      UserPlusIcon,
      CheckCircleIcon,
      PlayIcon,
      EyeIcon,
      PreviewIcon: EyeIcon, // Map PreviewIcon to EyeIcon
      PencilIcon,
      DocumentArrowDownIcon,
      DocumentArrowUpIcon,
      XCircleIcon
    };
    return iconMap[iconName] || EllipsisVerticalIcon;
  };

  // Determine current variant and actions based on available actions
  const currentActions = quickActions.length > 0 ? quickActions : bulkActions;
  const hasActions = currentActions.length > 0;
  
  // Use the single action's icon if only one action, otherwise use the passed icon
  const buttonIcon = hasActions && currentActions.length === 1 ? currentActions[0].icon : icon;
  const IconComponent = getIconComponent(buttonIcon);
  
  // Auto-determine variant: single if 1 action, dots if multiple actions
  const currentVariant = hasActions && currentActions.length === 1 ? 'single' : 'dots';
  const currentLabel = hasActions && currentActions.length === 1 ? currentActions[0].name : label;

  const handleMainButtonClick = () => {
    if (currentVariant === 'single') {
      // Use the single action's action function
      currentActions[0]?.action?.();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleActionClick = (actionItem) => {
    actionItem.action?.();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Expanded Floating Buttons */}
      {currentVariant === 'dots' && isExpanded && (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end space-y-3">
          {currentActions.map((actionItem, index) => (
            <div 
              key={actionItem.name}
              className="flex items-center space-x-3"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInFromBottom 0.3s ease-out forwards'
              }}
            >
              {/* Action Label */}
              <div className="bg-white px-2 py-1 rounded-lg shadow-card border border-gray-200">
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  {actionItem.name}
                </span>
              </div>
              
              {/* Action Button */}
              <button
                onClick={() => handleActionClick(actionItem)}
                className={`w-12 h-12 ${actionItem.color || 'bg-primary-600'} text-white rounded-full shadow-card flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-card-hover`}
                aria-label={actionItem.name}
              >
                {actionItem.icon && (() => {
                  const ActionIconComponent = getIconComponent(actionItem.icon);
                  return <ActionIconComponent className="h-5 w-5" />;
                })()}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={handleMainButtonClick}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-card-hover ${
          currentVariant === 'dots' && isExpanded ? 'rotate-90' : ''
        }`}
        aria-label={currentLabel}
      >
        <IconComponent className="h-5 w-5" />
      </button>

      {/* CSS for animations */}
      <style>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
      `}</style>
    </>
  );
};

export default SmartFloatingActionButton;
