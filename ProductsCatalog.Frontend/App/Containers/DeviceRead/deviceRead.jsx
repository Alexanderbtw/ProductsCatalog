import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin, Popconfirm, Button } from 'antd';
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link, useParams } from "react-router-dom";

import { getDevice } from './deviceReadActions.jsx';
import Product from '../Shared/product.jsx';

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

    return (
        <div>
            <Divider orientation={"center"}>Information about single device</Divider>

            <Product productInfo={deviceInfo} />
            <div style={{ marginTop: "50px", fontWeight: "bold", display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
                <Link to={"/device/index"}>
                    <Button type="primary">
                        <RollbackOutlined />
                    </Button>
                </Link>
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => deleteHandler(deviceInfo.id)}
                >
                    <Button type="primary">
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </div>
        </div>
    );
};

export default DeviceRead;