import React from "react";

import {withTranslation} from "react-i18next";
import PracowniktListTableRow from "./PracownikiListRow";
function PracownikiListTable(props)
{
    const pracownik = props.pracownikiList
    const {t} = props;
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>{t('klient.fields.firstName')}</th>
                <th>{t('klient.fields.lastName')}</th>
                <th>{t('pracownik.fields.salaryPerHours')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {pracownik.map(pra =>
                <PracowniktListTableRow pracownikData={pra} key={pra.id_pracownik}/>
            )}
            </tbody>
        </table>
    )

}
export default withTranslation() (PracownikiListTable)