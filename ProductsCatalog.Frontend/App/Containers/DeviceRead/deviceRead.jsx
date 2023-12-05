import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin } from 'antd';
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { deleteDevice, getDevice } from './deviceReadActions.jsx';
import Product from '../Shared/product.jsx';
import ProductSettings from '../Shared/productSettings.jsx';

const DeviceRead = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    function deleteHandler(id) {
        const res = dispatch(deleteDevice(id))
        if (res) {
            navigate("/device/index/");
        }
    }

    React.useEffect(() => {
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
                Error: {error}
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Products Catalog - Device #{id}</title>
            </Helmet>
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