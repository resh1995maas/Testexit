import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <label>
        Filter:
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
