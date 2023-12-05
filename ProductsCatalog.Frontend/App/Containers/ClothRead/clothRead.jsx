import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin } from 'antd';
import { useParams } from "react-router-dom";

import { getCloth } from './clothReadActions.jsx';
import Product from '../Shared/product.jsx';
import ProductSettings from '../Shared/productSettings.jsx';

const ClothRead = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    function deleteHandler(id) {
        fetch('/api/cloth/delete/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                navigate("/cloth/index/")
            })
            .catch(error => {
                console.log({ error })
            });
    }

    React.useEffect(() => {
        dispatch(getCloth(id));
    }, []);

    let { clothInfo, isLoading, error } = useSelector(state => state.clothReadReducer);

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
                Error in data loading: {error}
            </div>
        );
    }

    return (
        <div>
            <Divider orientation={"center"}>Information about single cloth</Divider>
            <Product productInfo={ clothInfo } />
            <ProductSettings
                deleteHandler={deleteHandler}
                productInfo={clothInfo}
                productCathegory="cloth"
            />
        </div>
    );
};

export default ClothRead;