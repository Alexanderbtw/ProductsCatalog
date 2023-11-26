import React from 'react';
import { Divider, Spin, Radio } from 'antd';

import DeviceCreate from './deviceCreate.jsx';

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
            <Spin/>
        );
    }

    return (
        
        <>
            <Radio.Group value={selectedProduct} onChange={handleChange}>
                <Radio.Button value="Device">Device</Radio.Button>
                <Radio.Button value="Cloth">Cloth</Radio.Button>
            </Radio.Group>
            {form}
        </>
    );
}

export default ProductCreate;