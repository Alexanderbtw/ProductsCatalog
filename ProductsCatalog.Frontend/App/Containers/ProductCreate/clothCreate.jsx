import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button } from 'antd';
const { TextArea } = Input;

function ClothCreate() {
    const navigate = useNavigate();

    function handleSubmit(cloth) {
        fetch('/api/cloth/create/', {
            method: 'POST',
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
            onFinish={handleSubmit}
            onFinishFailed={onSubmitFailed}
            layout="horizontal"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
        >
            <Form.Item name="Title" label="Title" rules={[{ required: true }]} hasFeedback >
                <Input />
            </Form.Item>
            <Form.Item name="Price" label="Price" rules={[{ required: true }]} hasFeedback >
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="Cathegory" label="Cathegory" rules={[{ required: true }]} hasFeedback>
                <Input />
            </Form.Item>
            <Form.Item name="Description" label="Description" rules={[{ required: true }]} hasFeedback>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="Material" label="Material" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="Size" label="Size" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="Color" label="Color" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 14,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ClothCreate;