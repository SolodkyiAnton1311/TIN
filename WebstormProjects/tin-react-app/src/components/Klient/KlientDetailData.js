import React from "react";
import {withTranslation} from "react-i18next";

function KlientDetailData(props)
{
    const {t} = props;
    const klients = props.klientData
    return(
        <React.Fragment>
            <p>{t('klient.fields.firstName')}:{klients.Imie}</p>
            <p>{t('klient.fields.lastName')}:{klients.Nazwisko}</p>
            <p>{t('klient.fields.Age')}:{klients.Wiek}</p>
            <p>{t('klient.fields.Sex')}:{klients.Plec}</p>
        </React.Fragment>
    )
}
export default withTranslation() (KlientDetailData)