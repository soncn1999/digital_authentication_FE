import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import * as actions from "../../store/actions";
import { getAllUsers, updateUser } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emiter';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {},
            isOpen: false,
            previewImgLightbox: '',
        };
    }

    componentDidMount() {
        this.props.getListUserRedux('ALL');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUserRedux !== this.props.listUserRedux) {
            let listUserCopy = this.props.listUserRedux;

            listUserCopy.map((item) => {
                if (item.image) {
                    let imageUrl = this.handleConvertBase64ToBinary(item.image);
                    item.image = imageUrl;
                }
            });

            this.setState({
                arrUsers: listUserCopy,
            });
        }
    }

    handleAddNewUser = () => {
        try {
            emitter.emit('EVENT_CLEAR_MODAL_DATA', {
                'id': 'your id',
            });
        } catch (error) {
            console.error(error);
        }
    }

    handleToggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    }

    handleToggleEditModal = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        });
    }

    handleEditUser = (user) => {
        this.handleToggleEditModal();
        this.setState({
            userEdit: { ...user }
        });
    }

    handleUpdateUser = async (user) => {
        try {
            let response = await updateUser(user);
            console.log(response.message);
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        console.log(user);
        this.props.deleteUserRedux(user.id);
    }

    handleConvertBase64ToBinary = (file) => {
        let avatarUrl = '';
        avatarUrl = new Buffer(file, 'base64').toString('binary');
        return avatarUrl;
    }

    handleOpenLightbox = (previewImgUrl) => {
        if (previewImgUrl) {
            this.setState({
                isOpen: !this.state.isOpen,
                previewImgLightbox: previewImgUrl,
            })
        }
    }

    render() {
        let { arrUsers, isOpen, previewImgLightbox } = this.state;

        return (
            <Fragment>
                <div className="container">

                    <ModalUser
                        isOpen={this.state.isOpenModal}
                        handleToggle={this.handleToggle}
                        handleAddNewUser={this.handleAddNewUser}
                        size="lg"
                    />
                    {
                        this.state.isOpenModalEdit && <ModalEditUser
                            isOpen={this.state.isOpenModalEdit}
                            handleToggleEditModal={this.handleToggleEditModal}
                            userEdit={this.state.userEdit}
                            handleUpdateUser={this.handleUpdateUser}
                            size="lg"
                        />
                    }

                    <h3 className="container-title mt-4">List Users</h3>
                    <button className="btn btn-primary px-3 mt-2" onClick={() => this.handleToggle()}>Add New User</button>
                    <table id="customers" className="mt-4 mr-5 ml-5">
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 && arrUsers.map((user, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div style={{
                                        backgroundImage: `url(${user.image})`,
                                        backgroundPosition: `center`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        border: '1px solid #ccc',
                                    }}
                                        onClick={() => this.handleOpenLightbox(user.image)}
                                    ></div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.positionData && user.positionData.valueVi
                                    }
                                </td>
                                <td>
                                    {
                                        user.roleData && user.roleData.valueVi
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-primary button-space" onClick={() => this.handleEditUser(user)}>Edit</button>
                                    <button className="btn btn-danger button-space" onClick={() => this.handleDeleteUser(user)}>Delete</button>
                                </td>
                            </tr>)
                        })}
                    </table>
                    {isOpen && <Lightbox
                        mainSrc={previewImgLightbox}
                        onCloseRequest={() => this.setState({ isOpen: false, previewImgLightbox: '' })}
                    />}

                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUserRedux: state.user.listUser,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListUserRedux: (id) => dispatch(actions.getUserRedux(id)),
        deleteUserRedux: (id) => dispatch(actions.deleteUserCRUD(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
