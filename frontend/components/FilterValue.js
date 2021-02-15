/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Select from 'react-select';
import style from './componentcss/FilterValue.css'

function FilterValue(props) {
  const { isAdmin } = props;
  const { options } = props;
  const [filterOption, setFilterOption] = useState({ value: 'clear', label: '<clear>' });
  if (isAdmin) {
    return (
      <div class="filter-valu col-3">
        <form>
          <Select
            options={options}
            value={filterOption}
            onChange={setFilterOption}
          />
          <input className="btn btn-primary filter-button" type="submit" value={`Run ${props.name} Filter`} />
        </form>
      </div>
    );
  }
}
export default FilterValue;
