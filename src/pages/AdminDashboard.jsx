import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PencilIcon,
  EyeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon,
  DocumentArrowDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import ConfirmationModal from '../components/ConfirmationModal';
import FormModal from '../components/FormModal';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';
import auditService from '../services/auditService';
import faqService from '../services/faqService';

const AdminDashboard = () => {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  
  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: '',
    keywords: '',
    category: '',
    priority: 1,
    status: 'active'
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  // FAQ form fields (same as FAQ Management)
  const formFields = [
    {
      name: 'question',
      type: 'String',
      label: 'Question',
      placeholder: 'Enter the frequently asked question',
      required: true
    },
    {
      name: 'answer',
      type: 'String',
      label: 'Answer',
      placeholder: 'Enter the detailed answer for the chatbot',
      required: true
    },
    {
      name: 'keywords',
      type: 'String',
      label: 'Keywords',
      placeholder: 'Enter keywords separated by commas (e.g., shipping, delivery, cost)',
      required: true
    },
    {
      name: 'category',
      type: 'String',
      label: 'Category',
      placeholder: 'Select category',
      required: true
    },
    {
      name: 'priority',
      type: 'Number',
      label: 'Priority',
      placeholder: 'Select priority (1-10)',
      required: true
    },
    {
      name: 'status',
      type: 'String',
      label: 'Status',
      placeholder: 'Select status',
      required: true
    }
  ];

  // FAQ handlers
  const handleFAQSubmit = async (formData) => {
    try {
      if (editingFAQ) {
        // Update existing FAQ
        const updatedFAQ = await faqService.updateFAQ(editingFAQ.id, formData);
        auditService.logFAQUpdate(updatedFAQ);
        toast.success('FAQ updated successfully!');
      } else {
        // Create new FAQ
        const newFAQ = await faqService.createFAQ(formData);
        auditService.logFAQCreate(newFAQ);
        toast.success('FAQ created successfully!');
      }
      setShowFAQModal(false);
      setEditingFAQ(null);
      setFaqFormData({
        question: '',
        answer: '',
        keywords: '',
        category: '',
        priority: 1,
        status: 'active'
      });
    } catch (error) {
      toast.error('Failed to save FAQ');
    }
  };

  const handleAddFAQ = () => {
    setEditingFAQ(null);
    setFaqFormData({
      question: '',
      answer: '',
      keywords: '',
      category: '',
      priority: 1,
      status: 'active'
    });
    setShowFAQModal(true);
  };

  // Export functions
  const handleExportCSV = () => {
    try {
      // Sample dashboard data for export
      const dashboardData = [
        { metric: 'Total Visitors', value: '1,234', change: '+12%', period: 'From last month' },
        { metric: 'Content Sections', value: '5', status: 'Active', description: 'Hero, Company, Services' },
        { metric: 'System Status', value: '24/7', status: 'Online', description: 'All systems operational' },
        { metric: 'Page Performance', value: '89%', change: '+8%', period: 'From last week' }
      ];

      // Convert to CSV
      const headers = ['Metric', 'Value', 'Change/Status', 'Description/Period'];
      const csvContent = [
        headers.join(','),
        ...dashboardData.map(row => [
          `"${row.metric}"`,
          `"${row.value}"`,
          `"${row.change || row.status || ''}"`,
          `"${row.description || row.period || ''}"`
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `dashboard-data-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Log the export action
      auditService.logExport('CSV', 'Dashboard Data', 1);
      toast.success('Dashboard data exported as CSV successfully!');
      setShowExportModal(false);
    } catch (error) {
      toast.error('Failed to export CSV file');
    }
  };

  const handleExportPDF = () => {
    try {
      // Create a simple HTML content for PDF
      const content = `
        <html>
          <head>
            <title>Dashboard Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Dashboard Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Change/Status</th>
                <th>Description</th>
              </tr>
              <tr>
                <td>Total Visitors</td>
                <td>1,234</td>
                <td>+12%</td>
                <td>From last month</td>
              </tr>
              <tr>
                <td>Content Sections</td>
                <td>5</td>
                <td>Active</td>
                <td>Hero, Company, Services</td>
              </tr>
              <tr>
                <td>System Status</td>
                <td>24/7</td>
                <td>Online</td>
                <td>All systems operational</td>
              </tr>
              <tr>
                <td>Page Performance</td>
                <td>89%</td>
                <td>+8%</td>
                <td>From last week</td>
              </tr>
            </table>
          </body>
        </html>
      `;

      // Create a hidden iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      // Write content to iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(content);
      iframeDoc.close();

      // Wait for iframe to load, then print
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        
        // Clean up iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };

      // Log the export action
      auditService.logExport('PDF', 'Dashboard Data', 1);
      toast.success('Dashboard report opened for PDF export!');
      setShowExportModal(false);
    } catch (error) {
      toast.error('Failed to export PDF file');
    }
  };


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
        icon="EllipsisVerticalIcon"
        label="Quick Actions"
        quickActions={[
          { 
            name: 'Export Data', 
            icon: 'DocumentArrowDownIcon', 
            action: () => setShowExportModal(true), 
            color: 'bg-green-600' 
          },
          { 
            name: 'Add New FAQ', 
            icon: 'PlusIcon', 
            action: handleAddFAQ, 
            color: 'bg-primary-600' 
          }
        ]}
        selectedCount={0}
      />

      {/* Export Modal */}
      <ConfirmationModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => {}} // No default confirm action
        title="Export Dashboard Data"
        message="Choose export format for dashboard data:"
        confirmLabel=""
        cancelLabel=""
        variant="info"
        customContent={
          <div className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleExportPDF}
                className="w-full flex items-center justify-center space-x-2"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                <span>Export as PDF</span>
              </Button>
              
              <Button
                variant="secondaryOutline"
                size="lg"
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center space-x-2"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                <span>Export as CSV</span>
              </Button>
            </div>
          </div>
        }
      />

      {/* FAQ Modal */}
      <FormModal
        isOpen={showFAQModal}
        onClose={() => {
          setShowFAQModal(false);
          setEditingFAQ(null);
          setFaqFormData({
            question: '',
            answer: '',
            keywords: '',
            category: '',
            priority: 1,
            status: 'active'
          });
        }}
        onSubmit={handleFAQSubmit}
        title={editingFAQ ? "Edit FAQ" : "Add New FAQ"}
        fields={formFields}
        initialData={editingFAQ || faqFormData}
        loading={false}
        isUpdate={!!editingFAQ}
      />
    </>
  );
};

export default AdminDashboard;
