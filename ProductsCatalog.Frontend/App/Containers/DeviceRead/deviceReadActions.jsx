import {
    GET_DEVICE_LOADING_IN_PROGRESS,
    GET_DEVICE_SUCCESS,
    GET_DEVICE_ERROR,
    HREF_DeviceController_GetSingle
} from './deviceReadConstants.jsx';

import 'isomorphic-fetch'

export function startReceiving() {
    return {
        type: GET_DEVICE_LOADING_IN_PROGRESS
    };
}

export function receiveDevice(data) {
    return {
        type: GET_DEVICE_SUCCESS,
        deviceInfo: data
    };
}

export function errorReceiveDevice(err) {
    return {
        type: GET_DEVICE_ERROR,
        error: err
    };
}

export function getDevice(id) {
    return (dispatch) => {
        dispatch(startReceiving());

        fetch(HREF_DeviceController_GetSingle + id)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispatch(receiveDevice(data));
            })
            .catch((err) => {
                dispatch(errorReceiveDevice(err));
            });
    }
}