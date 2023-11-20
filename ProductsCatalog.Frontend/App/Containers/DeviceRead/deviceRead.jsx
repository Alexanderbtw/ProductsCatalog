import React from 'react';
import { connect } from 'react-redux';
import { getDevice } from './deviceReadActions.jsx';

class DeviceRead extends React.Component {
    componentDidMount() {
        this.props.getDevice(1);
    }

    render() {
        let deviceInfo = this.props.deviceInfo;
        let isLoading = this.props.isLoading;
        let error = this.props.error;

        if (isLoading) {
            return (
                <div>Loading data...</div>
            );
        }

        if (error) {
            return (
                <div>Error in data loading: {error}</div>
            );
        }

        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Information about single device</h3>

                {Object.keys(deviceInfo).map(key => (
                    <div key={key}>
                        <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{key}: </span>
                        <span>{deviceInfo[key]}</span>
                    </div>
                ))}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        deviceInfo: state.deviceReadReducer.deviceInfo,
        isLoading: state.deviceReadReducer.isLoading,
        error: state.deviceReadReducer.error
    };
};

let mapActionToProps = (dispatch) => {
    return {
        getDevice: (id) => dispatch(getDevice(id))
    };
};

export default connect(mapStateToProps, mapActionToProps)(DeviceRead);