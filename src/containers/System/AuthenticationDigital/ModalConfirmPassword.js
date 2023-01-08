import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
import "./fixUI.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup } from 'reactstrap';
import { handleLoginApi } from '../../../services/userService';
import Swal from 'sweetalert2';
import ModalQR from './ModalQR';

class ModalConfirmPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showQR: false,
            isPasswordConfirm: true,
            password: '',
            email: '',
            currentSecond: 60,
        }
    }

    componentDidMount() {
        let { userLoginRedux } = this.props;

        this.setState({
            email: userLoginRedux.email,
        });
    }

    componentDidUpdate(prevProps, prevState) {

    }

    toggle = () => {
        this.setState({
            isPasswordConfirm: false,
        })
    }

    handleChangeData = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitForm = async () => {
        let response = await handleLoginApi({
            email: this.state.email,
            password: this.state.password,
        });
        if (response.errCode === 0) {
            this.setState({
                isPasswordConfirm: false,
                showQR: true,
            });
            this.handleTimeout(60);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu không trùng khớp, hãy thử lại!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    handleTimeout = (s) => {
        let { showQR } = this.state;
        if (showQR) {
            setTimeout(() => {
                s = s - 1;
                this.setState({
                    currentSecond: s,
                });

                if (s < 0 || s == 0) {
                    this.handleClearTimeout(s);
                }
                this.handleTimeout(s);
            }, 1000);
        }
    }

    handleClearTimeout = (s) => {
        clearTimeout(s);
        this.setState({
            showQR: false,
            currentSecond: '',
        });
        return false;
    }

    render() {
        let { showQR, currentSecond } = this.state;

        return (
            <div className="container" >
                <div className="login-page">
                    {showQR == false ? (<Modal isOpen={this.state.isPasswordConfirm} size='lg' centered={true} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Xác nhận mật khẩu</ModalHeader>
                        <ModalBody>
                            <div className="qr-code-insert-otp">
                                <div className="form-group mt-2 otp-form-container">

                                    <input type="password" className="form-control otp-form-input" name="password" placeholder="Mật khẩu"
                                        onChange={(event) => this.handleChangeData(event)} />

                                    <button type="button" className="btn btn btn-success btn-otp-confirm" onClick={() => this.handleSubmitForm()}>
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Đóng lại</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                        </ModalFooter>
                    </Modal>) : <ModalQR urlQRCode={this.props.urlQRCode} userData={this.props.userData} currentSecond={currentSecond} />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUserInfo: state.user.currentUserInfo,
        userLoginRedux: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmPassword);
