import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { LANGUAGES } from '../../utils/constant';
import './Header.scss';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: '',
            email: '',
        }
    }

    componentDidMount() {
        this.setState({
            language: this.props.languageRedux,
            email: this.props.userLoginRedux.email,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            this.setState({
                language: this.props.languageRedux
            });
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changelanguageRedux(language);
    }

    render() {
        const { processLogout } = this.props;
        const { language, email } = this.state;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="header-right-container">
                    {
                        email && language == LANGUAGES.VI && <span className="mr-3">Xin chào, {email}</span>
                    }
                    {
                        email && language == LANGUAGES.EN && <span className="mr-3">Welcome, {email}</span>
                    }
                    <div className="header-language-container">
                        {
                            language == LANGUAGES.VI &&
                            <span >Ngôn ngữ: VI </span>
                        }
                        {
                            language == LANGUAGES.EN &&
                            <span >Language: EN </span>
                        }
                        <ul className="language-container__list">
                            <li className="language-container__item" onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>{LANGUAGES.VI}</li>
                            <li className="language-container__item" onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>{LANGUAGES.EN}</li>
                        </ul>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLogIn: state.user.isLogIn,
        userLoginRedux: state.user.userInfo,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changelanguageRedux: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
