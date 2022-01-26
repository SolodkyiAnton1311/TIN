import React from "react";
import {getFormattedDate} from "../../helper/dateHelper";
import {withTranslation} from "react-i18next";

function ZakupyDetailData(props)
{
    const zakupy = props.zakupyData
    return(
        <React.Fragment>
            <p>{zakupy.imie + " " + zakupy.nazwisko}</p>
            <p>{zakupy.adres}</p>
            <p>{zakupy.DataVizytu?getFormattedDate(zakupy.DataVizytu) : "" }</p>
            <p>{zakupy.DataNastepnego?getFormattedDate(zakupy.DataNastepnego) : ""}</p>
            <p>{zakupy.straczona_summa}</p>
        </React.Fragment>
    )
}
export default withTranslation() (ZakupyDetailData)