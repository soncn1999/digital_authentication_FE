import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalCategory.scss';
import CustomScrollbars from '../../../components/CustomScrollbars';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
        }
    }

    componentDidMount() {
        this.props.getAllCategoryRedux();
        let listCategory = this.props.listCategoryRedux;
        this.setState({
            listCategory: listCategory,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listCategoryRedux !== this.props.listCategoryRedux) {
            let listCategory = this.props.listCategoryRedux;
            this.setState({
                listCategory: listCategory,
            });
        }
    }

    handleCloseModal = () => {
        this.props.handleToggleModal(false);
    }

    render() {
        let { listCategory } = this.state;
        let { isOpenModal } = this.props;

        return (
            <Fragment>
                <Modal isOpen={isOpenModal} centered size="lg" toggle={this.toggle}>
                    <ModalHeader>
                        <span>Danh sách chủ đề</span>
                    </ModalHeader>
                    <ModalBody>
                        <CustomScrollbars style={{ height: '80vh', width: '100%' }}>
                            <div className="modal-category__list">
                                {
                                    listCategory && listCategory.length > 0 && listCategory.map((item, index) => {
                                        return (
                                            <div className="modal-category__item" key={index}>
                                                <div className="modal-category__title modal-category--hover">
                                                    {
                                                        item && item.name && <span>{item.name}</span>
                                                    }
                                                </div>
                                                {
                                                    item.subMenu && item.subMenu.length > 0 && (
                                                        <ul className="modal-category__sublist">
                                                            {
                                                                item.subMenu.map((itemSubmenu, index) => {
                                                                    return (
                                                                        <li className="modal-category__sublist-item modal-category--hover" key={index}>
                                                                            {
                                                                                itemSubmenu.name && <span>{itemSubmenu.name}</span>
                                                                            }
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    )
                                                }
                                                <div className="modal-category__show-more modal-category--hover">Xem thêm</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CustomScrollbars>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleCloseModal}>Đóng</Button>{' '}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        listCategoryRedux: state.app.listCategory,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoryRedux: () => dispatch(actions.getAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
