import {
    GET_PRODUCTS_LOADING_IN_PROGRESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR
} from './productIndexConstants.jsx'

const initialState = {
    productsInfo: [],
    cathegories: [],
    totalCount: null,
    isLoading: false,
    error: null
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, productsInfo: action.productsInfo, totalCount: action.totalCount, cathegories: action.cathegories };
        case GET_PRODUCTS_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}