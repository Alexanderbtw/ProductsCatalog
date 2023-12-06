﻿import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button } from 'antd';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

import ImageUpload from '../Shared/imageUpload.jsx';

function ClothCreate() {
    const navigate = useNavigate();
    let productInfo;
    let root = "create";
    if (window.location.href.endsWith("edit")) {
        root = "edit";
        productInfo = useSelector(state => state.productReadReducer.productInfo);
    }

    function handleSubmit(cloth) {
        fetch(`/api/cloth/${root}/`, {
            method: productInfo ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cloth)
        })
            .then(result => result.text())
            .then((result) => {
                console.log(result);
                navigate("/cloth/read/" + result);
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    function onSubmitFailed(error) {
        console.log(error);
    }

    return (
        <Form
            autoComplete="off"
            onFinish={ handleSubmit }
            onFinishFailed={ onSubmitFailed }
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
            <Form.Item name="material" label="Material" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="size" label="Size" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="color" label="Color" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 14,
                }}
            >
                <Button type="primary" htmlType="submit">
                    {root == 'create' ? 'Create' : 'Edit'} 
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ClothCreate;