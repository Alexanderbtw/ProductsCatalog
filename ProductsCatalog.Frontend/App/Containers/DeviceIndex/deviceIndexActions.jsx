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
        devicesInfo: data.devicesInfo,
        totalCount: data.totalCount
    };
}

export function errorReceiveDevices(err) {
    return {
        type: GET_DEVICES_ERROR,
        error: err
    };
}

export function getDevices(pagination) {
    let page = !pagination.current ? 1 : pagination.current;
    let pageSize = !pagination.pageSize ? 10 : pagination.pageSize;

    return (dispatch) => {
        let queryTrailer = '?page=' + page + '&pageSize=' + pageSize;

        dispatch(startReceiving());

        fetch(HREF_DeviceController_GetAll + queryTrailer, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("JWT")
            }
        })
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