import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowPathIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import { useApp } from '../hooks/useApp';
import auditService from '../services/auditService';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const { loginAdmin } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginAdmin(formData);
      // Log successful login
      auditService.logLogin();
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-sm w-full space-y-6">
        {/* Admin Login Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <img src="/vite.svg" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-sm text-gray-600 mb-4">Sign in to access the admin dashboard</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <InputFactory
              fieldName="email"
              config={{
                type: 'String',
                label: 'Email address',
                placeholder: 'admin@techstore.com',
                required: true,
                format: 'email'
              }}
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
            />

            {/* Password Field */}
            <div className="relative">
              <InputFactory
                fieldName="password"
                config={{
                  type: 'String',
                  label: 'Password',
                  placeholder: 'Enter your password',
                  required: true,
                  format: 'password',
                  showPasswordToggle: true
                }}
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> admin@techstore.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>

        {/* Back to Landing Page Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need to go back?{' '}
            <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
              Return to landing page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
