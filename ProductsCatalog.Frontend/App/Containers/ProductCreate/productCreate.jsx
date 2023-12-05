import React from 'react';
import { Divider, Spin, Radio } from 'antd';
import { Helmet } from 'react-helmet';

import DeviceCreate from './deviceCreate.jsx';
import ClothCreate from './clothCreate.jsx';

function ProductCreate() {
    const [selectedProduct, setProduct] = React.useState(null);
    let form = null;

    function handleChange(event) {
        setProduct(event.target.value);
    }

    if (selectedProduct == 'Device') {
        form = (
            <DeviceCreate />
        );
    } else if (selectedProduct == 'Cloth') {
        form = (
            <ClothCreate />
        );
    }

    return (
        <>
            <Helmet>
                <title>Products Catalog - Create</title>
            </Helmet>

            <Divider>
                <Radio.Group value={selectedProduct} onChange={handleChange}>
                    <Radio.Button value="Device">Device</Radio.Button>
                    <Radio.Button value="Cloth">Cloth</Radio.Button>
                </Radio.Group>
            </Divider>
            {form}
        </>
    );
}

export default ProductCreate;