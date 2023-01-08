import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './AdminPage.scss';
import * as actions from "../../store/actions";
import { emitter } from '../../utils/emiter';
import Swal from 'sweetalert2';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: '',
            publicKey: '',
            certificate: '',
            fileInfo: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on('EVENT_DOWNLOAD_USER_INFO', (data) => {
            Swal.fire({
                title: 'File thông tin đã tạo thành công',
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
                    this.handleDownloadFile({
                        privateKey: this.state.privateKey,
                        publicKey: this.state.publicKey,
                        certificate: this.state.certificate,
                    });

                    this.handleDownloadFileCRT({
                        publicKey: this.state.publicKey,
                        certificate: this.state.certificate,
                    });
                }
            });
        })
    }

    componentDidMount() {
        let { currentUserInfo } = this.props;

        if (currentUserInfo) {
            this.setState({
                privateKey: currentUserInfo.privateKey,
                publicKey: currentUserInfo.publicKey,
                certificate: currentUserInfo.certificate,
                fileInfo: currentUserInfo.fileInfo,
            });
        }
    }

    componentDidUpdate = (prevProps) => {

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
            this.setState({
                fileInfo: file.name,
            });
        }

        fileReader.onload = (progressEvent) => {
            console.log("onload!");
            var stringData = fileReader.result;
            console.log(" ---------------- File Content ----------------: ");

            try {
                let objData = JSON.parse(stringData);
                this.setState({
                    privateKey: objData.privateKey,
                    publicKey: objData.publicKey,
                    certificate: objData.certificate,
                });

                this.props.importDataRedux({
                    privateKey: objData.privateKey,
                    publicKey: objData.publicKey,
                    certificate: objData.certificate,
                    fileInfo: file.name,
                });
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Nội dung file không hợp lệ, hãy thử lại với file khác!',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
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

        let dataStringify = JSON.stringify(data);
        const file = new Blob([dataStringify], {
            type: "text/plain;charset=utf-8",
        });

        element.href = URL.createObjectURL(file);
        element.download = `P12.txt`;
        document.body.appendChild(element);
        element.click();
    }

    handleDownloadFileCRT = (data) => {
        let element = document.createElement("a");

        let dataStringify = JSON.stringify(data);
        const file = new Blob([dataStringify], {
            type: "text/plain;charset=utf-8",
        });

        element.href = URL.createObjectURL(file);
        element.download = "ctr.txt";
        document.body.appendChild(element);
        element.click();
    }

    render() {
        return (
            <Fragment>

                <div className="drop-file-container">
                    <div className="drop-file-wrap">
                        <label className="drop-file-title">Tải lên file chứa khóa bí mật!</label>

                        <div className="drop-file-icon">
                            <i className="fas fa-file"></i>
                        </div>

                        <label htmlFor='drop-item' className="drop-item-btn">Tải lên</label>
                        <input type="file" hidden id="drop-item" onChange={(event) => this.changeHandler(event)} />

                        {
                            this.state.fileInfo !== '' ? <div className="file-info">
                                <span>File Name: {this.state.fileInfo ? this.state.fileInfo : `Đã insert dữ liệu!`}</span>
                            </div> : <div className="file-info">
                                <span>Chưa có file nào được tải lên!</span>
                            </div>
                        }
                    </div>
                </div>

                {/* <div>
                    <input id="input" />
                    <button type="button" onClick={() => this.handleDownloadFile()}>DownLoad</button>
                </div> */}
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userLoginRedux: state.user.userInfo,
        currentUserInfo: state.user.currentUserInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        importDataRedux: (data) => dispatch(actions.importDataSuccess(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
