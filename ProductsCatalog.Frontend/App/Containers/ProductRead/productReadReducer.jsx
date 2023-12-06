import {
    GET_PRODUCT_LOADING_IN_PROGRESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR
} from './productReadConstants.jsx';

const initialState = {
    productInfo: {
        id: 1, creationTime: null, title: null, price: null, description: null, picture: null,
        manufacturer: null, cpu: null, gpu: null, camera: null,
        material: null, size: null, color: null
    },
    isLoading: false,
    error: null
};

export default function product(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, productInfo: action.productInfo };
        case GET_PRODUCT_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}