/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import { Table } from 'react-bootstrap';
import React from 'react';
import TableHeaderEntry from './TableHeaderEntry';
import TableDataEntry from './TableDataEntry';
import CsvButton from './CsvButton';
import FilterBar from './FilterBar';

function VendorTable(props) {
  const vendors = props.vendors_list;
  const { isAdmin } = props;
  const vendorKeys = Object.keys(props.vendors_list[0]);
  const filterBar = isAdmin
    ? <FilterBar/>
    : null
const csvButton = isAdmin
    ? <CsvButton vendorList={vendors} />
    : null
  const listItems = vendors.map((vendor) => (
    <TableDataEntry
      key={vendor.id}
      vendor_id={vendor.id}
      vendor_name={vendor.name}
      vendor_description={vendor.description}
      vendor_external_link={vendor.externalLink}
      vendor_category={vendor.category}
      vendor_status={vendor.status}
      vendor_risk={vendor.risk}
      isAdmin={isAdmin}
      query={props.query}
    />
  ));
  return (
    <div>
      <div filter-area>
        {csvButton}
        {filterBar}
      </div>
      <Table responsive bordered hover>
        <thead>
          <TableHeaderEntry vendor_keys={vendorKeys} />
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </Table>
    </div>
  );
}
export default VendorTable;
