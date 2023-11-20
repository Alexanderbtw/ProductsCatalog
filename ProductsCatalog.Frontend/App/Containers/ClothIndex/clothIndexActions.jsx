import {
    GET_CLOTHES_LOADING_IN_PROGRESS,
    GET_CLOTHES_SUCCESS,
    GET_CLOTHES_ERROR,
    HREF_ClothController_GetAll
} from './clothIndexConstants.jsx'

import 'isomorphic-fetch';

export function startReceiving() {
    return {
        type: GET_CLOTHES_LOADING_IN_PROGRESS
    };
}

export function receiveClothes(data) {
    return {
        type: GET_CLOTHES_SUCCESS,
        clothesInfo: data
    };
}

export function errorReceiveClothes(err) {
    return {
        type: GET_CLOTHES_ERROR,
        error: err
    };
}

export function getClothes() {
    return (dispatch) => {
        dispatch(startReceiving());

        fetch(HREF_ClothController_GetAll)
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispatch(receiveClothes(data));
            })
            .catch((err) => {
                dispatch(errorReceiveClothes(err));
            });
    }
}