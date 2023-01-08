import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import * as actions from "../../store/actions";
import { toast } from 'react-toastify';
import './ModalUser.scss';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                id: '',
                name: '',
                email: '',
                password: '',
                image: '',
                roleId: null,
                positionId: null,
            },
            roles: [],
            positions: [],
            previewImg: '',
        }
    }

    componentDidMount() {
        this.props.getPositionsRedux('POSITION');
        this.props.getRolesRedux('ROLE');
        let user = this.props.userEdit;
        if (user && !_.isEmpty(user)) {
            this.setState({
                userData: user,
                previewImg: user.image,
                positions: this.props.positionsRedux,
                roles: this.props.rolesRedux,
            });
        }
    }

    toggleEdit = () => {
        this.props.handleToggleEditModal();
    }

    onHandleDataForm = (event) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value
            }
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'roleId', 'positionId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.userData[arrInput[i]]) {
                isValid = false;
                toast.error(`🐦 Missing parameter ${arrInput[i]}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            }
        }
        return isValid;
    }

    onHandleSubmitForm = async () => {
        if (this.checkValidateInput()) {
            console.log('submit user edit: ', this.state.userData);
            this.props.handleEditUserRedux(this.state.userData);
            this.toggleEdit();
        }
    }

    onHandleConvertImageToBase64 = (file) => {
        return new Promise(async (resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject('Error: ', error);
        });
    }

    onHandleChangeAvatar = async (event) => {
        let data = event.target.files;
        let file = data[0];
        let previewAvatarUrl = URL.createObjectURL(file);
        let imageUrl = await this.onHandleConvertImageToBase64(file);
        console.log('Image URL base64:', imageUrl);
        this.setState({
            previewImg: previewAvatarUrl,
            userData: {
                ...this.state.userData,
                image: imageUrl,
            }
        });
    }

    render() {
        let { positions, roles } = this.state;

        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggleEdit() }} className={"Del biet"} size={this.props.size} centered>
                <ModalHeader toggle={() => { this.toggleEdit() }}>Edit user's infomation</ModalHeader>
                <ModalBody>
                    <form className="mt-2">
                        <div className="form-group mt-2 upload-avatar">
                            <div className="col-4 upload-avatar-container">
                                <label htmlFor="exampleInputEmail1" className="upload-avatar_title">Avatar</label>
                                <input type="file" className="form-control" accept="image/*" id="previewImg" hidden
                                    onChange={(event) => this.onHandleChangeAvatar(event)} />
                                <div className="upload-avatar_preview"
                                    style={{
                                        backgroundImage: `url(${this.state.previewImg})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        border: '1px solid #ccc',
                                    }}
                                ></div>
                                <label htmlFor="previewImg" className="upload-avatar_btn">Upload Avatar</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.email}
                                disabled />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                name="password" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.password}
                                disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="name" placeholder="Enter name" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.name} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Role</label>
                            <select className="form-control" name="roleId" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.roleId}>
                                {
                                    roles && roles.length > 0 && roles.map((item, index) => {
                                        return (<option value={item.keyMap} key={index}>{item.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Position</label>
                            <select className="form-control" name="positionId" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.positionId}>
                                {
                                    positions && positions.length > 0 && positions.map((item, index) => {
                                        return (<option value={item.keyMap} key={index}>{item.valueVi}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.onHandleSubmitForm() }}>Update</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggleEdit() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        positionsRedux: state.user.positions,
        rolesRedux: state.user.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPositionsRedux: (type) => dispatch(actions.getAllCode(type)),
        getRolesRedux: (type) => dispatch(actions.getAllCode(type)),
        handleEditUserRedux: (user) => dispatch(actions.EditUserCRUD(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

