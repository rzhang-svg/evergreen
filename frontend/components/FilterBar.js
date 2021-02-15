/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Select from 'react-select';
import FilterValue from './FilterValue';
import style from './componentcss/FilterBar.css';

function FilterBar(props) {
  const categoryOptions = [
    { value: 'Software', label: 'Software' },
    { value: 'Consulting, staffing, and professional services', label: 'Consulting, staffing, and professional services' },
    { value: 'Other', label: 'Other' },
  ];

  const statusOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
  ];

  const riskOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  return (
    <div className="filter-bar">
      <FilterValue
        isAdmin
        options={statusOptions}
        name="status"
      />
      <FilterValue
        isAdmin
        options={categoryOptions}
        name="category"
      />
      <FilterValue
        isAdmin
        options={riskOptions}
        name="risk"
      />
      <form>
        <input className="btn btn-dark" type="submit" value="Clear Filter" />
      </form>
    </div>
  );
}

export default FilterBar;
