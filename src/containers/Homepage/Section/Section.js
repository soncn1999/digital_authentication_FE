import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Section.scss";
import * as actions from "../../../store/actions";
import { handleGetListArticlePaginate } from "../../../services/articleService";
import ReactPaginate from 'react-paginate';
import moment from 'moment';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            listArticle: [],
            totalPage: 0,
            sliderArticle: [],
        }
    }

    async componentDidMount() {
        let listCategory = this.props.listCategoryRedux;
        this.setState({
            listCategory: listCategory,
        });

        let response = await handleGetListArticlePaginate(4, 0);
        if (response.errCode === 0) {
            let articleArr = response.data;
            articleArr.map((item) => {
                item.thumbnail = this.handleConvertBase64ToBinary(item.thumbnail);
                item.postDate = moment(+item.postDate).format('dddd - DD/MM/YYYY');
            });

            let sliderArticle = articleArr.slice(0, 2);
            let listArticle = articleArr.slice(2);
            this.setState({
                listArticle: listArticle,
                totalPage: Math.ceil(response.total / 4),
                sliderArticle: sliderArticle,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listCategoryRedux !== this.props.listCategoryRedux) {
            let listCategory = this.props.listCategoryRedux;
            this.setState({
                listCategory: listCategory,
            });
        }
    }

    handleConvertBase64ToBinary = (file) => {
        let binaryUrl = "";
        binaryUrl = new Buffer(file, 'base64').toString('binary');
        return binaryUrl;
    }

    handlePageClick = async (event) => {
        let response = await handleGetListArticlePaginate(4, event.selected);
        if (response.errCode === 0) {
            let articleArr = response.data;
            articleArr.map((item) => {
                item.thumbnail = this.handleConvertBase64ToBinary(item.thumbnail);
                item.postDate = moment(+item.postDate).format('dddd - DD/MM/YYYY');
            });

            let sliderArticle = articleArr.slice(0, 2);
            let listArticle = articleArr.slice(2);
            this.setState({
                listArticle: listArticle,
                totalPage: Math.ceil(response.total / 4),
                sliderArticle: sliderArticle,
            });
        }
    };

    render() {
        let { totalPage, sliderArticle, listArticle } = this.state;
        console.log('check articles: ', this.state);
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <Slider {...settings}>
                                {
                                    sliderArticle && sliderArticle.length > 0 && sliderArticle.map((item, index) => {
                                        return (
                                            <div key={index} style={{ display: 'flex' }}>
                                                <div style={{
                                                    backgroundImage: `url(${item.thumbnail})`,
                                                    backgroundPosition: "center",
                                                    backgroundSize: `cover`,
                                                    backgroundRepeat: `no-repeat`,
                                                    width: '345px',
                                                    height: '345px',
                                                    margin: 'auto',
                                                    borderRadius: '50%',
                                                    marginTop: '5px',
                                                    border: '2px solid #ccc',
                                                }}></div>
                                                <div className="card-body">
                                                    <div className="small text-muted">{item.postDate}</div>
                                                    <h2 className="card-title">{item.title}</h2>
                                                    <p className="card-text">{item.shortdesc}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>


                        <div className="col-lg-12">
                            <div className="row">
                                {
                                    listArticle && listArticle.length ? listArticle.map((item, index) => {
                                        return (
                                            <div className="col-lg-6">
                                                <div className="card mb-4 article-item" key={index}>
                                                    <div style={{
                                                        backgroundImage: `url(${item.thumbnail})`,
                                                        backgroundPosition: "center",
                                                        backgroundSize: `cover`,
                                                        backgroundRepeat: `no-repeat`,
                                                        width: '145px',
                                                        height: '145px',
                                                        margin: 'auto',
                                                        borderRadius: '50%',
                                                        marginTop: '5px',
                                                        border: '2px solid #ccc'
                                                    }}></div>
                                                    <div className="card-body">
                                                        <div className="small text-muted">{item.postDate}</div>
                                                        <h2 className="card-title h4">{item.title}</h2>
                                                        <p className="card-text">{item.shortdesc}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }) : (<h3>
                                        Bạn đã xem hết nội dung!
                                    </h3>)
                                }
                            </div>
                        </div>

                        <nav aria-label="Pagination">
                            <div className="pagination justify-content-center my-4">
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={this.handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPage}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </nav>
                    </div>

                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-header">Search</div>
                            <div className="card-body">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-header">Categories</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">Web Design</a></li>
                                            <li><a href="#!">HTML</a></li>
                                            <li><a href="#!">Freebies</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <ul className="list-unstyled mb-0">
                                            <li><a href="#!">JavaScript</a></li>
                                            <li><a href="#!">CSS</a></li>
                                            <li><a href="#!">Tutorials</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-header">Side Widget</div>
                            <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
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
        getAllCategoryRedux: () => dispatch(actions.getAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
