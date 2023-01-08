import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { handleEncryptData } from '../../../services/digitalAuthentication';
import "./fixUI.scss";
import Swal from 'sweetalert2';

class EncryptData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            publicKey: '',
            certificate: '',
            plainText: '',
        }
    }

    componentDidMount() {
        let { userLoginRedux, currentUserInfo } = this.props;

        if (userLoginRedux) {
            this.setState({
                username: userLoginRedux.email,
            });
        }

        if (currentUserInfo) {
            this.setState({
                publicKey: currentUserInfo.publicKey,
                certificate: currentUserInfo.certificate,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    onHandleDataForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                plainText: stringData,
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

    handleSubmitForm = async () => {
        let response = await handleEncryptData({
            certificate: this.state.certificate,
            username: this.state.username,
            plainText: this.state.plainText,
            publicKey: this.state.publicKey,
        });
        if (response.errCode === 0) {
            Swal.fire({
                title: 'File mã hóa đã tạo thành công',
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
                    this.handleDownloadFile(response.data);
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mising from Server, try again !',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    handleDownloadFile = (data) => {
        let element = document.createElement("a");

        const file = new Blob([data], {
            type: "text/plain;charset=utf-8",
        });

        element.href = URL.createObjectURL(file);
        element.download = "encryptData.txt";
        document.body.appendChild(element);
        element.click();
    }

    render() {
        return (
            <div className="container" >
                <div className="login-page">
                    <div className="form">
                        <form className="login-form">
                            <div className="slider-container">
                                <div className="slider-container__title">Mã hóa dữ liệu</div>
                                <i className="fas fa-cogs slider-container__icon--justify"></i>
                            </div>
                            <div className="input-group mb-4">
                                <label>Chứng thư số</label>
                                <textarea className="form-control text-area-input" placeholder="Certificate" name="certificate" value={this.state.certificate} onChange={(event) => this.onHandleDataForm(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>Khóa công khai mã hóa</label>
                                <textarea className="form-control text-area-input" placeholder="Public Key" name="publicKey" value={this.state.publicKey} onChange={(event) => this.onHandleDataForm(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>Tập tin cần mã hóa</label>
                                <input type="file" id="drop-item" placeholder="Chọn tập tin cần mã hóa" onChange={(event) => this.changeHandler(event)} />
                            </div>

                            <button type="button" className="btn btn-primary mb-4" onClick={() => this.handleSubmitForm()}>Mã hóa</button>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EncryptData);
