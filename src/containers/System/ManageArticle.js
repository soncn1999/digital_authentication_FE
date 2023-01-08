import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import moment from 'moment';
import EditArticle from './EditArticle';

class ManageArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listArticle: [],
            listStatusSelect: [],
            isEdit: false,
            articleEdit: {},
        }
    }

    componentDidMount() {
        this.props.getAllCodeRedux('STATUS');
        this.props.getListArticleRedux('ALL', 10);
        let listArticle = this.props.listArticleRedux;
        listArticle.map((item) => {
            item.thumbnail = this.handleConvertToBinary(item.thumbnail);
            item.postDate = moment(+item.postDate).format('DD/MM/YYYY');
            item.statusSelected = this.handleGetStatus(item.statusId);
        });

        let listStatus = this.props.listStatusRedux;
        let listStatusArr = [];
        listStatus.map((item) => {
            let statusObj = {};
            statusObj.label = item.valueEn;
            statusObj.value = item.keyMap;
            listStatusArr.push(statusObj);
        });

        this.setState({
            listArticle: listArticle,
            listStatusSelect: listStatusArr,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listStatusRedux !== this.props.listStatusRedux) {
            let listStatus = this.props.listStatusRedux;
            let listStatusArr = [];
            listStatus.map((item) => {
                let statusObj = {};
                statusObj.label = item.valueEn;
                statusObj.value = item.keyMap;
                listStatusArr.push(statusObj);
            });
            this.setState({
                listStatusSelect: listStatusArr,
            })
        }
        if (prevProps.listArticleRedux !== this.props.listArticleRedux) {
            let listArticle = this.props.listArticleRedux;
            listArticle.map((item) => {
                item.thumbnail = this.handleConvertToBinary(item.thumbnail);
                item.postDate = moment(+item.postDate).format('DD/MM/YYYY');
                item.statusSelected = this.handleGetStatus(item.statusId);
            });
            this.setState({
                listArticle: listArticle,
            });
        }
    }

    handleGetStatus = (status) => {
        let { listStatusSelect } = this.state;
        let statusObj = listStatusSelect.find((item) => {
            return item.value === status
        });
        return statusObj;
    }

    handleConvertToBinary = (file) => {
        let imgURL = '';
        imgURL = new Buffer(file, 'base64').toString('binary');
        return imgURL;
    }

    handleChangeStatusArticle = (event, itemInput) => {
        let listArticleCopy = this.state.listArticle;

        listArticleCopy.map(item => {
            if (item.id === itemInput.id) {
                item.statusId = event.target.value;
            }
        });

        this.setState({
            listArticle: listArticleCopy,
        });

        this.props.changeStatusArticleRedux({
            id: itemInput.id,
            statusId: event.target.value,
        });
    }

    handleDeleteArticle = (itemInput) => {
        this.props.deleteArticleRedux(itemInput.id);
    }

    handleEditArticle = (itemInput) => {
        this.setState({
            isEdit: true,
            articleEdit: itemInput,
        });
    }

    handleToggleEdit = () => {
        this.setState({
            isEdit: false,
        });
    }

    render() {
        let { listArticle, listStatusSelect, isEdit, articleEdit } = this.state;

        return (
            <div className="container">
                {
                    isEdit ? <EditArticle articleEdit={articleEdit} handleToggleEdit={this.handleToggleEdit} /> : (<div className="list-article">
                        <h2 className="mt-2">List Article</h2>
                        <table className="table mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Post Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listArticle && listArticle.length > 0 && listArticle.map((item, index) => {
                                        return (<tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.title}</td>
                                            <td>
                                                <div style={{
                                                    backgroundImage: `url(${item.thumbnail})`,
                                                    backgroundPosition: `center`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    width: '100px',
                                                    height: '100px',
                                                }}></div>
                                            </td>
                                            <td>{item.author}</td>
                                            <td>{item.postDate}</td>
                                            <td>{
                                                item.statusData && <div>
                                                    <select className="form-select" aria-label="Default select example" value={item.statusId} onChange={(event) => this.handleChangeStatusArticle(event, item)}>
                                                        {
                                                            listStatusSelect.map((item, index) => {
                                                                return <option value={item.value} key={index} >{item.label}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            }</td>
                                            <td>
                                                <button type="button" className="btn btn-warning" onClick={() => this.handleEditArticle(item)}>Edit</button>&nbsp;
                                                <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteArticle(item)}>Delete</button>
                                            </td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listArticleRedux: state.app.listArticle,
        listStatusRedux: state.user.status,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListArticleRedux: (id, limit) => dispatch(actions.getListArticle(id, limit)),
        getAllCodeRedux: (type) => dispatch(actions.getAllCode(type)),
        changeStatusArticleRedux: (data) => dispatch(actions.changeStatusArticle(data)),
        deleteArticleRedux: (data) => dispatch(actions.deleteArticle(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageArticle);
