import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import '../App.css'

export const FilterBar = (props) => {
    const {brands, categories, activeFilters, handleBrandChange, handleCategoryChange, handleSorting } = props;


    const listCategories = () => {
        if (categories.length > 0) {
            const categoriesMap = Array.from(categories).map((c) => {
                return <MenuItem key={c} value={c}>{c}</MenuItem>;
            });
            return categoriesMap;
        }
        else return []
    }

    const listBrands = () => {
        if (brands.length > 0) {
            const brandsMap = Array.from(brands).map((b) => {
                return <MenuItem key={b} value={b}>{b}</MenuItem>;
            });
            return brandsMap;
        }
        else return []
    }

    return (
        <div className="filter-bar">
            <div>
                <FormControl>
                    <FormLabel id="sorting-radios">Sort by</FormLabel>
                    <RadioGroup
                        row
                        name="sorting-radios"
                        onChange={handleSorting}
                        value={activeFilters.sortBy}
                    >
                        <FormControlLabel value="title" control={<Radio />} label="Title" />
                        <FormControlLabel value="lowtohigh" control={<Radio />} label="Price: High to low" />
                        <FormControlLabel value="hightolow" control={<Radio />} label="Price: Low to High" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="category-select">Category</InputLabel>
                    <Select
                        labelId="category-select"
                        id="category-select"
                        value={activeFilters.category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {listCategories()}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="brand-select">Brand</InputLabel>
                    <Select
                        labelId="brand-select"
                        id="brand-select"
                        value={activeFilters.brand}
                        onChange={handleBrandChange}
                        label="Brand"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {listBrands()}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
