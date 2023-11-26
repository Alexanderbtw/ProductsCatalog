import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Spin } from 'antd';
import { RollbackOutlined } from "@ant-design/icons"
import { Link, useParams } from "react-router-dom";

import { getDevice } from './deviceReadActions.jsx';
import Product from '../Shared/product.jsx';

const DeviceRead = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

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
        return (
            <div>Error in data loading: {error}</div>
        );
    }

    return (
        <div>
            <Divider orientation={"center"}>Information about single device</Divider>

            <Product productInfo={deviceInfo} />
            <div style={{ textAlign: "center", marginTop: "50px", fontWeight: "bold" }}>
                <Link to={"/device/index"}><RollbackOutlined /> Back to devices list</Link>
            </div>
        </div>
    );
};

export default DeviceRead;