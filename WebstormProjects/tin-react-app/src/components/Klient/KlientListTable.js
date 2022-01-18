import React from "react";
import KlientListTableRow from "./KlientListTableRow"
import {withTranslation} from "react-i18next";
function KlientListTable(props)
{
    const klient = props.klientList
    const {t} = props;
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>{t('klient.fields.firstName')}</th>
                <th>{t('klient.fields.lastName')}</th>
                <th>{t('klient.fields.Age')}</th>
                <th>{t('klient.fields.Sex')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {klient.map(kli =>
            <KlientListTableRow sklepData={kli} key={kli.id_klient}/>
            )}
            </tbody>
        </table>
    )

}
export default withTranslation() (KlientListTable)