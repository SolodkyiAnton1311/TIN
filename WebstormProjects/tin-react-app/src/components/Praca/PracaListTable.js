import React from "react";

import {withTranslation} from "react-i18next";
import PracaListTableRow from "./PracaListTableRow";
function PracaListTable(props)
{
    const {t} = props;
    const praca = props.pracaList;
    console.log("praca",praca)
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>{t('zakupy.fields.firstName')} {t('zakupy.fields.lastName')}</th>
                <th>{t('zakupy.fields.adres')}</th>
                <th>{t('praca.fields.dataZatrudnienia')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {praca.map(pra =>
                <PracaListTableRow pracaData={pra} key={pra.id}/>
            )}
            </tbody>
        </table>
    )

}
export default withTranslation() (PracaListTable)