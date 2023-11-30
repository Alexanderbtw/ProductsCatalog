import {
    GET_DEVICE_LOADING_IN_PROGRESS,
    GET_DEVICE_SUCCESS,
    GET_DEVICE_ERROR
} from './deviceReadConstants.jsx';

const initialState = {
    deviceInfo: {
        id: 1, creationTime: null, title: null, price: null, description: null, manufacturer: null, cpu: null, gpu: null, camera: null, picture: null
    },
    isLoading: false,
    error: null
};

export default function device(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICE_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_DEVICE_SUCCESS:
            return { ...state, isLoading: false, deviceInfo: action.deviceInfo };
        case GET_DEVICE_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}