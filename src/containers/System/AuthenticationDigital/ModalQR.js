import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
import "./fixUI.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup } from 'reactstrap';
import { handleGenerateSign } from '../../../services/digitalAuthentication';
import Swal from 'sweetalert2';
import { emitter } from '../../../utils/emiter';

class ModalQR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urlQRCode: '',
            showQR: true,
            otp: '',
            privateKey: '',
            token: '',
            message: '',
            signed: '',
        }
    }

    componentDidMount() {
        let { urlQRCode } = this.props;
        let { message, privateKey, token } = this.props.userData;

        this.setState({
            urlQRCode: urlQRCode,
            message: message,
            privateKey: privateKey,
            token: token,
        });

    }

    componentDidUpdate(prevProps, prevState) {

    }

    toggle = () => {
        this.setState({
            showQR: false,
        })
    }

    handleChangeOTPData = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmitForm = async () => {
        let response = await handleGenerateSign({
            message: this.state.message,
            privateKey: this.state.privateKey,
            token: this.state.token,
            otpCode: this.state.otp,
        });

        this.toggle();

        if (response.errCode === 0) {
            if (response.data) {
                this.setState({
                    signed: response.data
                });
                Swal.fire({
                    title: 'File chữ ký đã tạo thành công',
                    text: "Tải xuống file",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có, tải xuống máy của tôi'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Đã xong!',
                            'File của bạn đã được tải xuống thành công.',
                            'success'
                        );
                        let signObj = {
                            signed: this.state.signed,
                        }

                        let signString = JSON.stringify(signObj);
                        this.handleDownloadFile(signString);
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, try againt!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }

            emitter.emit('SET_PARENT_MODAL_CLOSE', {
                'id': 'your id',
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'OTP không trùng khớp, hãy thử lại!',
                footer: '<a href="">Why do I have this issue?</a>'
            })

            emitter.emit('SET_PARENT_MODAL_CLOSE', {
                'id': 'your id',
            });
        }
    }

    handleDownloadFile = (data) => {
        let element = document.createElement("a");
        const file = new Blob([data], {
            type: "text/plain;charset=utf-8",
        });

        element.href = URL.createObjectURL(file);
        element.download = "sign.txt";
        document.body.appendChild(element);
        element.click();
    }

    render() {
        let { currentSecond } = this.props;
        return (
            <Fragment>
                <Modal isOpen={this.state.showQR} size='lg' centered={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Nhập OTP để hoàn tất quá trình</ModalHeader>
                    <ModalBody>
                        <div className="qr-code-container">
                            <div dangerouslySetInnerHTML={{ __html: this.state.urlQRCode }} />
                            <div className="qr-code-insert-otp">
                                <span className="qr-code-insert-otp__title">Scan mã QR này bằng ứng dụng <b>Google Authenticator hoặc Authy</b><br />
                                    để nhận mã OTP tạo mới chữ ký số. Hiệu lực trong: {currentSecond && <b className="otp-time-out">{currentSecond}</b>} giây</span>
                                <div className="form-group mt-2 otp-form-container">
                                    <input type="text" className="form-control otp-form-input" name="otp" placeholder="Nhập vào mã OTP hiển thị trên thiết bị di động"
                                        onChange={(event) => this.handleChangeOTPData(event)} />

                                    <button type="button" className="btn btn btn-success btn-otp-confirm" onClick={() => this.handleSubmitForm()}>
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Đóng lại</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalQR);
