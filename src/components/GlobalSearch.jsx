import React, { useEffect } from 'react';
import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { baseUrlForProducts } from './ProductCatalogue';
import axios from 'axios';

const GlobalSearch = (props) => {
  const { getProductsBySearch, resetCategoryAndBrand } = props;

  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    handleChange('');
  }, []);

  const fetch = (url) => {
    axios.get(url).then((response) => {
      setOptions(response.data.total > 0 ? response.data.products.map((p) => p.title) : []);
    });
  };

  const debounce = function (fn, t) {
    var timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn(...args);
      }, t);
    };
  };

    // const debouncedFetch = useMemo(() => debounce(fetch, 500), []);
  const debouncedFetch = debounce(fetch, 500);

  const handleChange = (query) => {
    // setInputValue(query)
    // Forming query to only pull in the titles of the products that pass the query
    const url = baseUrlForProducts + `/search?q=${query}&select=title&limit=10`;
    console.log(url);
    debouncedFetch(url);
  };

  const handleOnChange = (event, val) => {
    setValue(val);
    resetCategoryAndBrand();
    if (val === '' || val === null) {
      getProductsBySearch(baseUrlForProducts);
    } else {
      const url = baseUrlForProducts + `/search?q=${val}`;
      getProductsBySearch(url);
    }
    // const inputField = document.getElementById('global-search').querySelector('input');
    // inputField.blur();
  };

  return (
    <div id='global-search'>
      <Autocomplete
        id='global-search'
        filterOptions={(x) => x}
        fullWidth
        options={options}
        autoComplete
        blurOnSelect={true}
        freeSolo
        includeInputInList
        renderInput={(params) => <TextField {...params} label='Global Search (In development)' margin='normal' />}
        value={value}
        noOptionsText='No Products'
        onChange={(event, newValue) => {
          handleOnChange(event, newValue);
        }}
        onInputChange={(event, newInputValue) => {
          handleChange(newInputValue);
        }}
      />
    </div>
  );
};

export default GlobalSearch;
