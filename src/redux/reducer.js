import { LOAD_BRANDS, LOAD_CATEGORIES, LOAD_PRODUCTS, PAGE_LOADING, SET_ACTIVE_PRODUCT, SET_BRANDS_LOADING, SET_CATEGORIES_LOADING } from "./actions";

const initialState = {
    products: [],
    categories: [],
    activeProduct:null,
    brands: [],
    isBrandsLoading:true,
    isCategoriesLoading:true,
    isPageLoading:false,
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
                filteredProducts: action.data.products,
                isPageLoading:false,
                activeProduct:null,
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
        case LOAD_BRANDS:
            return {...state, brands: action.brands}
        case SET_ACTIVE_PRODUCT:
            return {...state, activeProduct:action.product}
        case SET_CATEGORIES_LOADING:
            return {...state, isCategoriesLoading:action.isCategoriesLoading}
        case SET_BRANDS_LOADING:
            return {...state, isBrandsLoading:action.isBrandsLoading}
        default:
            return state
    }
}

export default reducer;