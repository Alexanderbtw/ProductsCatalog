import {
    GET_DEVICE_LOADING_IN_PROGRESS,
    GET_DEVICE_SUCCESS,
    GET_DEVICE_ERROR,
    HREF_DeviceController_GetSingle,
    HREF_DeviceController_DeleteSingle
} from './deviceReadConstants.jsx';

import 'isomorphic-fetch'
import SessionManager from '../Auth/sessionManager.js';

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

        fetch(HREF_DeviceController_GetSingle + id, {
            headers: {
                Authorization: 'Bearer ' + SessionManager.getToken()
            }
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(receiveDevice(data));
            })
            .catch((err) => {
                dispatch(errorReceiveDevice(err));
            });
    }
}

export function deleteDevice(id) {
    return (dispatch) => {
        dispatch(startReceiving());
        
        fetch(HREF_DeviceController_DeleteSingle + id, {
            headers: {
                Authorization: 'Bearer ' + SessionManager.getToken()
            },
            method: 'DELETE',
        })
            .then(response => response.json())
            .catch(err => {
                dispatch(errorReceiveDevice(err));
            });
    }
}