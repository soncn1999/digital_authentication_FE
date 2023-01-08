import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { handleCreateOTP } from '../../../services/digitalAuthentication';
import "./fixUI.scss";
import Swal from 'sweetalert2';
import ModalConfirmPassword from './ModalConfirmPassword';
import { emitter } from '../../../utils/emiter';

class GenerateSignature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            privateKey: '',
            cipherText: '',
            token: '',
            signed: '',
            qrCodeUrl: '',
            showQR: false,
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on('SET_PARENT_MODAL_CLOSE', (data) => {
            this.setState({
                showQR: false,
            })
        })
    }

    componentDidMount() {
        let { currentUserInfo } = this.props;
        if (currentUserInfo) {
            this.setState({
                privateKey: currentUserInfo.privateKey,
            });
        }
        let userInfo = this.props.userLoginRedux;
        this.setState({
            token: userInfo.token
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentUserInfo !== prevProps.currentUserInfo) {
            let { currentUserInfo } = this.props;
            if (currentUserInfo) {
                this.setState({
                    privateKey: currentUserInfo.privateKey,
                });
            }
        }
    }

    onHandleDataForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm = async () => {
        let response = await handleCreateOTP({
            token: this.state.token,
        });

        if (response.errCode === 0) {
            this.setState({
                qrCodeUrl: response.QRCodeImageUrl,
                showQR: true,
            });
        } else {
            toast.error('🐸 Lỗi từ Server, xin lỗi vì sự cố này!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    changeHandler = (evt) => {
        // FileList object.
        var files = evt.target.files;

        var file = files[0];

        var fileReader = new FileReader();

        fileReader.onloadstart = (progressEvent) => {
            // this.resetLog();
            console.log("onloadstart!");
            var msg = "File Name: " + file.name + "<br>" + "File Size: " + file.size + "<br>" + "File Type: " + file.type;
            // console.log(msg);
        }

        fileReader.onload = (progressEvent) => {
            console.log("onload!");
            var stringData = fileReader.result;
            console.log(" ---------------- File Content ----------------: ");
            this.setState({
                message: stringData,
            });
        }

        fileReader.onloadend = (progressEvent) => {
            console.log("onloadend!");
            // FileReader.EMPTY, FileReader.LOADING, FileReader.DONE
            // console.log("readyState = " + fileReader.readyState);
        }

        fileReader.onerror = (progressEvent) => {
            console.log("onerror!");
            console.log("Has Error!");
        }

        // Read file asynchronously.
        fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
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
        return (
            <div className="container">
                <div className="login-page">
                    <div className="form">
                        <form className="login-form">
                            <div className="slider-container">
                                <div className="slider-container__title">Tạo chữ ký số</div>
                                <i className="fas fa-user-edit slider-container__icon--justify"></i>
                            </div>

                            <div className="input-group mb-4">
                                <label>Tải lên tập tin cần ký</label>
                                <input type="file" id="drop-item" placeholder="Chọn tập tin đã ký" onChange={(event) => this.changeHandler(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>Khóa bí mật</label>
                                <textarea className="form-control text-area-input" placeholder="Private Key" name="privateKey" value={this.state.privateKey} onChange={(event) => this.onHandleDataForm(event)} />
                            </div>

                            <button type="button" className="btn btn-primary mb-4" onClick={() => this.onSubmitForm()}>Ký số</button>
                        </form>

                        {
                            this.state.showQR && (
                                <ModalConfirmPassword urlQRCode={this.state.qrCodeUrl} userData={{
                                    message: this.state.message,
                                    privateKey: this.state.privateKey,
                                    token: this.state.token,
                                }} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userLoginRedux: state.user.userInfo,
        currentUserInfo: state.user.currentUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateSignature);
