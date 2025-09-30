import React, { useState } from 'react';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  PencilIcon, 
  TrashIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  CheckCircleIcon,
  PlayIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

// Icon mapping function to convert string names to components
const getIconComponent = (iconName) => {
  const iconMap = {
    EyeIcon,
    DocumentArrowDownIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    PlusIcon,
    CalendarDaysIcon,
    UserPlusIcon,
    CheckCircleIcon,
    PlayIcon,
    DocumentArrowUpIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon
  };
  return iconMap[iconName] || null;
};

const CollapsibleTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  loading = false,
  sortable = true,
  searchable = true,
  pagination = true,
  itemsPerPage = 10,
  expandableContent,
  additionalActions = [],
  searchPlaceholder = "Search...",
  emptyMessage = "No data found",
  selectedRows = new Set(),
  onSelectionChange,
  enableSelection = false
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter and search data
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return columns.some(column => {
      const value = item[column.key];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Selection logic
  const isAllSelected = paginatedData.length > 0 && paginatedData.every((item, index) => 
    selectedRows.has(item.id || index)
  );
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < paginatedData.length;

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleRowExpansion = (rowId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      // Deselect all
      const newSelected = new Set(selectedRows);
      paginatedData.forEach((item, index) => {
        newSelected.delete(item.id || index);
      });
      onSelectionChange?.(newSelected);
    } else {
      // Select all
      const newSelected = new Set(selectedRows);
      paginatedData.forEach((item, index) => {
        newSelected.add(item.id || index);
      });
      onSelectionChange?.(newSelected);
    }
  };

  const handleRowSelect = (e, rowId) => {
    e.stopPropagation();
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    onSelectionChange?.(newSelected);
  };

  const handleEdit = (e, item) => {
    e.stopPropagation();
    onEdit?.(item);
  };

  const handleDelete = (e, item) => {
    e.stopPropagation();
    onDelete?.(item);
  };

  const handleAdditionalAction = (e, action, item) => {
    e.stopPropagation();
    action.action?.(item);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-8 text-center">
          <p className="text-sm text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Select All Checkbox */}
              {enableSelection && (
                <th className="px-2 sm:px-3 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded custom-checkbox"
                  />
                </th>
              )}
              
              {/* Data Column Headers */}
              {columns.map((column, index) => (
                <th 
                  key={column.key}
                  className={`px-2 sm:px-3 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    index >= 1 ? 'hidden md:table-cell' : ''
                  }`}
                >
                  {sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="w-full flex items-center justify-center space-x-1 hover:text-gray-700"
                    >
                      <span>{column.label}</span>
                      {sortConfig.key === column.key && (
                        <span className="text-primary-600">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span className="block text-center">{column.label}</span>
                  )}
                </th>
              ))}
              
              {/* Expand/Collapse Header */}
              <th className="px-2 sm:px-3 lg:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                {/* No text, just chevron icons */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => {
              const isExpanded = expandedRows.has(item.id || index);
              const actualIndex = startIndex + index;
              
              return (
                <React.Fragment key={item.id || actualIndex}>
                  {/* Main Row */}
                  <tr
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => toggleRowExpansion(item.id || actualIndex)}
                  >
                    {/* Selection Checkbox */}
                    {enableSelection && (
                      <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-center w-12">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(item.id || actualIndex)}
                          onChange={(e) => handleRowSelect(e, item.id || actualIndex)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded custom-checkbox"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}

                    {/* Data Columns - Mobile responsive */}
                    {columns.map((column, colIndex) => (
                      <td 
                        key={column.key} 
                        className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-sm text-gray-900 text-center ${
                          colIndex >= 1 ? 'hidden md:table-cell' : ''
                        }`}
                      >
                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                      </td>
                    ))}

                    {/* Expand/Collapse Button */}
                    <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-center">
                      <div className="flex items-center justify-center">
                        <div className="p-1 text-gray-400 group-hover:text-gray-600 transition-colors">
                          {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row Content */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={columns.length + (enableSelection ? 2 : 1)} className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 bg-gray-50">
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                          {/* Mobile: Show hidden columns */}
                          <div className="block md:hidden space-y-3">
                            {columns.slice(1).map((column) => (
                              <div key={column.key} className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">{column.label}</span>
                                <div className="text-sm text-gray-900">
                                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Expandable Content */}
                          {expandableContent && expandableContent(item)}

                          {/* Action Buttons */}
                          {(onEdit || onDelete || additionalActions.length > 0) && (
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              {/* Primary Actions */}
                              {onEdit && (
                                <Button
                                  variant="secondaryOutline"
                                  size="sm"
                                  onClick={(e) => handleEdit(e, item)}
                                  className="!w-auto"
                                >
                                  <PencilIcon className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                              )}
                              
                              {onDelete && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={(e) => handleDelete(e, item)}
                                  className="!w-auto"
                                >
                                  <TrashIcon className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              )}

                              {/* Additional Actions */}
                              {additionalActions.map((action, idx) => (
                                <Button
                                  key={idx}
                                  variant={action.variant || "secondaryOutline"}
                                  size="sm"
                                  onClick={(e) => handleAdditionalAction(e, action, item)}
                                  className="!w-auto"
                                >
                                  {action.icon && (() => {
                                    const IconComponent = getIconComponent(action.icon);
                                    return IconComponent ? <IconComponent className="h-4 w-4 mr-2" /> : null;
                                  })()}
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              variant="secondaryOutline"
              size="sm"
              className="!w-auto"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              variant="secondaryOutline"
              size="sm"
              className="!w-auto"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleTable;
