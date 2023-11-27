import {
    GET_CLOTHES_LOADING_IN_PROGRESS,
    GET_CLOTHES_SUCCESS,
    GET_CLOTHES_ERROR
} from './clothIndexConstants.jsx'

const initialState = {
    clothesInfo: [{
        id: 1, creationTime: null, title: null, price: null, cathegory: null, description: null, material: null, size: null, color: null
    }],
    isLoading: false,
    totalCount: null,
    error: null
};

export default function clothes(state = initialState, action) {
    switch (action.type) {
        case GET_CLOTHES_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_CLOTHES_SUCCESS:
            return { ...state, isLoading: false, clothesInfo: action.clothesInfo, totalCount: action.totalCount };
        case GET_CLOTHES_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}