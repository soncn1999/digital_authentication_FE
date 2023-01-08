import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import AdminPage from '../containers/AdminPage/AdminPage';
import DemoFeatures from '../containers/System/DemoFeatures';
import CategoryManage from '../containers/System/CategoryManage';
import CreateArticle from '../containers/System/CreateArticle';
import ManageArticle from '../containers/System/ManageArticle';
import Header from '../containers/Header/Header';
import GenerateSignature from '../containers/System/AuthenticationDigital/GenerateSignature';
import VerifySignature from '../containers/System/AuthenticationDigital/VerifySignature';
import EncryptData from '../containers/System/AuthenticationDigital/EncryptData';
import DecryptData from '../containers/System/AuthenticationDigital/DecryptData';

class System extends Component {
    render() {
        const { systemMenuPath, isLogIn } = this.props;

        return (
            <div className="system-container">
                {isLogIn && <Header />}
                <div className="system-list">
                    <Switch>
                        {/* Admin Page Router */}
                        <Route path="/system/admin-page" component={AdminPage} />
                        {/* Manage User */}
                        <Route path="/system/user-inside" component={UserManage} />
                        <Route path="/system/user-outside" component={UserManage} />
                        {/* Demo technique features */}
                        <Route path="/system/demo-features" component={DemoFeatures} />
                        {/* Manage Category */}
                        <Route path="/system/manage-category" component={CategoryManage} />
                        {/* Manage Article */}
                        <Route path="/system/create-article" component={CreateArticle} />
                        <Route path="/system/list-article" component={ManageArticle} />

                        <Route path="/system/authentication-digital/generate-signature" component={GenerateSignature} />
                        <Route path="/system/authentication-digital/verify-signature" component={VerifySignature} />
                        <Route path="/system/authentication-digital/encrypt-data" component={EncryptData} />
                        <Route path="/system/authentication-digital/decrypt-data" component={DecryptData} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLogIn: state.user.isLogIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
