import React from 'react';
import { connect } from 'react-redux';
import { getCloth } from './clothReadActions.jsx';

class ClothRead extends React.Component {
    componentDidMount() {
        this.props.getCloth(1);
    }

    render() {
        let clothInfo = this.props.clothInfo;
        let isLoading = this.props.isLoading;
        let error = this.props.error;

        if (isLoading) {
            return (
                <div>Loading data...</div>
            );
        }

        if (error) {
            return (
                <div>Error id data loading: {error}</div>
            );
        }

        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Information about single cloth</h3>

                {Object.keys(clothInfo).map(key => (
                    <div key={key}>
                        <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>{key}: </span>
                        <span>{clothInfo[key]}</span>
                    </div>
                ))}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        clothInfo: state.clothReadReducer.clothInfo,
        isLoading: state.clothReadReducer.isLoading,
        error: state.clothReadReducer.error
    };
};

let mapActionToProps = (dispatch) => {
    return {
        getCloth: (id) => dispatch(getCloth(id))
    };
};

export default connect(mapStateToProps, mapActionToProps)(ClothRead);