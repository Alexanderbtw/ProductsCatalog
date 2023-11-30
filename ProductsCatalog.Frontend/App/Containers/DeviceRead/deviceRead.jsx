import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin } from 'antd';
import { useParams } from "react-router-dom";

import { getDevice } from './deviceReadActions.jsx';
import Product from '../Shared/product.jsx';
import ProductSettings from '../Shared/productSettings.jsx';

const DeviceRead = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    function deleteHandler(id) {
        fetch('/api/device/delete/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                navigate("/device/index/")
            })
            .catch(error => {
                console.log({ error })
            });
    }

    React.useEffect(() => {
        document.title = "Products Catalog - Device #" + id;
        dispatch(getDevice(id));
    }, []);

    let { deviceInfo, isLoading, error } = useSelector(state => state.deviceReadReducer);

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
            <Divider orientation={"center"}>Information about single device</Divider>
            <Product productInfo={deviceInfo} />
            <ProductSettings
                deleteHandler={deleteHandler}
                productInfo={deviceInfo}
                productCathegory="device"
            />
        </div>
    );
};

export default DeviceRead;