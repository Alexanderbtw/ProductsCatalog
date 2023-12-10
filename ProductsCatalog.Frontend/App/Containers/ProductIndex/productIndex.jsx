import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Divider, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getProducts } from './productIndexActions.jsx';

const colsInfo = [
    {
        title: 'Picture',
        key: 'picture',
        dataIndex: 'picture',
        width: '10%',
        render: (picture) => (
            <img
                src={picture ? 'data:image/jpeg;base64,' + picture : '/images/image_error_full.png'} alt="Product Picture" style={{ width: "150px", height: "150px", borderRadius: "25px", objectFit: "cover" }}
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
        dataIndex: 'price',
        width: '15%',
        render: (price) => (
            <>{"$" + price}</>
        ),
        sorter: () => { }

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
        dataIndex: 'creationTime',
        width: '20%',
        render: (creationTime) => (
            <>{new Date(creationTime).toLocaleDateString()}</>
        ),
        sorter: () => { }
    },
];

function ProductIndex(props) {
    const [curPagination, setPagination] = React.useState({});
    const [searchValue, setSearch] = React.useState("");
    const [sorting, setSorting] = React.useState({
        order: "",
        field: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        dispatch(getProducts(curPagination, props.productsType, searchValue, sorting.field, sorting.order == "descend"));
    }, [curPagination, props.productsType, searchValue, sorting]);

    function onChange(pagination, filters, sorter, extra) {
        setPagination({
            ...pagination
        });
        setSorting({
            order: sorter.order,
            field: sorter.order ? sorter.field : ""
        });
    }

    function onSearch(value) {
        setSearch(value);
        setPagination({});
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
                pagination={{ total: totalCount, current: curPagination.pagination }}
                onChange={onChange}
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