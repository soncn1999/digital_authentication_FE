import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage/Homepage';

class System extends Component {
    render() {
        const { systemMenuPath, isLogIn } = this.props;

        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        {/* Admin Page Router */}
                        <Route path="/homepage" component={Homepage} />
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
