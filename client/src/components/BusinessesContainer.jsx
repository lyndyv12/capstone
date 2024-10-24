import React, { useState } from 'react';
import BusinessCard from './BusinessCard';

function BusinessesContainer({ businesses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name_full.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || business.business_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const businessTypes = [
    { value: "all", label: "All Types" },
    { value: "restaurant", label: "Restaurant" },
    { value: "Bar", label: "Bar" },
    { value: "store", label: "Store" },
    { value: "service", label: "Service" },
    // Add new business types here as needed
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div>
      <h2>Businesses</h2>
      <div>
        <input
          type="text"
          placeholder="Search by business name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterType} onChange={handleFilterChange}>
          {businessTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {filteredBusinesses.length > 0 ? (
        filteredBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))
      ) : (
        <p>No businesses found.</p>
      )}
    </div>
  );
}

export default BusinessesContainer;
