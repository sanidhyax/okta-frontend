import { LOAD_BRANDS, LOAD_CATEGORIES, LOAD_PRODUCTS, PAGE_LOADING } from "./actions";

const initialState = {
    products: [],
    categories: [],
    brands: [],
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
        default:
            return state
    }
}

export default reducer;