import {
    GET_DEVICES_LOADING_IN_PROGRESS,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_ERROR,
    HREF_DeviceController_GetAll
} from './deviceIndexConstants.jsx'

import 'isomorphic-fetch'

export function startReceiving() {
    return {
        type: GET_DEVICES_LOADING_IN_PROGRESS
    };
}

export function receiveDevices(data) {
    return {
        type: GET_DEVICES_SUCCESS,
        devicesInfo: data
    };
}

export function errorReceiveDevices(err) {
    return {
        type: GET_DEVICES_ERROR,
        error: err
    };
}

export function getDevices() {
    return (dispatch) => {
        dispatch(startReceiving());

        fetch(HREF_DeviceController_GetAll)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispatch(receiveDevices(data));
            })
            .catch((err) => {
                dispatch(errorReceiveDevices(err));
            });
    }
}