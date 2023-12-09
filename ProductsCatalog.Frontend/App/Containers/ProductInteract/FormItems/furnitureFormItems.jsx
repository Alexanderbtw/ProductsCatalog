import React from 'react';
import { Form, Input } from 'antd';

function FurnitureFormItems() {
    return (
        <>
            <Form.Item name="materials" label="Materials" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="width" label="Width" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="depth" label="Depth" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="height" label="Height" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="color" label="Color" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="design" label="Design" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="additionalFunctions" label="AdditionalFunctions" requiredMark="optional">
                <Input />
            </Form.Item>
        </>
    );
};

export default FurnitureFormItems;