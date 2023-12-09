import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin } from 'antd';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { deleteProduct, getProduct } from './productReadActions.jsx';
import Product from '../Shared/product.jsx';
import ProductSettings from '../Shared/productSettings.jsx';

function ProductRead(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    function deleteHandler(id) {
        dispatch(deleteProduct(id, props.productType))
        navigate(`/${props.productType}/Index`);
    }

    React.useEffect(() => {
        dispatch(getProduct(id, props.productType));
    }, []);

    let { productInfo, isLoading, error } = useSelector(state => state.productReadReducer);

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        console.log({ error });
        return (
            <div>
                Error: {error}
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Products Catalog - {props.productType} #{id}</title>
            </Helmet>
            <Divider orientation={"center"}>Information about single {props.productType}</Divider>
            <Product productInfo={productInfo} />
            <ProductSettings
                deleteHandler={deleteHandler}
                productId={productInfo.id}
                productType={props.productType}
            />
        </div>
    );
};

export default ProductRead;