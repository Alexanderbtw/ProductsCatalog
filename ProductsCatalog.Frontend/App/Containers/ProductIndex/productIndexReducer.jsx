import {
    GET_PRODUCTS_LOADING_IN_PROGRESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR
} from './productIndexConstants.jsx'

const initialState = {
    productsInfo: [{
        id: 1, creationTime: null, title: null, price: null, description: null, picture: null,
        manufacturer: null, cpu: null, gpu: null, camera: null, 
        material: null, size: null, color: null
    }],
    isLoading: false,
    totalCount: null,
    error: null
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, productsInfo: action.productsInfo, totalCount: action.totalCount };
        case GET_PRODUCTS_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}