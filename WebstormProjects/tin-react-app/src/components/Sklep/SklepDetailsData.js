import React from "react";
import {getFormattedDate} from "../../helper/dateHelper";

function SklepDetailData(props)
{
    const skleps = props.sklepData
    return(
        <React.Fragment>
            <p>Adres:{skleps.adres}</p>
            <p>Data Otwarcia:{skleps.date?getFormattedDate(skleps.date) : "" }</p>
        </React.Fragment>
    )
}
export default SklepDetailData