import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './Homepage.scss';
import './Bootstrap.scss';
import Header from './Header/Header';
import Section from './Section/Section';
import Footer from './Footer/Footer';
import { handleCreateNewUser } from '../../services/digitalAuthentication';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }


    render() {
        return (
            <Fragment>
                <Header />
                <Section />
                <Footer />
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoryRedux: () => dispatch(actions.getAllCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
