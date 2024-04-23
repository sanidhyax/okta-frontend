import React, { useEffect, useState } from "react";
import '../App.css';
import { FilterBar } from "./FilterBar";
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, loadProducts, setPageLoading, loadBrands } from "../redux/actions";
import ProductList from "./ProductList";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Search from "./Search";
import SingleProduct from "./SingleProduct";

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
    const activeProduct = useSelector(state => state.activeProduct)

    const [activeFilters, setActiveFilters] = useState(defaultFilters)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchParam, setSearchParam] = useState('')
    const [localSearchResults, setLocalSearchresults] = useState([])
    const [error, setError] = useState(false)

    const url = "https://dummyjson.com/products"
    const categoriesURL = "https://dummyjson.com/products/categories"
    const brandUrl = "https://extenddummyjson-latest.onrender.com/products/brands"
    const baseUrlForNewEndpoint = "https://extenddummyjson-latest.onrender.com/products"
    const baseUrlForDummyJson = "https://dummyjson.com/products"

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

    const injectDiscountedPrice = (products) => {
        return products.map(p => {
            const discountedPrice = p.price - ((p.discountPercentage / 100) * p.price);
            const num = parseFloat(discountedPrice.toFixed(2)); // Round to 2 digits
            return { ...p, discountedPrice: num };
        })
    }

    const getProductsByCategoryAndBrand = async (category, brand) => {
        let finalUrl;

        if (category !== '' && brand !== '') {
            finalUrl = baseUrlForNewEndpoint + `/category/${category}/brand/${brand}`
        }
        else if (category !== '') {
            finalUrl = baseUrlForDummyJson + `/category/${category}`
        }
        else if (brand !== '') {
            finalUrl = baseUrlForNewEndpoint `/brand/${brand}`
        }
        getProducts(finalUrl, 0, 10)
    }

const getProducts = async (url, skip, limit) => {
    dispatch(setPageLoading(true));
    try {
        const response = await axios.get(url, {
            params: {
                limit: limit,
                skip: skip,
            }
        });
        const data = response.data;
        var prods = injectDiscountedPrice(data.products)
        dispatch(loadProducts({ ...data, products: prods }));
        window.scrollTo(0, 0);
        setFilteredProducts([...prods]);
        setSearchParam('')
        dispatch(setPageLoading(false));
    } catch (e) {
        setError(true)
        console.log("SOME ERROR OCCURRED", e)
    }
}

// const searchProducts = async (url, skip, limit, searchQuery) => {
//     dispatch(setPageLoading(true));
//     const response = await axios.get(url, {
//         params: {
//             limit: limit,
//             skip: skip,
//             q: searchQuery
//         }
//     });
//     const data = response.data;
//     console.log(data)
//     dispatch(loadProducts(data));
//     window.scrollTo(0, 0);
//     setFilteredProducts([...data.products]);
// };


const sortProducts = (sortBy, prods) => {
    if (sortBy === 'hightolow') {
        return prods.sort((a, b) => a.discountedPrice - b.discountedPrice); // Sort low to high
    } else if (sortBy === 'lowtohigh') {
        return prods.sort((a, b) => b.discountedPrice - a.discountedPrice); // Sort high to low
    } else {
        return prods.sort((a, b) => a.title.localeCompare(b.title));
    }
};

const handlePageChange = (event, page) => {
    getProducts(url, (page - 1) * 10, pagination.limit)
}

const handleSorting = (sortBy) => {
    setActiveFilters({ ...activeFilters, sortBy })
    setFilteredProducts([...sortProducts(sortBy, filteredProducts)])
}
const handleBrandChange = (brand) => {
    setActiveFilters({ ...activeFilters, brand })
    // filterProducts(brand, activeFilters.category)
    getProductsByCategoryAndBrand(activeFilters.category, brand)
}
const handleCategoryChange = (category) => {
    setActiveFilters({ ...activeFilters, category })
    // filterProducts(activeFilters.brand, category)
    getProductsByCategoryAndBrand(category, activeFilters.brand)
}
const handleSearchParamChange = (param) => {
    setSearchParam(param)
    if (param !== '') {
        const searched = filteredProducts.filter(p => p.title.toLowerCase().includes(param.toLowerCase()));
        setLocalSearchresults(searched)
    } else {
        setLocalSearchresults([])
    }
}
const handleSearchClick = () => {
    // if (searchParam != '')
    // searchProducts(url, 0, pagination.limit, searchParam)
}

const filterProducts = (brand, category) => {
    const classifed = products.filter(p => {
        if (brand !== "" && p.brand !== brand) return false
        if (category !== "" && p.category !== category) return false
        return true
    })
    console.log(classifed)
    setFilteredProducts([...classifed])
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
        {activeProduct ? <SingleProduct product={activeProduct} /> : null}
        <div>
            <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {error ? <div>SOME ERROR OCCURRED </div> : <ProductList products={sortProducts(activeFilters.sortBy, searchParam.length > 0 ? localSearchResults : filteredProducts)} />}
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
