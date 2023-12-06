import React from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Input, InputNumber, Button } from 'antd';
const { TextArea } = Input;

import DeviceFormItems from './FormItems/deviceFormItems.jsx';
import ClothFormItems from './FormItems/clothFormItems.jsx';
import ImageUpload from '../Shared/imageUpload.jsx';
import SessionManager from '../Auth/sessionManager.js';

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
                navigate(`/${selectedType}/read/` + result);
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

                <Form.Item name="title" label="Title" required hasFeedback >
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" required hasFeedback>
                    <InputNumber
                        style={{ width: 'auto' }}
                        min={0}
                        max={1000000}
                        controls={false}
                        precision={2}
                        addonBefore="$"
                    />
                </Form.Item>
                <Form.Item name="cathegory" label="Cathegory" required hasFeedback>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" required hasFeedback>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="picture" label="Picture">
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