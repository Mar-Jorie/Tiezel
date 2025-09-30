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
  PlusIcon,
  DocumentArrowDownIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../hooks/useApp';
import CollapsibleTable from '../components/CollapsibleTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import ConfirmationModal from '../components/ConfirmationModal';
import Button from '../components/Button';
import auditService from '../services/auditService';
import { toast } from 'react-hot-toast';

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
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingLog, setViewingLog] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportingLog, setExportingLog] = useState(null);
  const [showBulkExportModal, setShowBulkExportModal] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Load audit logs from service
  useEffect(() => {
    const loadAuditLogs = () => {
      const logs = auditService.getAllLogs();
      setAuditLogs(logs);
      setLoading(false);
    };
    
    loadAuditLogs();
    
    // Listen for localStorage changes (cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'audit-logs') {
        loadAuditLogs();
      }
    };
    
    // Listen for custom events (same-tab updates)
    const handleAuditUpdate = () => {
      loadAuditLogs();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auditLogUpdated', handleAuditUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auditLogUpdated', handleAuditUpdate);
    };
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
    setShowBulkExportModal(true);
  };

  // Individual action handlers
  const handleViewLog = (log) => {
    setViewingLog(log);
    setShowViewModal(true);
  };

  const handleExportLog = (log) => {
    setExportingLog(log);
    setShowExportModal(true);
  };

  const handleExportPDF = () => {
    if (exportingLog) {
      try {
        // Create a formatted report for PDF export
        const reportContent = `
          <html>
            <head>
              <title>Audit Log Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .report-title { font-size: 24px; font-weight: bold; color: #333; }
                .report-date { color: #666; margin-top: 10px; }
                .log-details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .log-field { margin-bottom: 10px; }
                .log-label { font-weight: bold; color: #333; }
                .log-value { color: #666; margin-left: 10px; }
                .metadata { background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="report-title">Audit Log Report</div>
                <div class="report-date">Generated on ${new Date().toLocaleDateString()}</div>
              </div>
              <div class="log-details">
                <div class="log-field">
                  <span class="log-label">Action:</span>
                  <span class="log-value">${exportingLog.action}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Resource:</span>
                  <span class="log-value">${exportingLog.resource}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">User:</span>
                  <span class="log-value">${exportingLog.user}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Timestamp:</span>
                  <span class="log-value">${exportingLog.timestamp}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Details:</span>
                  <span class="log-value">${exportingLog.details}</span>
                </div>
                ${exportingLog.metadata && exportingLog.metadata.fieldChanges ? `
                  <div class="metadata">
                    <div class="log-label">Field Changes:</div>
                    ${Object.entries(exportingLog.metadata.fieldChanges).map(([field, changes]) => `
                      <div style="margin-top: 10px;">
                        <strong>${field}:</strong><br/>
                        <span style="color: #dc2626;">Before: ${changes.oldValue || 'N/A'}</span><br/>
                        <span style="color: #059669;">After: ${changes.newValue || 'N/A'}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
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

        toast.success('Print dialog opened for PDF export!');
        setShowExportModal(false);
        setExportingLog(null);
      } catch (error) {
        toast.error('Failed to export PDF');
      }
    }
  };

  const handleExportCSV = () => {
    if (exportingLog) {
      try {
        // Create CSV content for the audit log
        const csvData = [
          ['Field', 'Value'],
          ['Action', exportingLog.action],
          ['Resource', exportingLog.resource],
          ['User', exportingLog.user],
          ['Timestamp', exportingLog.timestamp],
          ['Details', exportingLog.details],
          ['IP Address', exportingLog.ipAddress || 'N/A'],
          ['User Agent', exportingLog.userAgent || 'N/A']
        ];

        // Add field changes if they exist
        if (exportingLog.metadata && exportingLog.metadata.fieldChanges) {
          csvData.push(['', '']); // Empty row
          csvData.push(['Field Changes', '']);
          Object.entries(exportingLog.metadata.fieldChanges).forEach(([field, changes]) => {
            csvData.push([`${field} (Before)`, changes.oldValue || 'N/A']);
            csvData.push([`${field} (After)`, changes.newValue || 'N/A']);
          });
        }

        // Convert to CSV
        const csvContent = csvData.map(row => 
          row.map(field => `"${field}"`).join(',')
        ).join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `audit-log-${exportingLog.id || 'export'}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success('Audit log exported as CSV successfully!');
        setShowExportModal(false);
        setExportingLog(null);
      } catch (error) {
        toast.error('Failed to export CSV');
      }
    }
  };

  const handleBulkExportPDF = () => {
    const selectedLogs = auditLogs.filter((item, index) => selectedRows.has(item.id || index));
    try {
      // Create a formatted report for bulk PDF export
      const reportContent = `
        <html>
          <head>
            <title>Audit Logs Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .report-title { font-size: 24px; font-weight: bold; color: #333; }
              .report-date { color: #666; margin-top: 10px; }
              .log-entry { background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb; }
              .log-field { margin-bottom: 8px; }
              .log-label { font-weight: bold; color: #333; }
              .log-value { color: #666; margin-left: 10px; }
              .metadata { background-color: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 10px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="report-title">Audit Logs Report</div>
              <div class="report-date">Generated on ${new Date().toLocaleDateString()}</div>
              <div class="report-date">Total Logs: ${selectedLogs.length}</div>
            </div>
            ${selectedLogs.map((log, index) => `
              <div class="log-entry">
                <div class="log-field">
                  <span class="log-label">Log #${index + 1}:</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Action:</span>
                  <span class="log-value">${log.action}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Resource:</span>
                  <span class="log-value">${log.resource}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">User:</span>
                  <span class="log-value">${log.user}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Timestamp:</span>
                  <span class="log-value">${log.timestamp}</span>
                </div>
                <div class="log-field">
                  <span class="log-label">Details:</span>
                  <span class="log-value">${log.details}</span>
                </div>
                ${log.metadata && log.metadata.fieldChanges ? `
                  <div class="metadata">
                    <div class="log-label">Field Changes:</div>
                    ${Object.entries(log.metadata.fieldChanges).map(([field, changes]) => `
                      <div style="margin-top: 5px;">
                        <strong>${field}:</strong> 
                        <span style="color: #dc2626;">${changes.oldValue || 'N/A'}</span> → 
                        <span style="color: #059669;">${changes.newValue || 'N/A'}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
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

      toast.success('Print dialog opened for PDF export!');
      setShowBulkExportModal(false);
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const handleBulkExportCSV = () => {
    const selectedLogs = auditLogs.filter((item, index) => selectedRows.has(item.id || index));
    try {
      // Create CSV content for bulk export
      const csvData = [
        ['Log #', 'Action', 'Resource', 'User', 'Timestamp', 'Details', 'IP Address', 'User Agent']
      ];

      selectedLogs.forEach((log, index) => {
        csvData.push([
          index + 1,
          log.action,
          log.resource,
          log.user,
          log.timestamp,
          log.details,
          log.ipAddress || 'N/A',
          log.userAgent || 'N/A'
        ]);

        // Add field changes if they exist
        if (log.metadata && log.metadata.fieldChanges) {
          Object.entries(log.metadata.fieldChanges).forEach(([field, changes]) => {
            csvData.push([
              '', // Empty log number
              `Field Change: ${field}`,
              `Before: ${changes.oldValue || 'N/A'}`,
              `After: ${changes.newValue || 'N/A'}`,
              '', '', '', '' // Empty other fields
            ]);
          });
        }
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
      link.setAttribute('download', `audit-logs-bulk-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Audit logs exported as CSV successfully!');
      setShowBulkExportModal(false);
    } catch (error) {
      toast.error('Failed to export CSV');
    }
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
          data={filteredLogs}
          columns={[
            { 
              key: 'timestamp', 
              label: 'Timestamp',
              render: (value) => {
                const date = new Date(value);
                const dateStr = date.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: '2-digit' 
                });
                const timeStr = date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                });
                return `${dateStr} : ${timeStr}`;
              }
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
            }
          ]}
          loading={loading}
          sortable={true}
          searchable={false} // We handle search with SearchFilter
          pagination={false} // We handle pagination with Pagination component
          expandableContent={(item) => (
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Show general description/details */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Description:</span>
                  <p className="text-sm text-gray-900 mt-1">{item.details}</p>
                </div>
                
                {/* Show changed fields count if available */}
                {item.metadata?.fieldChanges && Object.keys(item.metadata.fieldChanges).length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Changed Fields:</span>
                    <p className="text-sm text-gray-600 mt-1">
                      {Object.keys(item.metadata.fieldChanges).length} field(s) modified: {Object.keys(item.metadata.fieldChanges).join(', ')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click "View Details" to see before/after values
                    </p>
                  </div>
                )}
              </div>
              
              {/* Session Info */}
              {item.userAgent && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Session Info:</span>
                  <p className="text-xs text-gray-500 mt-1">User Agent: {item.userAgent}</p>
                </div>
              )}
            </div>
          )}
          additionalActions={(item) => [
            { 
              label: 'View Details', 
              icon: 'EyeIcon', 
              variant: 'secondaryOutline',
              action: () => handleViewLog(item)
            },
            { 
              label: 'Export Log', 
              icon: 'DocumentArrowDownIcon', 
              variant: 'primaryOutline',
              action: () => handleExportLog(item)
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
          icon="DocumentArrowDownIcon"
          label="Export selected items"
          selectedCount={selectedRows.size}
          quickActions={[
            { 
              name: 'Export Selected', 
              icon: 'DocumentArrowDownIcon', 
              action: handleBulkExport, 
              color: 'bg-primary-600' 
            }
          ]}
        />
      )}

      {/* View Details Modal */}
      <ConfirmationModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        onConfirm={() => setShowViewModal(false)}
        title="Audit Log Details"
        message=""
        confirmLabel="Close"
        cancelLabel=""
        hasContent={true}
        customContent={viewingLog ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Timestamp:</span>
                <p className="text-sm text-gray-900">{(() => {
                  const date = new Date(viewingLog.timestamp);
                  const dateStr = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: '2-digit' 
                  });
                  const timeStr = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  });
                  return `${dateStr} : ${timeStr}`;
                })()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">User:</span>
                <p className="text-sm text-gray-900">{viewingLog.user}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Action:</span>
                <p className="text-sm text-gray-900">{viewingLog.action}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Resource:</span>
                <p className="text-sm text-gray-900">{viewingLog.resource}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="text-sm text-gray-900 mt-1">{viewingLog.details}</p>
            </div>
            
            {/* Show detailed field changes if available */}
            {viewingLog.metadata?.fieldChanges && Object.keys(viewingLog.metadata.fieldChanges).length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">Detailed Changes:</span>
                <div className="mt-2 space-y-3">
                  {Object.entries(viewingLog.metadata.fieldChanges).map(([field, changes]) => (
                    <div key={field} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs font-medium text-gray-500">Before:</span>
                          <p className="text-sm text-gray-900 mt-1 break-words">
                            {changes.old || 'Not set'}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500">After:</span>
                          <p className="text-sm text-gray-900 mt-1 break-words">
                            {changes.new || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <span className="text-sm font-medium text-gray-500">IP Address:</span>
              <p className="text-sm text-gray-900">{viewingLog.ipAddress}</p>
            </div>
            {viewingLog.userAgent && (
              <div>
                <span className="text-sm font-medium text-gray-500">User Agent:</span>
                <p className="text-xs text-gray-500 mt-1 break-all">{viewingLog.userAgent}</p>
              </div>
            )}
          </div>
        ) : null}
      />

      {/* Export Log Modal */}
      <ConfirmationModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => {}} // No default action, we'll use custom buttons
        title="Export Audit Log"
        message={`Choose export format for this audit log entry:`}
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

      {/* Bulk Export Modal */}
      <ConfirmationModal
        isOpen={showBulkExportModal}
        onClose={() => setShowBulkExportModal(false)}
        onConfirm={() => {}} // No default action, we'll use custom buttons
        title="Export Selected Audit Logs"
        message={`Choose export format for ${selectedRows.size} selected audit log(s):`}
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
              onClick={handleBulkExportPDF}
              className="w-full"
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
            <Button
              variant="secondaryOutline"
              size="md"
              onClick={handleBulkExportCSV}
              className="w-full"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
          </div>
        }
      />
    </>
  );
};

export default AuditTrail;
