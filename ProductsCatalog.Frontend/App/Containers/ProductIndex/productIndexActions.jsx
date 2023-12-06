import SessionManager from '../Auth/sessionManager.js';
import {
    GET_PRODUCTS_LOADING_IN_PROGRESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    HREF_ProductController_GetAll
} from './productIndexConstants.jsx'

import 'isomorphic-fetch'

export function startReceiving() {
    return {
        type: GET_PRODUCTS_LOADING_IN_PROGRESS
    };
}

export function receiveProducts(data) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        productsInfo: data.productsInfo,
        totalCount: data.totalCount
    };
}

export function errorReceiveProducts(err) {
    return {
        type: GET_PRODUCTS_ERROR,
        error: err
    };
}

export function getProducts(pagination, productsType) {
    let page = !pagination.current ? 1 : pagination.current;
    let pageSize = !pagination.pageSize ? 10 : pagination.pageSize;

    return (dispatch) => {
        let queryTrailer = '?page=' + page + '&pageSize=' + pageSize;

        dispatch(startReceiving());

        fetch(HREF_ProductController_GetAll(productsType) + queryTrailer, {
            headers: {
                Authorization: 'Bearer ' + SessionManager.getToken()
            }
        })
            .then((response) => {
                var parsedJson = response.json();
                return parsedJson;
            })
            .then((data) => {
                dispatch(receiveProducts(data));
            })
            .catch((err) => {
                dispatch(errorReceiveProducts(err));
            });
    }
}