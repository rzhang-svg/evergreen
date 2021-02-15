import React, { useState } from 'react';
import Select from 'react-select';
import { useMutation } from '@apollo/client';
import styles from './componentcss/tableDataEntry.css';

function TableDataEntry(props) {
  const { isAdmin } = props;
  const [categoryOption, setCategoryOption] = useState({ value: props.vendor_category, label: props.vendor_category });
  const [statusOption, setStatusOption] = useState({ value: props.vendor_status, label: props.vendor_status });
  const [updateVendorinfo, { data }] = useMutation(props.query);

  const categoryOptions = [
    { value: 'Software', label: 'Software' },
    { value: 'Consulting, staffing, and professional services', label: 'Consulting, staffing, and professional services' },
    { value: 'Other', label: 'Other' },
  ];

  const statusOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
  ];

  let categoryEntry;
  let statusEntry;
  if (isAdmin === false) {
    categoryEntry = <td className="vendor-category">{props.vendor_category}</td>;
    statusEntry = <td className="vendor-status">{props.vendor_status}</td>;
  } else {
    categoryEntry = (
      <td className="vendor-category">
        <div className="update-category">
          <form onSubmit={() => updateVendorinfo({ variables: { category: categoryOption.value, id: props.vendor_id, status: statusOption.value } })}>
            <Select
              options={categoryOptions}
              value={categoryOption}
              onChange={setCategoryOption}
            />
            <input className="btn btn-primary update-status-button" type="submit" value="Update" />
          </form>
        </div>

      </td>
    );
    statusEntry = (
      <td className="vendor-status">
        <div className="update-status">
          <form onSubmit={() => updateVendorinfo({ variables: { category: categoryOption.value, id: props.vendor_id, status: statusOption.value} })}>
            <Select
              options={statusOptions}
              value={statusOption}
              onChange={setStatusOption}
            />
            <input className="btn btn-primary update-category-button" type="submit" value="Update" />
          </form>
        </div>
      </td>
    );
  }

  return (
    <tr className="vendor-row">
      <td className="vendor-id">{props.vendor_id}</td>
      <td className="vendor-name">{props.vendor_name}</td>
      <td className="vendor-description">
        <div className="vendor-description-cell">
          {props.vendor_description}
        </div>
      </td>
      <td className="vendor-website">{props.vendor_external_link}</td>
      {categoryEntry}
      {statusEntry}
      <td className="vendor-risk">{props.vendor_risk}</td>
    </tr>

  );
}

export default TableDataEntry;
