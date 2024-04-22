import React, { useEffect, useState } from "react";
import '../App.css';
import { FilterBar } from "./FilterBar";
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadProducts, setPageLoading , loadBrands} from "../redux/actions";
import ProductList from "./ProductList";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Search from "./Search";



export const ProductCatalogue = () => {

    const defaultFilters = {
        sortBy: 'title',
        category: '',
        brand: ''
    }

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
    const categories = useSelector(state => state.categories)
    const brands = useSelector(state => state.brands)
    const pagination = useSelector(state => state.pagination)
    const isLoading = useSelector(state => state.isPageLoading)

    const [activeFilters, setActiveFilters] = useState(defaultFilters)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchParam, setSearchParam] = useState('')

    const url = "https://dummyjson.com/products"
    const categoriesURL = "https://dummyjson.com/products/categories"
    const searchUrl = "https://dummyjson.com/products/search"
    const brandUrl = "https://extenddummyjson-latest.onrender.com/brands"

    useEffect(() => {
        getCategories(categoriesURL)
        getBrands(brandUrl)
        console.log(pagination)
        getProducts(url, pagination.skip, pagination.limit)
        
    }, [])

    const getCategories = (url) => {
        axios.get(url)
            .then(response => {
                dispatch(loadCategories(response.data));
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    const getBrands = (url) => {
        axios.get(url)
            .then(response => {
                console.log("GETTING")
                console.log(response.data)
                dispatch(loadBrands(response.data));
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });
    };

    const getProducts = async (url, skip, limit) => {
        dispatch(setPageLoading(true));
        const response = await axios.get(url, {
            params: {
                limit: limit,
                skip: skip,
            }
        });
        const data = response.data;
        console.log(data)
        dispatch(loadProducts(data));
        window.scrollTo(0, 0);
        setFilteredProducts(data.products);
    };

    const searchProducts = async (url, skip, limit, searchQuery) => {
        dispatch(setPageLoading(true));
        const response = await axios.get(url, {
            params: {
                limit: limit,
                skip: skip,
                q: searchQuery
            }
        });
        const data = response.data;
        console.log(data)
        dispatch(loadProducts(data));
        window.scrollTo(0, 0);
        setFilteredProducts(data.products);
    };

    const handlePageChange = (event, page) => {
        if (searchParam != '')
    {   console.log(page)
        getProducts(url, (page - 1) * 10, pagination.limit)}
    }

    const sortProducts = (sortBy, prods) => {
        if (sortBy === 'lowtohigh') {
            return prods.sort((a, b) => a.price - b.price); // Sort low to high
        } else if (sortBy === 'hightolow') {
            return prods.sort((a, b) => b.price - a.price); // Sort high to low
        } else {
            return prods.sort((a, b) => a.title.localeCompare(b.title));
        }
    };



    const handleSorting = (sortBy) => {
        setActiveFilters({ ...activeFilters, sortBy })
        setFilteredProducts(sortProducts(sortBy, filteredProducts))
    }
    const handleBrandChange = (brand) => {
        setActiveFilters({ ...activeFilters, brand })
        filterProducts(brand, activeFilters.category)
    }
    const handleCategoryChange = (category) => {
        console.log()
        setActiveFilters({ ...activeFilters, category })
        filterProducts(activeFilters.brand, category)
    }
    const handleSearchParamChange = (param) => {
        setSearchParam(param)
    }
    const handleSearchClick = () => {
        if (searchParam != '')
        searchProducts(url, 0, pagination.limit, searchParam)
    }

    const filterProducts = (brand, category) => {
        const classifed = products.filter(p => {
            if (brand !== "" && p.brand !== brand) return false
            if (category !== "" && p.category !== category) return false
            return true
        })
        setFilteredProducts(classifed)
    }

    return (
        <div>
            <Search searchParam={searchParam}
                handleSearchParamChange={(e) => handleSearchParamChange(e.target.value)}
                handleSearchClick={() => handleSearchClick()}
            />
            <div>
                <FilterBar
                    categories={categories}
                    brands={brands}
                    activeFilters={activeFilters}
                    handleSorting={(val) => handleSorting(val.target.value)}
                    handleCategoryChange={(val) => handleCategoryChange(val.target.value)}
                    handleBrandChange={(val) => handleBrandChange(val.target.value)}
                />
            </div>
            <div>
                <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <ProductList products={sortProducts(activeFilters.sortBy, filteredProducts)} />
                <div className="pagination">
                    <Pagination
                        count={Math.ceil(pagination.total / 10)}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}
