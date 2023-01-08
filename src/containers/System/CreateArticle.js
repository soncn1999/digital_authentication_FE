import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Select from 'react-select';
import { toast } from 'react-toastify'
import './CreateArticle.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            thumbnailPreviewUrl: '',
            thumbnail: '',
            listCategory: [],
            currentDate: '',
            postDate: '',
            title: '',
            categorySelect: {},
            shortdesc: '',
            userId: '',
            author: '',
            contentHTML: '',
            contentMarkdown: '',
        }
    }

    componentDidMount() {
        this.props.getListCategoryRedux();
        let listCategoryRedux = this.props.listCategoryRedux;
        let userInfo = this.props.userInfoRedux;
        let listCategory = [];
        listCategoryRedux.map((item) => {
            let categoryObj = {};
            categoryObj.label = item.name;
            categoryObj.value = item.id;
            listCategory.push(categoryObj);
        });

        this.setState({
            listCategory: listCategory,
            userId: userInfo.email,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listCategoryRedux !== this.props.listCategoryRedux) {
            let listCategoryRedux = this.props.listCategoryRedux;
            let listCategory = [];
            listCategoryRedux.map((item) => {
                let categoryObj = {};
                categoryObj.label = item.name;
                categoryObj.value = item.id;
                listCategory.push(categoryObj);
            });

            this.setState({
                listCategory: listCategory,
            })
        }
    }

    handleChangeThumbnail = async (event) => {
        let data = event.target.files;
        let file = data[0];
        let thumbnailPreviewUrl = URL.createObjectURL(file);
        let getBase64Url = await this.handleConvertImgToBase64(file);
        this.setState({
            thumbnailPreviewUrl: thumbnailPreviewUrl,
            thumbnail: getBase64Url,
        });
    }

    handleConvertImgToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleConvertBase64ToBinary = (file) => {
        let urlBinary = '';
        urlBinary = new Buffer(file, 'base64').toString('binary');
        return urlBinary;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    }

    handleChangeCategory = (option) => {
        this.setState({
            categorySelect: option,
        });
    }

    handleChangeDate = (date) => {
        let getUnixTimestamp = new Date(date).getTime();
        this.setState({
            currentDate: date,
            postDate: getUnixTimestamp,
        });
    }

    onHandleDataChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmitForm = () => {
        this.props.createNewArticleRedux({
            title: this.state.title,
            thumbnail: this.state.thumbnail,
            shortdesc: this.state.shortdesc,
            categoryId: this.state.categorySelect.value,
            userId: '',
            statusId: 'S1',
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            author: this.state.author,
            postDate: this.state.postDate,
        });

        this.setState({
            thumbnailPreviewUrl: '',
            thumbnail: '',
            currentDate: '',
            postDate: '',
            title: '',
            categorySelect: {},
            shortdesc: '',
            userId: '',
            author: '',
            postDate: '',
            contentHTML: '',
            contentMarkdown: '',
        });
    }

    render() {
        let { thumbnailPreviewUrl, listCategory, categorySelect, contentMarkdown, author, title, shortdesc } = this.state;

        return (
            <div className="container">
                <h2>Create Article</h2>
                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="form-group mt-2">
                                <label>Title</label>
                                <input type="text" className="form-control" placeholder="Enter Title Article" name="title"
                                    onChange={(event) => this.onHandleDataChange(event)} value={title} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Short Description</label>
                                <input type="text" className="form-control" placeholder="Enter Short Description" name="shortdesc"
                                    onChange={(event) => this.onHandleDataChange(event)} value={shortdesc} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Thumbnail</label>
                                <input type="file" id="imgThumbnail" accept="image/*" hidden onChange={(event) => this.handleChangeThumbnail(event)} />
                                <div className="preview-thumbnail-box mt-2"
                                    style={{
                                        backgroundImage: `url(${thumbnailPreviewUrl})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: "200px",
                                        height: "200px",
                                        border: "1px solid #ccc"
                                    }}
                                ></div>
                                <label htmlFor="imgThumbnail" className="preview-thumbnail-btn mt-2">Upload Thumbnail</label>
                            </div>
                            <div className="form-group mt-2">
                                <label>Category</label>
                                <Select options={listCategory} onChange={this.handleChangeCategory} value={categorySelect} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Author</label>
                                <input type="text" className="form-control" placeholder="Enter Author Name" name="author"
                                    onChange={(event) => this.onHandleDataChange(event)} value={author} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Post Schedule Date</label>
                                <DatePicker minDate={new Date()} selected={this.state.currentDate} onChange={this.handleChangeDate} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Content</label>
                                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={contentMarkdown} />
                            </div>
                            <a className="btn btn-primary mt-4" onClick={() => this.handleSubmitForm()}>Submit</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listCategoryRedux: state.app.listCategory,
        userInfoRedux: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListCategoryRedux: () => dispatch(actions.getAllCategory()),
        createNewArticleRedux: (data) => dispatch(actions.createNewArticle(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
