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
        clothesInfo: data.clothesInfo,
        totalCount: data.totalCount
    };
}

export function errorReceiveClothes(err) {
    return {
        type: GET_CLOTHES_ERROR,
        error: err
    };
}

export function getClothes(pagination) {
    let page = !pagination.current ? 1 : pagination.current;
    let pageSize = !pagination.pageSize ? 10 : pagination.pageSize;

    return (dispatch) => {
        let queryTrailer = '?page=' + page + '&pageSize=' + pageSize;

        dispatch(startReceiving());

        fetch(HREF_ClothController_GetAll + queryTrailer)
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