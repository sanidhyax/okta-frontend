export const LOAD_PRODUCTS = "LOAD_PRODUCTS"
export const LOAD_CATEGORIES = "LOAD_CATEGORIES"
export const SET_CATEGORY = "SET_CATEGORY"
export const SET_BRAND = "SET_BRAND"
export const PAGE_LOADING = "PRODUCTS_LOADING"

export const loadProducts = (data) => {
    return {
        type: LOAD_PRODUCTS,
        data
    }
}

export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export const setPageLoading = (isLoading) => {
    return {
        type:PAGE_LOADING,
        isLoading
    }
}

