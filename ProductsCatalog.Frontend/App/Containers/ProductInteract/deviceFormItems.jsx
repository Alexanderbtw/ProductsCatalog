import React from 'react';
import { Form, Input } from 'antd';

function DeviceFormItems() {
    return (
        <>
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
        </>
    );
};

export default DeviceFormItems;