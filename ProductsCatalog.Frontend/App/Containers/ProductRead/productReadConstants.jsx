export const GET_PRODUCT_LOADING_IN_PROGRESS = "GET_PRODUCT_LOADING_IN_PROGRESS";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";

export const HREF_ProductController_GetSingle = (productType) => `/api/${productType}/get/`;
export const HREF_ProductController_DeleteSingle = (productType) => `/api/${productType}/delete/`;