import React from 'react';
import { Form, Input, InputNumber } from 'antd';
const { TextArea } = Input;

function DeviceCreate() {
    return (
        <Form
            layout="horizontal"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
        >
            <Form.Item name="title" label="Title" required>
                <Input/>
            </Form.Item>
            <Form.Item name="price" label="Price" required>
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="cathegory" label="Cathegory" required>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" required>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="manufacturer" label="Manufacturer">
                <Input />
            </Form.Item>
            <Form.Item name="cpu" label="CPU">
                <Input />
            </Form.Item>
            <Form.Item name="gpu" label="GPU">
                <Input />
            </Form.Item>
            <Form.Item name="camera" label="Camera">
                <Input />
            </Form.Item>
        </Form>
    );
}

export default DeviceCreate;