import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import "./fixUI.scss";
import { handleVerifySignature } from "../../../services/digitalAuthentication";
import Swal from 'sweetalert2';

class VerifySignature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signature: '',
            certificate: '',
            publicKey: '',
            username: '',
            message: '',
        }
    }

    componentDidMount() {
        console.log('current user info: ', this.props.currentUserInfo);
        let { currentUserInfo } = this.props;
        let { userLoginRedux } = this.props;
        if (currentUserInfo) {
            this.setState({
                certificate: currentUserInfo.certificate,
                publicKey: currentUserInfo.publicKey,
            });
        }
        if (userLoginRedux) {
            this.setState({
                username: userLoginRedux.email,
            })
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
            console.log(stringData);
            let objData = JSON.parse(stringData);
            // console.log(objData);
            this.setState({
                signature: objData.signed
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
            console.log(stringData);
            let objData = JSON.parse(stringData);
            // console.log(objData);
            this.setState({
                signature: objData.signed
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

    changeHandlerReadMessage = (evt) => {
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
            console.log(stringData);
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

    handleSubmitForm = async () => {
        let response = await handleVerifySignature({
            certificate: this.state.certificate,
            username: this.state.username,
            publicKey: this.state.publicKey,
            signature: this.state.signature,
            message: this.state.message,
        });
        if (response.errCode === 0 && response.data == true) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ch??? k?? ???????c x??c th???c th??nh c??ng!',
                showConfirmButton: false,
                timer: 1500
            })

        } else if (response.errCode === 0 && response.data == false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ch??? k?? kh??ng h???p l???!',
                footer: '<b>H??y ki???m tra l???i th??ng tin nh???p v??o</b>'
            })
        } else {
            toast.error('???? L???i t??? Server, xin l???i v?? s??? c??? n??y!', {
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

    handleChangeDataForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <div className="container" >
                <div className="login-page">
                    <div className="form">
                        <form className="login-form">

                            <div className="slider-container">
                                <div className="slider-container__title">Ki???m tra ch??? k?? s???</div>
                                <i className="fas fa-user-check slider-container__icon--justify"></i>
                            </div>

                            <div className="input-group mb-4">
                                <label>Ch???ng th?? s???</label>
                                <textarea type="text" className="form-control text-area-input" placeholder="Ch???n ch???ng ch??? s???"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.certificate}
                                    onChange={(event) => this.handleChangeDataForm(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>Ch??? k?? s???</label>
                                <input type="file" id="drop-item" placeholder="Ch???n t???p tin ???? k??" onChange={(event) => this.changeHandler(event)} />
                            </div>

                            <div className="input-group mb-4">
                                <label>T???p tin ki???m tra</label>
                                <input type="file" id="drop-item" placeholder="Ch???n t???p tin ???? k??" onChange={(event) => this.changeHandlerReadMessage(event)} />
                            </div>

                            <button type="button" className="btn btn-primary mb-4" onClick={() => this.handleSubmitForm()}>X??c th???c</button>
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
        userLoginRedux: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifySignature);
