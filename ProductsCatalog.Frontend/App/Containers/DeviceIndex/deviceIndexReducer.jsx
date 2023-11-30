import {
    GET_DEVICES_LOADING_IN_PROGRESS,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_ERROR
} from './deviceIndexConstants.jsx'

const initialState = {
    devicesInfo: [{
        id: 1, creationTime: null, title: null, price: null, description: null, manufacturer: null, cpu: null, gpu: null, camera: null, picture: null
    }],
    isLoading: false,
    totalCount: null,
    error: null
};

export default function devices(state = initialState, action) {
    switch (action.type) {
        case GET_DEVICES_LOADING_IN_PROGRESS:
            return { ...state, isLoading: true };
        case GET_DEVICES_SUCCESS:
            return { ...state, isLoading: false, devicesInfo: action.devicesInfo, totalCount: action.totalCount };
        case GET_DEVICES_ERROR:
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
}