import React from 'react';
import { Form, Input } from 'antd';

function ClothFormItems() {
    return (
        <>
            <Form.Item name="material" label="Material" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="size" label="Size" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="color" label="Color" requiredMark="optional">
                <Input />
            </Form.Item>
        </>
    );
};

export default ClothFormItems;