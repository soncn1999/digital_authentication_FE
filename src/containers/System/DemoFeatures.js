import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DemoFeatures.scss';
import * as actions from "../../store/actions";
import { createADemoFeatureData } from '../../services/userService';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

const mdParser = new MarkdownIt(/* Markdown-it options */);


class DemoFeatures extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImg: '',
            avatar: '',
            name: '',
            dob: '',
            gender: {},
            descHTML: '',
            descMarkdown: '',
            email: '',
            password: '',
            arrUser: [],
            isOpen: false,
        }
    }

    componentDidMount() {
        this.props.getAllDemoFeaturesRedux();
        let listUser = this.props.listDemoFeaturesRedux;
        console.log('list user 1: ', listUser);
        console.log('moment: ', moment());
        if (listUser && listUser.length > 0) {
            listUser.map((item) => {
                let convertImage = this.handleConvertBase64ToBinary(item.avatar);
                item.previewImg = convertImage;
                let dob = moment(+item.dob).locale('vi').format('dd - DD/MM/YYYY');
                item.dob = dob;
            });

            this.setState({
                arrUser: listUser,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listDemoFeaturesRedux !== this.props.listDemoFeaturesRedux) {
            let listUser = this.props.listDemoFeaturesRedux;
            console.log('list user 2: ', listUser);
            if (listUser && listUser.length > 0) {
                listUser.map((item) => {
                    let convertImage = this.handleConvertBase64ToBinary(item.avatar);
                    item.previewImg = convertImage;
                    console.log('dob: ', item.dob);
                    let dob = moment(+item.dob).locale('vi').format('dd - DD/MM/YYYY');
                    item.dob = dob;
                });

                this.setState({
                    arrUser: listUser,
                });
            }
        }
    }

    handleImageChange = async (event) => {
        let data = event.target.files;
        let file = data[0];
        const objectUrl = URL.createObjectURL(file);
        const letBase64 = await this.handleConvertImageToBase64(file);
        this.setState({
            previewImg: objectUrl,
            avatar: letBase64,
        });
    }

    handleConvertImageToBase64 = (file) => {
        return new Promise(async (resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    handleConvertBase64ToBinary = (base64Data) => {
        let imageBase64 = '';
        imageBase64 = new Buffer(base64Data, 'base64').toString('binary');
        return imageBase64;
    }

    handleOnchangeData = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitForm = async () => {
        let response = await createADemoFeatureData({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dob: new Date(this.state.dob).getTime(),
            gender: this.state.gender.value,
            descHTML: this.state.descHTML,
            descMarkdown: this.state.descMarkdown,
            avatar: this.state.avatar,
        });
        if (response && response.errCode === 0) {
            toast.success('🐶 Create demo features success!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.getAllDemoFeaturesRedux();
            this.setState({
                previewImg: '',
                avatar: '',
                name: '',
                dob: '',
                gender: {},
                descHTML: '',
                descMarkdown: '',
                email: '',
                password: '',
            })
        } else {
            toast.error(`🐦 Create demo features Failed! ${response.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                previewImg: '',
                avatar: '',
                name: '',
                dob: '',
                gender: {},
                descHTML: '',
                descMarkdown: '',
                email: '',
                password: '',
            })
        }
    }

    onCloseRequest = () => {
        this.setState({
            isOpen: false,
            previewImg: '',
        })
    }

    handleShowPreviewPhoto = (item) => {
        this.setState({
            isOpen: true,
            previewImg: item.previewImg,
        });
    }

    handleSelectOption = (option) => {
        this.setState({
            gender: {
                label: option.label,
                value: option.value,
            },
        });
    }

    handleEditorMarkdownChange = ({ html, text }) => {
        this.setState({
            descHTML: html,
            descMarkdown: text
        });
    }

    handleDateData = (date) => {
        this.setState({
            dob: date,
        })
    }

    render() {
        let { arrUser, isOpen } = this.state;

        const optionGenders = [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
            { value: 'O', label: 'Other' }
        ];

        console.log('check state: ', this.state);

        return (
            <div className="demo-container">
                <div className="demo-form">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="avt-container">
                                    <div className="preview-image"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImg})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            borderRadius: '50%',
                                            height: '200px',
                                            width: '200px',
                                            margin: 'auto',
                                        }}
                                    ></div>
                                    <input type="file" name="file"
                                        id="previewImg" hidden accept="image/*"
                                        onChange={(event) => this.handleImageChange(event)}
                                    />
                                    <label htmlFor='previewImg' className="avt-upload__btn mt-5">Upload Avatar</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <form>
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email"
                                            onChange={(event) => this.handleOnchangeData(event)} value={this.state.email} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" placeholder="Password" name="password"
                                            onChange={(event) => this.handleOnchangeData(event)} value={this.state.password} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputEmail1">Name</label>
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter Yourname" name="name"
                                            onChange={(event) => this.handleOnchangeData(event)} value={this.state.name} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="exampleInputEmail1">Gender</label>
                                        <Select options={optionGenders}
                                            onChange={(option) => this.handleSelectOption(option)}
                                            value={this.state.gender}
                                        />
                                    </div>
                                    <div className="form-group mt-2 handle-picker-date">
                                        <label htmlFor="exampleInputEmail1">Date of birth</label>
                                        <DatePicker value={this.state.dob}
                                            minDate={new Date()}
                                            selected={this.state.dob}
                                            onChange={this.handleDateData} />
                                    </div>
                                </form>
                            </div>
                            <div className="col-12">
                                <div className="form-group mt-2">
                                    <label htmlFor="exampleInputEmail1">Description + Certificate</label>
                                    <MdEditor style={{ height: '500px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorMarkdownChange}
                                        value={this.state.descMarkdown}
                                    />
                                </div>
                            </div>
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary mt-4" onClick={() => this.handleSubmitForm()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="demo-show">
                    <div className="container">
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">avatar</th>
                                    <th scope="col">name</th>
                                    <th scope="col">email</th>
                                    <th scope="col">gender</th>
                                    <th scope="col">date of birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrUser && arrUser.length > 0 && arrUser.map((item, index) => {
                                        return (<tr key={index} className="arr-item">
                                            <th scope="row">{index}</th>
                                            <td>{
                                                item.previewImg && <div style={{
                                                    backgroundImage: `url(${item.previewImg})`,
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    width: '150px',
                                                    height: '150px',
                                                    borderRadius: '50%',
                                                }}
                                                    onClick={() => this.handleShowPreviewPhoto(item)}
                                                ></div>}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.dob}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    isOpen && <Lightbox
                        mainSrc={this.state.previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listDemoFeaturesRedux: state.user.listDemoFeatures,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDemoFeaturesRedux: () => dispatch(actions.getAllDemoFeatures()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoFeatures);
