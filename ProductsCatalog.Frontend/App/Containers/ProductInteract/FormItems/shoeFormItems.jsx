import React from 'react';
import { Form, Input } from 'antd';

function ShoeFormItems() {
    return (
        <>
            <Form.Item name="color" label="Color" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="season" label="Season" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="size" label="Size" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="material" label="Material" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="insole" label="Insole" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="sole" label="Sole" requiredMark="optional">
                <Input />
            </Form.Item>
        </>
    );
};

export default ShoeFormItems;