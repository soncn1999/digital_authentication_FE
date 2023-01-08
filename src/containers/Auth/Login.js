import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'email@example.com',
            password: '123456',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleLogin = () => {
        this.setState({
            errMessage: '',
        });
        let response = this.props.handleLoginRedux({
            email: this.state.email,
            password: this.state.password
        });
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    handleCreateNewUser = () => {
        if (this.props.history) {
            this.props.history.push(`/user-register`);
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">
                            Login
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Email</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeInput(event)}
                            />

                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="login-input__password">
                                <input type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event)}
                                />
                                <div className="login-input__password-showhide" onClick={() => this.handleShowPassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 login-input">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className="col-12 login-input">
                            <span className="forgot-password">Forgot your password</span>

                            <span className="create-new-account" onClick={() => this.handleCreateNewUser()}>Create new Account</span>
                        </div>
                        <div className="col-12 text-center mt-5">
                            <span className="">Or login with</span>
                            <div className="login-social__list">
                                <div className="login-social__icon login-social__icon-facebook">
                                    <a href="#" className="login-social__link">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </div>
                                <div className="login-social__icon login-social__icon-twitter">
                                    <a href="#" className="login-social__link">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </div>
                                <div className="login-social__icon login-social__icon-google">
                                    <a href="#" className="login-social__link">
                                        <i className="fab fa-google-plus-g"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        handleLoginRedux: (data) => dispatch(actions.handleLoginRedux(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
