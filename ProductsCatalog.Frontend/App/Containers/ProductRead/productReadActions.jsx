import {
    GET_PRODUCT_LOADING_IN_PROGRESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,
    HREF_ProductController_GetSingle,
    HREF_ProductController_DeleteSingle
} from './productReadConstants.jsx';

import 'isomorphic-fetch'
import SessionManager from '../Auth/sessionManager.js';

export function startReceiving() {
    return {
        type: GET_PRODUCT_LOADING_IN_PROGRESS
    };
}

export function receiveProduct(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        productInfo: data
    };
}

export function errorReceiveProduct(err) {
    return {
        type: GET_PRODUCT_ERROR,
        error: err
    };
}

export function getProduct(id, productType) {
    return (dispatch) => {
        dispatch(startReceiving());

        fetch(HREF_ProductController_GetSingle(productType) + id, {
            headers: {
                Authorization: 'Bearer ' + SessionManager.getToken()
            }
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(receiveProduct(data));
            })
            .catch((err) => {
                dispatch(errorReceiveProduct(err));
            });
    }
}

export function deleteProduct(id, productType) {
    return (dispatch) => {
        dispatch(startReceiving());
        
        fetch(HREF_ProductController_DeleteSingle(productType) + id, {
            headers: {
                Authorization: 'Bearer ' + SessionManager.getToken()
            },
            method: 'DELETE',
        })
            .catch(err => {
                dispatch(errorReceiveProduct(err));
            });
    }
}