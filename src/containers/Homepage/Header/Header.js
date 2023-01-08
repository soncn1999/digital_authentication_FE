import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './Header.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalCategory from './ModalCategory';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            isOpenModal: false,
        }
    }

    componentDidMount() {
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

    handleToggleModal = (toggleParam) => {
        this.setState({
            isOpenModal: toggleParam,
        });
    }

    render() {
        let { listCategory, isOpenModal } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <div className="header-homepage-container">
                        <div className="header-homepage-top">
                            <a className="header-homepage-top__logo" href="#!">
                                CNS Blog
                                &nbsp;
                                <span>
                                    <i className="fas fa-glasses"></i>
                                </span>
                            </a>
                        </div>
                        <div className="header-homepage-bottom">
                            <ul className="header-homepage-menu__list">
                                <li className="header-homepage-menu__item">
                                    <a className="header-homepage-menu__text" href="#">
                                        <i className="fas fa-home"></i>
                                    </a>
                                </li>
                                {
                                    listCategory && listCategory.length > 0 && listCategory.map((item, index) => {
                                        return (
                                            <li className="header-homepage-menu__item" key={index}>
                                                <a className="header-homepage-menu__text" href="#">
                                                    {
                                                        item && item.name && <span>{item.name}</span>
                                                    }
                                                </a>
                                                {
                                                    item && item.subMenu.length > 0 && <ul className="header-homepage-menu__submenu-list">
                                                        {
                                                            item.subMenu.map((itemSubmenu, index) => {
                                                                return (
                                                                    <li className="header-homepage-menu__submenu-item" key={index}>
                                                                        <a href="#">
                                                                            {itemSubmenu && itemSubmenu.name && <span>{itemSubmenu.name}</span>}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                }
                                            </li>
                                        )
                                    })
                                }

                                <li className="header-homepage-menu__item">
                                    <a className="header-homepage-menu__text" href="#" onClick={() => this.handleToggleModal(true)}>
                                        <span className="all-category">Tất cả</span>
                                        <i className="fas fa-bars"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ModalCategory isOpenModal={isOpenModal} handleToggleModal={this.handleToggleModal} />
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
