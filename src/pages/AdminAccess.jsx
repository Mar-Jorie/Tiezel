import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';

const AdminAccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full space-y-6">
        {/* Admin Access Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
            <p className="text-gray-600 mb-8">
              Access the admin dashboard to manage your landing page content.
            </p>
          </div>
          
          {/* Admin Login Button */}
          <div className="space-y-4">
            <Link to="/admin/login" className="block">
              <Button variant="primary" size="lg" className="w-full">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                Admin Login
              </Button>
            </Link>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Authorized personnel only
              </p>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Secure Admin Access
              </h3>
              <p className="text-sm text-blue-700">
                This area is restricted to authorized administrators only. 
                Please ensure you have proper credentials before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
