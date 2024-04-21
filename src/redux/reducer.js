import React from "react";
import { LOAD_CATEGORIES, LOAD_PRODUCTS, PAGE_LOADING } from "./actions";

const initialState = {
    products: [],
    categories: [],
    brands: [],
    isPageLoading: true,
    pagination: {
        total: 0,
        skip: 0,
        limit: 10,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                products: action.data.products,
                filteredProducts: action.products,
                pagination: {
                    limit: action.data.limit,
                    total: action.data.total,
                    skip: action.data.skip,
                }
            };
        case LOAD_CATEGORIES:
            return { ...state, categories: action.categories }
        case PAGE_LOADING:
            return { ...state, isPageLoading: action.isLoading }
        default:
            return state
    }
}

export default reducer;