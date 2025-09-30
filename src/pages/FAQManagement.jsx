import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import FormModal from '../components/FormModal';
import ConfirmationModal from '../components/ConfirmationModal';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import CollapsibleTable from '../components/CollapsibleTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import auditService from '../services/auditService';
import { toast } from 'react-hot-toast';
import faqService from '../services/faqService';

const FAQManagement = () => {
  // Load FAQ data from service
  const [faqData, setFaqData] = useState([]);

  // Load FAQ data on component mount
  useEffect(() => {
    setFaqData(faqService.faqData);
  }, []);

  // State management
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkActivateModal, setShowBulkActivateModal] = useState(false);
  const [showBulkDeactivateModal, setShowBulkDeactivateModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });

  // Individual action modal states
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusConfirmAction, setStatusConfirmAction] = useState(null);
  const [statusConfirmFAQ, setStatusConfirmFAQ] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingFAQ, setViewingFAQ] = useState(null);

  // Filter options
  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'Products', label: 'Products' },
    { value: 'Shipping', label: 'Shipping' },
    { value: 'Support', label: 'Support' },
    { value: 'Returns', label: 'Returns' },
    { value: 'Account', label: 'Account' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Search and filter handlers
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
    setCurrentPage(1);
  };

  const priorityOptions = [
    { value: 1, label: '1 - Lowest' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10 - Highest' }
  ];

  // Form fields configuration
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

  // Filter FAQ data
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = !searchValue || 
      faq.question.toLowerCase().includes(searchValue.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchValue.toLowerCase()) ||
      faq.keywords.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = !filters.category || faq.category === filters.category;
    const matchesStatus = !filters.status || faq.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFAQs = filteredFAQs.slice(startIndex, endIndex);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      if (editingFAQ) {
        // Update existing FAQ
        faqService.updateFAQ(editingFAQ.id, formData);
        setFaqData([...faqService.faqData]);
        // Log FAQ update
        auditService.logFAQUpdate(formData.question);
        toast.success('FAQ updated successfully!');
      } else {
        // Create new FAQ
        faqService.addFAQ(formData);
        setFaqData([...faqService.faqData]);
        // Log FAQ creation
        auditService.logFAQCreate(formData.question);
        toast.success('FAQ created successfully!');
      }
      
      setShowModal(false);
      setEditingFAQ(null);
    } catch (error) {
      toast.error('Failed to save FAQ');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = (faq) => {
    setEditingFAQ(faq);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (editingFAQ) {
      // Log FAQ deletion
      auditService.logFAQDelete(editingFAQ.question);
      faqService.deleteFAQ(editingFAQ.id);
      setFaqData([...faqService.faqData]);
      toast.success('FAQ deleted successfully!');
      setShowDeleteModal(false);
      setEditingFAQ(null);
    }
  };

  // Handle bulk operations
  const handleBulkStatusChange = (newStatus) => {
    const updatedFAQs = faqData.map(faq => 
      selectedRows.has(faq.id) ? { ...faq, status: newStatus } : faq
    );
    setFaqData(updatedFAQs);
    setSelectedRows(new Set());
    toast.success(`Updated ${selectedRows.size} FAQ(s) to ${newStatus}`);
  };

  const handleBulkDelete = () => {
    setFaqData(prev => prev.filter(faq => !selectedRows.has(faq.id)));
    setSelectedRows(new Set());
    toast.success(`Deleted ${selectedRows.size} FAQ(s)`);
  };

  // Bulk operation handlers with confirmation modals
  const handleBulkActivateClick = () => {
    setShowBulkActivateModal(true);
  };

  const handleBulkDeactivateClick = () => {
    setShowBulkDeactivateModal(true);
  };

  const handleBulkDeleteClick = () => {
    setShowBulkDeleteModal(true);
  };

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  // Individual row status toggle handlers
  const handleToggleStatus = (faqId) => {
    const faq = faqData.find(f => f.id === faqId);
    setStatusConfirmFAQ(faq);
    setStatusConfirmAction(faq.status === 'active' ? 'deactivate' : 'activate');
    setShowStatusConfirmModal(true);
  };

  const confirmStatusToggle = () => {
    if (statusConfirmFAQ && statusConfirmAction) {
      const newStatus = statusConfirmAction === 'activate' ? 'active' : 'inactive';
      // Log FAQ status change
      auditService.logFAQStatusChange(statusConfirmFAQ.question, newStatus);
      faqService.updateFAQ(statusConfirmFAQ.id, { status: newStatus });
      setFaqData([...faqService.faqData]);
      toast.success(`FAQ ${statusConfirmAction === 'activate' ? 'activated' : 'deactivated'} successfully`);
      setShowStatusConfirmModal(false);
      setStatusConfirmFAQ(null);
      setStatusConfirmAction(null);
    }
  };

  // View FAQ handler
  const handleViewFAQ = (faqId) => {
    const faq = faqData.find(f => f.id === faqId);
    setViewingFAQ(faq);
    setShowViewModal(true);
  };

  const confirmBulkActivate = () => {
    // Log bulk activation
    auditService.logBulkFAQStatusChange('activate', selectedRows.size);
    handleBulkStatusChange('active');
    setShowBulkActivateModal(false);
  };

  const confirmBulkDeactivate = () => {
    // Log bulk deactivation
    auditService.logBulkFAQStatusChange('deactivate', selectedRows.size);
    handleBulkStatusChange('inactive');
    setShowBulkDeactivateModal(false);
  };

  const confirmBulkDelete = () => {
    // Log bulk deletion
    auditService.logBulkFAQDelete(selectedRows.size);
    handleBulkDelete();
    setShowBulkDeleteModal(false);
  };

  const handleExportPDF = () => {
    try {
      const selectedFAQs = faqData.filter(faq => selectedRows.has(faq.id));
      
      // Create a formatted report for PDF export
      const reportContent = `
        <html>
          <head>
            <title>FAQ Export Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .report-title { font-size: 24px; font-weight: bold; color: #333; }
              .report-date { color: #666; margin-top: 10px; }
              .faq-entry { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
              .faq-question { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
              .faq-answer { color: #666; line-height: 1.6; margin-bottom: 15px; }
              .faq-meta { background-color: #e9ecef; padding: 10px; border-radius: 5px; font-size: 12px; }
              .faq-meta-item { margin-bottom: 5px; }
              .faq-label { font-weight: bold; color: #333; }
              .faq-value { color: #666; margin-left: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="report-title">FAQ Export Report</div>
              <div class="report-date">Generated on ${new Date().toLocaleDateString()}</div>
              <div class="report-date">Total FAQs: ${selectedFAQs.length}</div>
            </div>
            ${selectedFAQs.map((faq, index) => `
              <div class="faq-entry">
                <div class="faq-question">Q${index + 1}: ${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
                <div class="faq-meta">
                  <div class="faq-meta-item">
                    <span class="faq-label">Category:</span>
                    <span class="faq-value">${faq.category}</span>
                  </div>
                  <div class="faq-meta-item">
                    <span class="faq-label">Keywords:</span>
                    <span class="faq-value">${faq.keywords}</span>
                  </div>
                  <div class="faq-meta-item">
                    <span class="faq-label">Priority:</span>
                    <span class="faq-value">${faq.priority}</span>
                  </div>
                  <div class="faq-meta-item">
                    <span class="faq-label">Status:</span>
                    <span class="faq-value">${faq.status}</span>
                  </div>
                  <div class="faq-meta-item">
                    <span class="faq-label">Last Updated:</span>
                    <span class="faq-value">${faq.lastUpdated}</span>
                  </div>
                </div>
              </div>
            `).join('')}
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
      iframeDoc.write(reportContent);
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

      // Log export action
      auditService.logFAQExport('PDF', selectedRows.size);
      toast.success('Print dialog opened for PDF export!');
      setShowExportModal(false);
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const handleExportCSV = () => {
    try {
      const selectedFAQs = faqData.filter(faq => selectedRows.has(faq.id));
      
      // Create CSV content
      const csvData = [
        ['Question', 'Answer', 'Category', 'Keywords', 'Priority', 'Status', 'Last Updated']
      ];

      selectedFAQs.forEach(faq => {
        csvData.push([
          faq.question,
          faq.answer,
          faq.category,
          faq.keywords,
          faq.priority,
          faq.status,
          faq.lastUpdated
        ]);
      });

      // Convert to CSV
      const csvContent = csvData.map(row => 
        row.map(field => `"${field}"`).join(',')
      ).join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `faq-export-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Log export action
      auditService.logFAQExport('CSV', selectedRows.size);
      toast.success('FAQs exported as CSV successfully!');
      setShowExportModal(false);
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  // Handle row selection
  const handleRowSelect = (faqId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(faqId)) {
      newSelected.delete(faqId);
    } else {
      newSelected.add(faqId);
    }
    setSelectedRows(newSelected);
  };


  const handleSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  // Quick actions for FAB - No selection (single add button)
  const quickActionsNoSelection = [
    { 
      name: 'Add FAQ', 
      icon: 'PlusIcon', 
      action: () => {
        setEditingFAQ(null);
        setShowModal(true);
      }, 
      color: 'bg-primary-600' 
    }
  ];

  // Smart bulk actions based on selected FAQ statuses
  const getSmartBulkActions = () => {
    const selectedFAQs = faqData.filter(faq => selectedRows.has(faq.id));
    const hasActiveFAQs = selectedFAQs.some(faq => faq.status === 'active');
    const hasInactiveFAQs = selectedFAQs.some(faq => faq.status === 'inactive');
    
    const actions = [];
    
    // Only show activate button if there are inactive FAQs
    if (hasInactiveFAQs) {
      actions.push({
        name: 'Bulk Activate',
        icon: 'CheckCircleIcon',
        action: handleBulkActivateClick,
        color: 'bg-green-600'
      });
    }
    
    // Only show deactivate button if there are active FAQs
    if (hasActiveFAQs) {
      actions.push({
        name: 'Bulk Deactivate',
        icon: 'XCircleIcon',
        action: handleBulkDeactivateClick,
        color: 'bg-orange-600'
      });
    }
    
    // Always show delete and export
    actions.push(
      {
        name: 'Bulk Delete',
        icon: 'TrashIcon',
        action: handleBulkDeleteClick,
        color: 'bg-red-600'
      },
      {
        name: 'Export Selected',
        icon: 'ArrowDownTrayIcon',
        action: handleExportClick,
        color: 'bg-blue-600'
      }
    );
    
    return actions;
  };

  // Bulk actions for FAB - When items are selected (3 dots with bulk operations)
  const quickActionsWithSelection = getSmartBulkActions();

  // Define table columns
  const columns = [
    {
      key: 'question',
      label: 'Question',
      render: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value) => (
        <span className="text-sm text-gray-900">{value}</span>
      )
    }
  ];

  // Define expandable content
  const expandableContent = (item) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Answer:</h4>
        <p className="text-sm text-gray-600">{item.answer}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Keywords:</h4>
        <div className="flex flex-wrap gap-2">
          {(() => {
            // Handle both string and array formats
            let keywordsArray = [];
            if (item.keywords) {
              if (typeof item.keywords === 'string') {
                // Split string by comma and trim whitespace
                keywordsArray = item.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
              } else if (Array.isArray(item.keywords)) {
                keywordsArray = item.keywords;
              }
            }
            
            return keywordsArray.length > 0 ? (
              keywordsArray.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">No keywords set</span>
            );
          })()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-medium text-gray-500">Last Updated:</span>
          <p className="text-sm text-gray-900">
            {new Date(item.lastUpdated).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500">Created By:</span>
          <p className="text-sm text-gray-900">{item.createdBy}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          FAQ Management
        </h1>
        <p className="text-gray-600">
          Manage frequently asked questions and chatbot responses for your website.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <SearchFilter
          placeholder="Search FAQs..."
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filters}
          useSelectForSearch={false}
          statusOptions={statusOptions}
          className="bg-gray-50 border-gray-200"
        />
      </div>

      {/* Pagination - Above Table */}
      {filteredFAQs.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredFAQs.length}
            showInfo={true}
          />
        </div>
      )}

      {/* FAQ Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <CollapsibleTable
          data={filteredFAQs}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          sortable={true}
          searchable={false}
          pagination={false}
          expandableContent={expandableContent}
          additionalActions={(item) => [
            { 
              label: item.status === 'active' ? 'Deactivate' : 'Activate', 
              icon: item.status === 'active' ? 'XCircleIcon' : 'CheckCircleIcon', 
              action: () => handleToggleStatus(item.id),
              variant: item.status === 'active' ? 'warning' : 'success',
              color: item.status === 'active' ? 'bg-orange-600' : 'bg-green-600'
            },
            { 
              label: 'View Details', 
              icon: 'EyeIcon', 
              variant: 'secondaryOutline',
              action: () => handleViewFAQ(item.id)
            }
          ]}
          searchPlaceholder="Search..."
          emptyMessage="No FAQs found. Create your first FAQ to get started."
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
          enableSelection={true}
        />
      </div>

      {/* Form Modal */}
      <FormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingFAQ(null);
        }}
        onSubmit={handleSubmit}
        title={editingFAQ ? "Edit FAQ" : "Create New FAQ"}
        fields={formFields}
        initialData={editingFAQ}
        loading={loading}
        isUpdate={!!editingFAQ}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setEditingFAQ(null);
        }}
        onConfirm={confirmDelete}
        title="Delete FAQ"
        message={`Are you sure you want to delete the FAQ "${editingFAQ?.question}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.318 18.5c-.77.833.192 2.5 1.732 2.5z"
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
        variant="danger"
      />

      {/* Bulk Activate Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBulkActivateModal}
        onClose={() => setShowBulkActivateModal(false)}
        onConfirm={confirmBulkActivate}
        title="Activate Selected FAQs"
        message={`Are you sure you want to activate ${selectedRows.size} selected FAQ(s)? This will make them visible to users.`}
        confirmLabel="Activate"
        cancelLabel="Cancel"
        icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
        variant="success"
      />

      {/* Bulk Deactivate Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBulkDeactivateModal}
        onClose={() => setShowBulkDeactivateModal(false)}
        onConfirm={confirmBulkDeactivate}
        title="Deactivate Selected FAQs"
        message={`Are you sure you want to deactivate ${selectedRows.size} selected FAQ(s)? This will hide them from users.`}
        confirmLabel="Deactivate"
        cancelLabel="Cancel"
        icon="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        iconColor="text-orange-600"
        iconBgColor="bg-orange-100"
        variant="warning"
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Selected FAQs"
        message={`Are you sure you want to delete ${selectedRows.size} selected FAQ(s)? This action cannot be undone.`}
        confirmLabel="Delete All"
        cancelLabel="Cancel"
        icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.318 18.5c-.77.833.192 2.5 1.732 2.5z"
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
        variant="danger"
      />

      {/* Export Format Selection Modal */}
      <ConfirmationModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => {}} // No default action, we'll use custom buttons
        title="Export Selected FAQs"
        message={`Choose export format for ${selectedRows.size} selected FAQ(s):`}
        confirmLabel="" // Hide default confirm button
        cancelLabel="" // Hide cancel button to show X button
        icon="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        variant="info"
        customContent={
          <div className="mt-4 space-y-3">
            <Button
              variant="primary"
              size="md"
              onClick={handleExportPDF}
              className="w-full"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button
              variant="secondaryOutline"
              size="md"
              onClick={handleExportCSV}
              className="w-full"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
          </div>
        }
      />

      {/* Status Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusConfirmModal}
        onClose={() => setShowStatusConfirmModal(false)}
        onConfirm={confirmStatusToggle}
        title={`${statusConfirmAction === 'activate' ? 'Activate' : 'Deactivate'} FAQ`}
        message={`Are you sure you want to ${statusConfirmAction} this FAQ?`}
        confirmLabel={statusConfirmAction === 'activate' ? 'Activate' : 'Deactivate'}
        cancelLabel="Cancel"
        icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.318 18.5c-.77.833.192 2.5 1.732 2.5z"
        iconColor={statusConfirmAction === 'activate' ? 'text-green-600' : 'text-orange-600'}
        iconBgColor={statusConfirmAction === 'activate' ? 'bg-green-100' : 'bg-orange-100'}
        variant={statusConfirmAction === 'activate' ? 'success' : 'warning'}
      />

      {/* View FAQ Modal */}
      <ConfirmationModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        onConfirm={() => setShowViewModal(false)}
        title="FAQ Details"
        message=""
        confirmLabel="Close"
        cancelLabel=""
        icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        variant="info"
        customContent={viewingFAQ && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Question:</h4>
              <p className="text-sm text-gray-600">{viewingFAQ.question}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Answer:</h4>
              <p className="text-sm text-gray-600">{viewingFAQ.answer}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  let keywordsArray = [];
                  if (viewingFAQ.keywords) {
                    if (typeof viewingFAQ.keywords === 'string') {
                      keywordsArray = viewingFAQ.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
                    } else if (Array.isArray(viewingFAQ.keywords)) {
                      keywordsArray = viewingFAQ.keywords;
                    }
                  }
                  return keywordsArray.length > 0 ? (
                    keywordsArray.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500 italic">No keywords set</span>
                  );
                })()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-medium text-gray-500">Category:</span>
                <p className="text-sm text-gray-900">{viewingFAQ.category}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Priority:</span>
                <p className="text-sm text-gray-900">{viewingFAQ.priority}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  viewingFAQ.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {viewingFAQ.status}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Created By:</span>
                <p className="text-sm text-gray-900">{viewingFAQ.createdBy}</p>
              </div>
            </div>
          </div>
        )}
      />

      {/* Smart Floating Action Button */}
      <SmartFloatingActionButton 
        icon="EllipsisVerticalIcon"
        label="Toggle quick actions"
        selectedCount={selectedRows.size}
        quickActions={selectedRows.size > 0 ? quickActionsWithSelection : [
          { 
            name: 'Add New FAQ', 
            icon: 'PlusIcon', 
            action: () => {
              setEditingFAQ(null);
              setShowModal(true);
            }, 
            color: 'bg-primary-600' 
          }
        ]}
      />
    </div>
  );
};

export default FAQManagement;
