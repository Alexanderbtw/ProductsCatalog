import {
    GET_CLOTH_LOADING_IN_PROGRESS,
    GET_CLOTH_SUCCESS,
    GET_CLOTH_ERROR,
    HREF_ClothController_GetSingle
} from './clothReadConstants.jsx'

import 'isomorphic-fetch'

export function startReceiving() {
    return {
        type: GET_CLOTH_LOADING_IN_PROGRESS
    };
}

export function receiveCloth(data) {
    return {
        type: GET_CLOTH_SUCCESS,
        clothInfo: data
    };
}

export function errorReceiveCloth(err) {
    return {
        type: GET_CLOTH_ERROR,
        error: err
    };
}

export function getCloth(id) {
    return (dispath) => {
        dispath(startReceiving());

        fetch(HREF_ClothController_GetSingle + id)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispath(receiveCloth(data))
            })
            .catch((err) => {
                dispath(errorReceiveCloth(err));
            });
    }
}