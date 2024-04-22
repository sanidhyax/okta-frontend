import React, { useState } from "react";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";;

const Search = (props) => {
    const {searchParam, handleSearchClick, handleSearchParamChange} = props

    return (
        <div id="search-div">
                <Input
                    value={searchParam}
                    onChange={handleSearchParamChange}
                    placeholder="Local Search..."
                    fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            <div id='search-button'>
                <Button variant="contained" onClick={handleSearchClick}>Search</Button>
            </div>
        </div>
    )
}

export default Search;