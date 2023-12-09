import React from 'react';
import { Form, Input } from 'antd';

function BookFormItems() {
    return (
        <>
            <Form.Item name="author" label="Author" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="ageRating" label="Age Rating" requiredMark="optional">
                <Input />
            </Form.Item>
            <Form.Item name="publishingHouse" label="Publishing House" requiredMark="optional">
                <Input />
            </Form.Item>
        </>
    );
};

export default BookFormItems;