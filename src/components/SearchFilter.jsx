import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SelectInput from './SelectInput';

const SearchFilter = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  onFilterChange,
  filters = {},
  useSelectForSearch = false,
  searchSelectOptions = [],
  searchSelectValue = "",
  onSearchSelectChange,
  statusOptions = [],
  getUniqueCompanies = () => [],
  className = ""
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const handleSearchChange = (e) => {
    onChange(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const applyFilters = () => {
    setIsFilterPanelOpen(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Filter Row */}
      <div className="flex items-center gap-2 sm:gap-1">
        {/* Primary Filter - Search Input or Select Input */}
        <div className="flex-1 min-w-0">
          {useSelectForSearch ? (
            <SelectInput
              label=""
              value={searchSelectValue}
              onChange={onSearchSelectChange}
              options={searchSelectOptions}
              placeholder={placeholder}
              className="bg-gray-50 border-gray-200"
            />
          ) : (
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={value}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 border-gray-200"
              />
            </form>
          )}
        </div>

        {/* Filter Icon */}
        <button
          onClick={toggleFilterPanel}
          className="p-2 sm:p-2 text-gray-600 hover:text-primary-600 transition-colors flex-shrink-0"
        >
          <FunnelIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Filter Panel Overlay */}
      {isFilterPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-[125] h-screen"
          onClick={toggleFilterPanel}
        ></div>
      )}

      {/* Right Side Filter Panel */}
      <div className={`
        fixed top-0 right-0 h-screen w-80 sm:w-72 bg-white shadow-lg z-[130] transform transition-transform duration-300 ease-in-out filter-panel-fixed
        ${isFilterPanelOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={toggleFilterPanel}
                className="p-2 rounded transition-colors hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Status Filter */}
            {statusOptions.length > 0 && (
              <SelectInput
                label="Status"
                value={filters.status || ""}
                onChange={(value) => onFilterChange('status', value)}
                options={statusOptions}
                className="filter-select-input"
              />
            )}

            {/* Company Filter */}
            {getUniqueCompanies && getUniqueCompanies().length > 0 && (
              <SelectInput
                label="Company"
                value={filters.company || ""}
                onChange={(value) => onFilterChange('company', value)}
                options={getUniqueCompanies()}
                className="filter-select-input"
              />
            )}

            {/* Action Filter */}
            <SelectInput
              label="Action Type"
              value={filters.action || ""}
              onChange={(value) => onFilterChange('action', value)}
              options={[
                { value: "", label: "All Actions" },
                { value: "Content Updated", label: "Content Updated" },
                { value: "Content Created", label: "Content Created" },
                { value: "Content Deleted", label: "Content Deleted" },
                { value: "Settings Updated", label: "Settings Updated" },
                { value: "Login", label: "Login" }
              ]}
              className="filter-select-input"
            />

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => onFilterChange('startDate', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => onFilterChange('endDate', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={applyFilters}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
