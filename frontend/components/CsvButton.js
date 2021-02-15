import { CSVLink, CSVDownload } from 'react-csv';
import React from 'react';
import styles from './componentcss/CsvButton.css';

function CsvButton(props) {
  let vendorKeys = Object.keys(props.vendorList[0]);
  vendorKeys = [vendorKeys.slice(1)];
  let csvData = props.vendorList.map((vendor) => [vendor.id, vendor.name, vendor.description, vendor.externalLink, vendor.category, vendor.status, vendor.risk]);
  csvData = [...vendorKeys, ...csvData];
  return (
    <div className="csv-link">
      <CSVLink data={csvData}>Download CSV</CSVLink>
    </div>
  );
}
export default CsvButton;
