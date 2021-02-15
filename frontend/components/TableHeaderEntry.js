import { isCompositeType } from 'graphql';
import React from 'react';

function TableHeaderEntry(props) {
  let vendorKeys = props.vendor_keys;
  vendorKeys = vendorKeys.slice(1);
  const headerItems = vendorKeys.map((vendor_key, index) =>
    <th key={index}>{vendor_key}</th>
    );
  return (
    <tr>{headerItems}</tr>
  );
}

export default TableHeaderEntry;
