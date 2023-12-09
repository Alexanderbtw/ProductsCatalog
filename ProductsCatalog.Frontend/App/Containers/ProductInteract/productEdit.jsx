import React from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Input, InputNumber, Button } from 'antd';
const { TextArea } = Input;

import ImageUpload from '../Shared/imageUpload.jsx';
import SessionManager from '../Auth/sessionManager.js';
import DeviceFormItems from './FormItems/deviceFormItems.jsx';
import ClothFormItems from './FormItems/clothFormItems.jsx';
import ShoeFormItems from './FormItems/shoeFormItems.jsx';
import FurnitureFormItems from './FormItems/furnitureFormItems.jsx';

function ProductEdit() {
    let { selectedType } = useParams();
    const navigate = useNavigate();
    const productInfo = useSelector(state => state.productReadReducer.productInfo);
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    let items = null;

    function handleSubmit(product) {
        setLoading(true);

        fetch(`/api/${selectedType}/edit/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + SessionManager.getToken()
            },
            body: JSON.stringify(product)
        })
            .then(result => result.text())
            .then((result) => {
                console.log(result);
                navigate(`/${selectedType}/Read/` + result);
            })
            .catch((error) => {
                console.log({ error });
                setError("Unknown error");
            });

        setLoading(false);
    }

    function onSubmitFailed(error) {
        console.log(error);
    }

    if (selectedType == 'Device') {
        items = (
            <DeviceFormItems />
        );
    } else if (selectedType == 'Cloth') {
        items = (
            <ClothFormItems />
        );
    } else if (selectedType == 'Shoe') {
        items = (
            <ShoeFormItems />
        );
    } else if (selectedType == 'Furniture') {
        items = (
            <FurnitureFormItems />
        );
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Error: {error}
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Products Catalog - Edit</title>
            </Helmet>

            <Form
                autoComplete="off"
                onFinish={handleSubmit}
                onFinishFailed={onSubmitFailed}
                initialValues={{
                    ...productInfo
                }}
                requiredMark="optional"
                layout="horizontal"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
            >
                <Form.Item name="id" hidden={true} />
                <Form.Item name="creationTime" hidden={true} />

                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true }]}
                    hasFeedback >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    hasFeedback
                    rules={[{ required: true }]}
                >
                    <InputNumber
                        style={{ width: 'auto' }}
                        min={0}
                        max={1000000}
                        controls={false}
                        precision={2}
                        addonBefore="$"
                    />
                </Form.Item>

                <Form.Item
                    name="cathegory"
                    label="Cathegory"
                    rules={[{ required: true }]}
                    hasFeedback>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                    hasFeedback>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="picture"
                    label="Picture">
                    <ImageUpload />
                </Form.Item>

                {items}

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ProductEdit;