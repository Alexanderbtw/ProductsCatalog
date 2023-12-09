import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin, Divider, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getProducts } from './productIndexActions.jsx';

const colsInfo = [
    {
        title: 'Picture',
        key: 'picture',
        width: '10%',
        render: (text, record) => (
            <img
                src={record.picture ? 'data:image/jpeg;base64,' + record.picture : '/images/image_error_full.png'} alt="Product Picture" style={{ width: "150px", height: "150px", borderRadius:"25px", objectFit:"cover" }}
            />
        )
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '20%'
    },
    {
        title: 'Cathegory',
        dataIndex: 'cathegory',
        key: 'cathegory',
        width: '10%'
    },
    {
        title: 'Price',
        key: 'price',
        width: '15%',
        render: (text, record) => (
            <>{"$" + record.price}</>
        )
        
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '25%'
    },
    {
        title: 'Creation Date',
        key: 'creationTime',
        width: '20%',
        render: (text, record) => (
            <>{new Date(record.creationTime).toLocaleDateString()}</>
        )
    },
];

function ProductIndex(props) {
    const [current, setCurrent] = React.useState(1);
    const [searchValue, setSearch] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    React.useEffect(() => {
        dispatch(getProducts(new Object, props.productsType));
    }, []);

    React.useEffect(() => {
        dispatch(getProducts(new Object, props.productsType));
    }, [location]);

    function handleTableChange(pagination, filters, sorter) {
        dispatch(getProducts(pagination, props.productsType, searchValue));
        setCurrent(pagination.current);
    }

    function onSearch(value) {
        dispatch(getProducts(new Object, props.productsType, value));
        setSearch(value);
        setCurrent(1);
    }

    let productsInfo = useSelector(state => state.productIndexReducer.productsInfo).map(item => ({ ...item, key: item.id }));
    let { isLoading, error, totalCount } = useSelector(state => state.productIndexReducer);

    if (error) {
        return (
            <div>Error in data loading: {error}</div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Helmet>
                <title>Products Catalog - {props.productsType}</title>
            </Helmet>

            <Input.Search
                placeholder="Search..."
                onSearch={onSearch}
                enterButton
                loading={isLoading}
            />

            <Divider orientation={"center"}>{props.productsType}s List</Divider>
            <Table
                dataSource={productsInfo}
                columns={colsInfo}
                loading={isLoading}
                pagination={{ total: totalCount, current: current }}
                onChange={handleTableChange}
                onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${props.productsType}/Read/` + record.id)
                        }
                    }
                }}
            />
        </div>
    );
};

export default ProductIndex;