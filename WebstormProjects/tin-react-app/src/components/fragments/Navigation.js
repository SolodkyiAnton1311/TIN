import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helper/authHelper";

class Navigation extends React.Component{
    handleLanguageChange = (language) => {
        const {i18n} = this.props
        i18n.changeLanguage(language,(err,t) => {
            if(err) return console.log("some went wrong",err)
        });

    }
    render() {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>logout</button> : <Link to="/login">Login</Link>
        const regestrationLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>logout</button> : <Link to="/registration">{t('nav.registration')}</Link>
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/skleps">{t('nav.departments')}</Link></li>
                    <li><Link to="/klients">{t('nav.employees')}</Link></li>
                    <li><Link to="/zakups">{t('nav.employments')}</Link></li>
                    <li className="lang">{regestrationLink}</li>
                    <li className="lang">{loginLogoutLink}</li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('pl')}}>PL</button></li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('en')}}>EN</button></li>
                </ul>
            </nav>
        )}

    }
export default withTranslation()(Navigation);