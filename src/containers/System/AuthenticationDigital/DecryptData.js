import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import "./fixUI.scss";
import { handleDecryptData } from "../../../services/digitalAuthentication";
import Swal from 'sweetalert2';

class DecryptData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cipherText: '',
            privateKey: '',
        }
    }

    componentDidMount() {
        let { currentUserInfo } = this.props;
        if (currentUserInfo) {
            this.setState({
                privateKey: currentUserInfo.privateKey
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {

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
                cipherText: stringData,
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

    onHandleDataForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmitForm = async () => {
        console.log('check state: ', this.state);
        let response = await handleDecryptData({
            privateKey: this.state.privateKey,
            cipherText: this.state.cipherText,
        });

        if (response.errCode === 0) {
            Swal.fire({
                title: 'File gi???i m?? ???? t???o th??nh c??ng',
                text: "T???i xu???ng file",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'C??, t???i xu???ng m??y c???a t??i'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        '???? xong!',
                        'File c???a b???n ???? ???????c t???i xu???ng th??nh c??ng.',
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
        element.download = "decryptData.txt";
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
                                <div className="slider-container__title ">Gi???i m?? d??? li???u</div>
                                <i className="fas fa-cog slider-container__icon--justify"></i>
                            </div>

                            <div className="input-group mb-4">
                                <label>Ch???n t???p c???n gi???i m??</label>
                                <input type="file" id="drop-item" placeholder="Ch???n t???p tin c???n gi???i m??" onChange={(event) => this.changeHandler(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>Kh??a b?? m???t</label>
                                <textarea className="form-control text-area-input" placeholder="Private Key" name="privateKey" value={this.state.privateKey} onChange={(event) => this.onHandleDataForm(event)} />
                            </div>

                            <button type="button" className="btn btn-primary mb-4" onClick={() => this.handleSubmitForm()}>Gi???i m??</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentUserInfo: state.user.currentUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecryptData);
