import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  CogIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../hooks/useApp';
import CollapsibleTable from '../components/CollapsibleTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';

const AuditTrail = () => {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Mock audit trail data
  useEffect(() => {
    const mockAuditLogs = [
      {
        id: 1,
        timestamp: new Date('2024-01-15T10:30:00Z'),
        user: 'admin@techstore.com',
        action: 'Content Updated',
        resource: 'Hero Section',
        details: 'Updated main title and subtitle',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        id: 2,
        timestamp: new Date('2024-01-15T09:15:00Z'),
        user: 'admin@techstore.com',
        action: 'Content Created',
        resource: 'New Service',
        details: 'Added "Premium Support" service',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        id: 3,
        timestamp: new Date('2024-01-14T16:45:00Z'),
        user: 'admin@techstore.com',
        action: 'Content Deleted',
        resource: 'Product',
        details: 'Removed "Old Product" from featured products',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        id: 4,
        timestamp: new Date('2024-01-14T14:20:00Z'),
        user: 'admin@techstore.com',
        action: 'Settings Updated',
        resource: 'Company Information',
        details: 'Updated business hours and contact information',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      },
      {
        id: 5,
        timestamp: new Date('2024-01-14T11:30:00Z'),
        user: 'admin@techstore.com',
        action: 'Login',
        resource: 'Admin Dashboard',
        details: 'Successful login to admin dashboard',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    ];
    
    setAuditLogs(mockAuditLogs);
    setLoading(false);
  }, []);

  if (!isAdmin) {
    return null;
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'Content Updated':
        return <PencilIcon className="h-4 w-4 text-blue-600" />;
      case 'Content Created':
        return <PlusIcon className="h-4 w-4 text-green-600" />;
      case 'Content Deleted':
        return <TrashIcon className="h-4 w-4 text-red-600" />;
      case 'Settings Updated':
        return <CogIcon className="h-4 w-4 text-orange-600" />;
      case 'Login':
        return <UserIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'Content Updated':
        return 'bg-blue-100 text-blue-800';
      case 'Content Created':
        return 'bg-green-100 text-green-800';
      case 'Content Deleted':
        return 'bg-red-100 text-red-800';
      case 'Settings Updated':
        return 'bg-orange-100 text-orange-800';
      case 'Login':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search logic
  const filteredLogs = auditLogs.filter(log => {
    // Search filter
    const matchesSearch = !searchValue || 
      log.user.toLowerCase().includes(searchValue.toLowerCase()) ||
      log.action.toLowerCase().includes(searchValue.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchValue.toLowerCase()) ||
      log.details.toLowerCase().includes(searchValue.toLowerCase());

    // Action filter
    const matchesAction = !filters.action || log.action === filters.action;

    // Date range filter
    const matchesDateRange = (!filters.startDate || new Date(log.timestamp) >= new Date(filters.startDate)) &&
                           (!filters.endDate || new Date(log.timestamp) <= new Date(filters.endDate));

    return matchesSearch && matchesAction && matchesDateRange;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  // Filter options for SearchFilter
  const statusOptions = [
    { value: "", label: "All Actions" },
    { value: "Content Updated", label: "Content Updated" },
    { value: "Content Created", label: "Content Created" },
    { value: "Content Deleted", label: "Content Deleted" },
    { value: "Settings Updated", label: "Settings Updated" },
    { value: "Login", label: "Login" }
  ];

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  // Bulk action handlers
  const handleBulkExport = () => {
    const selectedLogs = auditLogs.filter((_, index) => selectedRows.has(index));
    console.log('Exporting selected logs:', selectedLogs);
    // TODO: Implement actual export functionality
    alert(`Exporting ${selectedLogs.length} selected logs...`);
  };



  const getStatusBadge = (action) => {
    switch (action) {
      case 'Content Updated':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Updated</span>;
      case 'Content Created':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Created</span>;
      case 'Content Deleted':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Deleted</span>;
      case 'Settings Updated':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">Settings</span>;
      case 'Login':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Login</span>;
      default:
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Info</span>;
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Audit Trail
        </h1>
        <p className="text-gray-600">
          Track all system activities and changes made to your landing page.
        </p>
      </div>

      {/* Summary Cards - Placed at top as requested */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <PencilIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Updates</p>
              <p className="text-lg font-semibold text-gray-900">
                {auditLogs.filter(log => log.action === 'Content Updated').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <PlusIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="text-lg font-semibold text-gray-900">
                {auditLogs.filter(log => log.action === 'Content Created').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <TrashIcon className="h-4 w-4 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Deleted</p>
              <p className="text-lg font-semibold text-gray-900">
                {auditLogs.filter(log => log.action === 'Content Deleted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Logins</p>
              <p className="text-lg font-semibold text-gray-900">
                {auditLogs.filter(log => log.action === 'Login').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <SearchFilter
          placeholder="Search audit logs..."
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          filters={filters}
          statusOptions={statusOptions}
          className="bg-gray-50 border-gray-200"
        />
      </div>

      {/* Pagination above table */}
      {filteredLogs.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredLogs.length}
            showInfo={true}
          />
        </div>
      )}

      {/* Audit Log Table using CollapsibleTable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <CollapsibleTable
          data={paginatedLogs}
          columns={[
            { 
              key: 'timestamp', 
              label: 'Timestamp',
              render: (value) => new Date(value).toLocaleString()
            },
            { 
              key: 'user', 
              label: 'User' 
            },
            { 
              key: 'action', 
              label: 'Action',
              render: (value) => getStatusBadge(value)
            },
            { 
              key: 'resource', 
              label: 'Resource' 
            },
            { 
              key: 'details', 
              label: 'Details' 
            }
          ]}
          loading={loading}
          sortable={true}
          searchable={false} // We handle search with SearchFilter
          pagination={false} // We handle pagination with Pagination component
          expandableContent={(item) => (
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Mobile: Show hidden columns */}
              <div className="block md:hidden space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Full Details</span>
                  <div className="text-sm text-gray-900">{item.details}</div>
                </div>
              </div>
              
              {/* Expandable Content */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Full Details:</span>
                  <p className="text-sm text-gray-900 mt-1">{item.details}</p>
                </div>
                {item.userAgent && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Session Info:</span>
                    <p className="text-xs text-gray-500 mt-1">User Agent: {item.userAgent}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          additionalActions={[
            { 
              label: 'View Details', 
              icon: 'EyeIcon', 
              variant: 'secondaryOutline'
            },
            { 
              label: 'Export Log', 
              icon: 'DocumentArrowDownIcon', 
              variant: 'primaryOutline'
            }
          ]}
          searchPlaceholder="Search audit logs..."
          emptyMessage="No audit logs found"
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Smart Floating Action Button - Only show when items are selected */}
      {selectedRows.size > 0 && (
        <SmartFloatingActionButton 
          variant="single"
          icon="DocumentArrowDownIcon"
          label="Export selected items"
          selectedCount={selectedRows.size}
          action={handleBulkExport}
        />
      )}
    </>
  );
};

export default AuditTrail;
