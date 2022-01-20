import React from "react";
import ZakupyListTableRow from "./ZakupyListTableRow"
import {withTranslation} from "react-i18next";
function ZakupyListTable(props)
{
    const {t} = props;
    const zakupy = props.zakupyList
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>{t('zakupy.fields.firstName')} {t('zakupy.fields.lastName')}</th>
                <th>{t('zakupy.fields.adres')}</th>
                <th>{t('zakupy.fields.dataLast')}</th>
                <th>{t('zakupy.fields.dateNext')}</th>
                <th>{t('zakupy.fields.straczonasumma')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {zakupy.map(zak =>
                <ZakupyListTableRow zakupyData={zak} key={zak.id_sklep_klient}/>
            )}
            </tbody>
        </table>
    )

}
export default withTranslation() (ZakupyListTable)