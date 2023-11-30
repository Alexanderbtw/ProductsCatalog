import React from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function ImageUpload({ value, onChange }) {
    let [fileList, setFileList] = React.useState(value ? [
        {
            uid: '1',
            name: 'was.jpeg',
            status: 'done',
            url: value ? 'data:image/jpeg;base64,' + value : null
        }
    ] : []);

    function handleChange({ file }) {
        if(file.status === 'removed') {
            setFileList([]);
            onChange(null);
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = function () {
                onChange(reader.result.split(",")[1]);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            setFileList([file]);
        }
    }

    return (
        <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            accept=".png,.jpg"
        >
            {fileList.length === 0 ? <div>
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </div> : null}
        </Upload>
    );
}

export default ImageUpload;