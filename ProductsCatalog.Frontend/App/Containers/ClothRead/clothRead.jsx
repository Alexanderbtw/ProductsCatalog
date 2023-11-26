import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Spin } from 'antd';
import { RollbackOutlined } from "@ant-design/icons"
import { Link, useParams } from "react-router-dom";

import { getCloth } from './clothReadActions.jsx';
import Product from '../Shared/product.jsx';

const ClothRead = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

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
        return (
            <div>Error id data loading: {error}</div>
        );
    }

    return (
        <div>
            <Divider orientation={"center"}>Information about single cloth</Divider>

            <Product productInfo={clothInfo} />
            <div style={{ textAlign: "center", marginTop: "50px", fontWeight: "bold" }}>
                <Link to={"/cloth/index"}><RollbackOutlined /> Back to clothes list</Link>
            </div>
        </div>
    );
};

export default ClothRead;