import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify';
import './CategoryManage.scss';

class CategoryManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            listParentCategory: [],
            selectParentCategory: {
                label: '=== Parent Category ===',
                value: 0
            },
            editId: '',
            name: '',
            statusId: 'S1',
            isEdit: false,
        }
    }

    componentDidMount() {
        this.props.getListCategoryRedux();
        let listCategory = this.props.listCategoryRedux;
        let listParentCategory = [];
        if (listCategory && listCategory.length > 0) {
            let listParentCategoryObj = {};
            listCategory.map((item, index) => {
                if (item.parentId === 0) {
                    listParentCategoryObj.label = item.name;
                    listParentCategoryObj.value = item.id;
                }
                listParentCategory.push(listParentCategoryObj);
                return listParentCategory;
            });
        }

        this.setState({
            listCategory: listCategory,
            listParentCategory: listParentCategory,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listCategoryRedux !== this.props.listCategoryRedux) {
            let listCategory = this.props.listCategoryRedux;
            let listParentCategory = [
                {
                    label: '=== Parent Category ===',
                    value: 0
                }
            ];
            if (listCategory && listCategory.length > 0) {
                listCategory.map((item, index) => {
                    let listParentCategoryObj = {};
                    if (item.parentId === 0) {
                        listParentCategoryObj.label = item.name;
                        listParentCategoryObj.value = item.id;
                    }
                    listParentCategory.push(listParentCategoryObj);
                });
            }

            this.setState({
                listCategory: listCategory,
                listParentCategory: listParentCategory,
            });
        }
    }

    handleChangeCategoryForm = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    handleChangeCategory = (option) => {
        this.setState({
            selectParentCategory: option,
        });
    }

    onHandleSubmitForm = () => {
        this.props.createNewCaregoryRedux({
            name: this.state.name,
            parentId: this.state.selectParentCategory.value,
            statusId: this.state.statusId,
        });

        this.setState({
            selectParentCategory: {
                label: '=== Parent Category ===',
                value: 0
            },
            name: '',
        });
    }

    handleEditCategory = (categoryEdit) => {
        let listParentCategoryCopy = this.state.listParentCategory;
        let parentCategoryEdit = listParentCategoryCopy.find((item) => {
            return item.value === categoryEdit.parentId;
        });
        this.setState({
            isEdit: true,
            editId: categoryEdit.id,
            name: categoryEdit.name,
            selectParentCategory: parentCategoryEdit,
        });
    }

    onHandleUpdateData = () => {
        if (this.state.isEdit) {
            this.props.handleEditCategoryRedux({
                id: this.state.editId,
                name: this.state.name,
                selectParentCategory: this.state.selectParentCategory,
            });
        } else {
            toast.error(`🐦 You are insert data mode!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        this.setState({
            isEdit: false,
            editId: '',
            name: '',
            selectParentCategory: {
                label: '=== Parent Category ===',
                value: 0
            },
        });
    }

    onHandleDeleteData = () => {
        if (this.state.isEdit) {
            this.props.handleDeleteCategoryRedux(this.state.editId);
        } else {
            toast.error(`🐦 You are insert data mode!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        this.setState({
            isEdit: false,
            editId: '',
            name: '',
            selectParentCategory: {
                label: '=== Parent Category ===',
                value: 0
            },
        });
    }

    render() {
        let { listParentCategory, listCategory, isEdit } = this.state;
        return (
            <div className="container mt-4" >
                <div className="row">
                    <div className="col-6">
                        <h2 className="mt-4">Manage Category</h2>
                        <form>
                            <div className="form-group mt-2">
                                <label>Category name</label>
                                <input type="text" className="form-control mt-2" placeholder="Enter name" name="name"
                                    onChange={(event) => this.handleChangeCategoryForm(event)} value={this.state.name} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Category parent's</label>
                                <Select options={listParentCategory} onChange={this.handleChangeCategory} className="mt-2"
                                    value={this.state.selectParentCategory} />
                            </div>
                            {
                                !isEdit ? <a className="btn btn-primary mt-4" onClick={() => this.onHandleSubmitForm()}>Submit</a> :
                                    (<div className="form-group edit-delete-container">
                                        <a className="btn btn-warning mt-4" onClick={() => this.onHandleUpdateData()}>Update</a>
                                        &nbsp;
                                        <a className="btn btn-danger mt-4" onClick={() => this.onHandleDeleteData()}>Delete</a>
                                    </div>)
                            }
                        </form>
                    </div>
                    <div className="col-6">
                        <h2 className="mt-4">Preview Menu Category</h2>
                        <div className="navbar-container">
                            <ul className="navbar-list">
                                {
                                    listCategory && listCategory.length > 0 && listCategory.map((item, index) => {
                                        return <li className="navbar-item" key={index} >
                                            <span onClick={() => this.handleEditCategory(item)}>{item.name}</span>
                                            {
                                                item.subMenu && item.subMenu.length > 0 && <ul className="subnav-list">
                                                    {
                                                        item.subMenu.map((itemSubmenu, index) => {
                                                            return <li className="subnav-item" key={index} >
                                                                <span onClick={() => this.handleEditCategory(itemSubmenu)}>{itemSubmenu.name}</span>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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
        getListCategoryRedux: () => dispatch(actions.getAllCategory()),
        createNewCaregoryRedux: (data) => dispatch(actions.createNewCategory(data)),
        handleEditCategoryRedux: (data) => dispatch(actions.editCategory(data)),
        handleDeleteCategoryRedux: (id) => dispatch(actions.deleteCategory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
