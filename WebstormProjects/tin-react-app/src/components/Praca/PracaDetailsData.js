import React from "react";
import {getFormattedDate} from "../../helper/dateHelper";
import {withTranslation} from "react-i18next";

function PracaDetailData(props)
{
    const {t} = props;
    const praca = props.pracaData
    return(
        <React.Fragment>
            <p>{t('praca.fields.firstName')} & {t('praca.fields.lastName')}: {praca.imie + " " + praca.nazwisko}</p>
            <p>{t('praca.fields.adres')}: {praca.adres}</p>
            <p>{t('praca.fields.dataZatrudnienia')}: {praca.data_zatrudnienia?getFormattedDate(praca.data_zatrudnienia) : "" }</p>
        </React.Fragment>
    )
}
export default withTranslation() (PracaDetailData)