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
        const regestrationLink = isAuthenticated() ? <button onClick={this.props.handleLogout}> </button> : <Link to="/registration">{t('nav.registration')}</Link>
        const clientLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}> </button> : <Link to="/klients">{t('nav.employees')}</Link>
        const sklepLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}> </button> : <Link to="/skleps">{t('nav.departments')}</Link>
        const zakupyLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}> </button> : <Link to="/zakups">{t('nav.employments')}</Link>
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li className="lang">{clientLink}</li>
                    <li className="lang">{sklepLink}</li>
                    <li className="lang">{zakupyLink}</li>
                    <li className="lang">{regestrationLink}</li>
                    <li className="lang">{loginLogoutLink}</li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('pl')}}>PL</button></li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('en')}}>EN</button></li>
                </ul>
            </nav>
        )}

    }
export default withTranslation()(Navigation);