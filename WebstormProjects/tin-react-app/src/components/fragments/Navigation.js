import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Navigation() {
    const {t} = useTranslation();
    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/skleps">{t('nav.departments')}</Link></li>
                <li><Link to="/klients">{t('nav.employees')}</Link></li>
                <li><Link to="/zakups">{t('nav.employments')}</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;