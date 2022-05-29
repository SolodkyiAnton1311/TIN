import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helper/authHelper";

class Navigation extends React.Component{npm
    handleLanguageChange = (language) => {
        const {i18n} = this.props
        i18n.changeLanguage(language,(err,t) => {
            if(err) return console.log("some went wrong",err)
        });

    }
    render() {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>logout</button> : <Link to="/login">Login</Link>
        const regestrationLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button>  : <Link to="/registration">{t('nav.registration')}</Link>
        const clientLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button> : <Link to="/klients">{t('nav.employees')}</Link>
        const pracownikLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button> : <Link to="/pracowniki">{t('nav.pracowniki')}</Link>
        const sklepLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button> : <Link to="/skleps">{t('nav.departments')}</Link>
        const zakupyLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button> : <Link to="/zakups">{t('nav.employments')}</Link>
        const pracaLink = !isAuthenticated() ? <button onClick={this.props.handleLogout}>{null}</button> : <Link to="/praca">{t('nav.praca')}</Link>
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li>{clientLink}</li>
                    <li>{sklepLink}</li>
                    <li>{zakupyLink}</li>
                    <li>{pracownikLink}</li>
                    <li>{pracaLink}</li>
                    <li>{regestrationLink}</li>
                    <li>{loginLogoutLink}</li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('pl')}}>PL</button></li>
                    <li className="lang"><button onClick={()=> {this.handleLanguageChange('en')}}>EN</button></li>
                </ul>
            </nav>
        )}

    }
export default withTranslation()(Navigation);