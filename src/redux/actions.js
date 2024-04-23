export const LOAD_PRODUCTS = "LOAD_PRODUCTS"
export const LOAD_CATEGORIES = "LOAD_CATEGORIES"
export const LOAD_BRANDS = "LOAD_BRANDS"
export const PAGE_LOADING = "PRODUCTS_LOADING"
export const SET_FILTERED_PRODUCTS = "SET_FILTERED_PRODUCTS"
export const SET_ACTIVE_PRODUCT = "SET_ACTIVE_PRODUCT"

export const loadProducts = (data) => {
    return {
        type: LOAD_PRODUCTS,
        data
    }
}

export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories,
    }
}

export const loadBrands = (brands) => {
    return {
        type: LOAD_BRANDS,
        brands,
    }
}

export const setPageLoading = (isLoading) => {
    return {
        type:PAGE_LOADING,
        isLoading
    }
}

export const setActiveProduct = (product) => {
    return {
        type:SET_ACTIVE_PRODUCT,
        product
    }
}