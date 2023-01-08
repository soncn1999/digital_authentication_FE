import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emiter';
import * as actions from "../../store/actions";
import './ModalUser.scss';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: '',
                email: '',
                password: '',
                image: '',
                roleId: null,
                positionId: null,
                previewAvatarUrl: '',
            },
            roles: [],
            positions: [],
            previewImgUrl: '',
        }
        this.listenToEmitter(); //mounting a function
    }

    componentDidMount() {
        this.props.getPositionsRedux('POSITION');
        this.props.getRolesRedux('ROLE');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            this.setState({
                positions: this.props.positionsRedux,
                userData: {
                    ...this.state.userData,
                    positionId: this.props.positionsRedux[0].keyMap
                }
            })
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            this.setState({
                roles: this.props.rolesRedux,
                userData: {
                    ...this.state.userData,
                    roleId: this.props.rolesRedux[0].keyMap
                }
            })
        }
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', (data) => {
            console.log('Emitter data: ', data);

            this.setState({
                userData: {
                    name: '',
                    email: '',
                    password: '',
                    roleId: this.state.roles[0],
                    positionId: this.state.positions[0],
                },
                previewImgUrl: '',
            });

            this.toggle();
        })
    }

    toggle = () => {
        this.props.handleToggle();
    }

    onHandleDataForm = (event) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value
            }
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'email', 'password', 'roleId', 'positionId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.userData[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    onHandleSubmitForm = () => {
        let { userData } = this.state;
        this.props.createNewUserRedux({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            roleId: userData.roleId,
            positionId: userData.positionId,
            image: userData.image
        });
        this.props.handleAddNewUser();
    }

    onHandleChangeAvatar = async (event) => {
        let data = event.target.files;
        let file = data[0];
        let previewImgUrl = URL.createObjectURL(file);
        let imageUrl = await this.getBase64FromPicture(file);
        this.setState({
            previewImgUrl: previewImgUrl,
            userData: {
                ...this.state.userData,
                image: imageUrl,
            }
        });
    }

    getBase64FromPicture = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject('Error: ', error);
        });
    }

    convertFromBase64toBinary = (file) => {
        let imgConvertURL = '';
        imgConvertURL = new Buffer(file, 'binary').toString('base64');
        return imgConvertURL;
    }

    render() {
        let { roles, positions, userData } = this.state;
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={"Del biet"} size={this.props.size} centered>
                <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                <ModalBody>
                    <form className="mt-2">
                        <div className="form-group mt-2 upload-avatar">
                            <div className="col-4 upload-avatar-container">
                                <label htmlFor="exampleInputEmail1" className="upload-avatar_title">Avatar</label>
                                <input type="file" className="form-control" accept="image/*" id="previewImg" hidden
                                    onChange={(event) => this.onHandleChangeAvatar(event)} />
                                <div className="upload-avatar_preview"
                                    style={{
                                        backgroundImage: `url(${this.state.previewImgUrl})`,
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
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" onChange={(event) => this.onHandleDataForm(event)} value={userData.email} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                name="password" onChange={(event) => this.onHandleDataForm(event)} value={userData.password} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="name" placeholder="Enter name" onChange={(event) => this.onHandleDataForm(event)} value={userData.name} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Role</label>
                            <select className="form-control" name="roleId" onChange={(event) => this.onHandleDataForm(event)} value={userData.roleId}>
                                {
                                    roles && roles.length > 0 && roles.map((item, index) => {
                                        return <option value={item.keyMap}
                                            key={index}>
                                            {item.valueVi}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Position</label>
                            <select className="form-control" name="positionId" onChange={(event) => this.onHandleDataForm(event)} value={userData.positionId}>
                                {
                                    positions && positions.length > 0 && positions.map((item, index) => {
                                        return <option value={item.keyMap}
                                            key={index}>
                                            {item.valueVi}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.onHandleSubmitForm() }}>Save</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
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
        createNewUserRedux: (user) => dispatch(actions.createNewUserCRUD(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);






