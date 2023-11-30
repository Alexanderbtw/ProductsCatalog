import {
    GET_CLOTH_LOADING_IN_PROGRESS,
    GET_CLOTH_SUCCESS,
    GET_CLOTH_ERROR
} from './clothReadConstants.jsx'

const initialState = {
    clothInfo: {
        id: 1, creationTime: null, title: null, price: null, description: null, material: null, size: null, color: null, picture: null
    },
    isLoading: false,
    error: null
}

export default function cloth(state = initialState, action) {
    switch (action.type) {
        case GET_CLOTH_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_CLOTH_SUCCESS:
            return { ...state, isLoading: false, clothInfo: action.clothInfo };
        case GET_CLOTH_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}