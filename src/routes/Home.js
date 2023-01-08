import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLogIn } = this.props;

        let linkToRedirect = isLogIn;
        if (isLogIn) {
            linkToRedirect = '/system/admin-page';
        } else {
            linkToRedirect = '/login';
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLogIn: state.user.isLogIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
