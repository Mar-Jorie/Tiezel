import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PencilIcon,
  EyeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import { useApp } from '../hooks/useApp';

const AdminDashboard = () => {
  const { isAdmin } = useApp();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }


  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your landing page today.
        </p>
      </div>

      <div className="space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-xs font-medium text-green-800 bg-green-50 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">1,234</h3>
            <p className="text-sm text-gray-600 mb-2">Total Visitors</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">From last month</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-green-800">12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-800 bg-blue-50 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
            <p className="text-sm text-gray-600 mb-2">Content Sections</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Hero, Company, Services</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-blue-800">Updated</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CogIcon className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-800 bg-green-50 px-2 py-1 rounded-full">
                Online
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">24/7</h3>
            <p className="text-sm text-gray-600 mb-2">System Status</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">All systems operational</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-green-800">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-800 bg-orange-50 px-2 py-1 rounded-full">
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">89%</h3>
            <p className="text-sm text-gray-600 mb-2">Page Performance</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">From last week</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-orange-800">8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Management Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
              <div className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center">
                <PencilIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Hero section updated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Company info modified</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New service added</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CogIcon className="h-6 w-6 text-green-800" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CDN</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Floating Action Button */}
      <SmartFloatingActionButton
        variant="dots"
        icon="EllipsisVerticalIcon"
        label="Quick Actions"
        quickActions={[
          { 
            name: 'Manage Content', 
            icon: 'PencilIcon', 
            action: () => navigate('/admin/content'), 
            color: 'bg-primary-600' 
          },
          { 
            name: 'View Settings', 
            icon: 'CogIcon', 
            action: () => navigate('/admin/settings'), 
            color: 'bg-gray-600' 
          }
        ]}
        bulkActions={[
          { 
            name: 'Export Data', 
            icon: 'DocumentArrowDownIcon', 
            action: () => console.log('Export data'), 
            color: 'bg-green-600' 
          },
          { 
            name: 'Bulk Update', 
            icon: 'PencilIcon', 
            action: () => console.log('Bulk update'), 
            color: 'bg-orange-600' 
          }
        ]}
        selectedCount={0}
      />
    </>
  );
};

export default AdminDashboard;
