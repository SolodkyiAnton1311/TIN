import React from "react";
import {getFormattedDate} from "../../helper/dateHelper";
import {withTranslation} from "react-i18next";

function SklepDetailData(props)
{
    const {t} = props;
    const skleps = props.sklepData
    return(
        <React.Fragment>
            <p>{t('shop.fields.adres')}:{skleps.adres}</p>
            <p>{t('shop.fields.data')}:{skleps.date?getFormattedDate(skleps.date) : "" }</p>
        </React.Fragment>
    )
}
export default  withTranslation() (SklepDetailData)