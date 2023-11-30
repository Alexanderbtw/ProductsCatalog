import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Spin, Popconfirm, Button } from 'antd';
import { RollbackOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link, useParams } from "react-router-dom";

import { getCloth } from './clothReadActions.jsx';
import Product from '../Shared/product.jsx';

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
        document.title = "Products Catalog - Cloth #" + id;
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
            <div style={{ marginTop: "50px", fontWeight: "bold", display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
                <Link to={"/cloth/index"}>
                    <Button type="primary">
                        <RollbackOutlined />
                    </Button>
                </Link>
                <Link to={"/cloth/edit"}>
                    <Button type="primary">
                        <EditOutlined />
                    </Button>
                </Link>
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={ () => deleteHandler(clothInfo.id) }
                >
                    <Button type="primary">
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </div>
        </div>
    );
};

export default ClothRead;