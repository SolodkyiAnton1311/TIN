import React from "react";
import {withTranslation} from "react-i18next";

function PracownikDetailData(props)
{
    const {t} = props;

    const pracownik = props.pracownikData
    return(
        <React.Fragment>
            <p>{t('klient.fields.firstName')}:{pracownik[0].imie}</p>
            <p>{t('klient.fields.lastName')}:{pracownik[0].nazwisko}</p>
            <p>{t('pracownik.fields.salaryPerHours')}:{pracownik[0].stawka} zl</p>
        </React.Fragment>
    )
}
export default withTranslation() (PracownikDetailData)