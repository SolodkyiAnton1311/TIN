import React from "react";
import SklepListTableRow from "./SklepListTableRow"
import {withTranslation} from "react-i18next";
function SklepListTable(props)
{
    const {t} = props;
    const sklep = props.sklepList
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>{t('shop.fields.adres')}</th>
                <th>{t('shop.fields.data')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {sklep.map(skl =>
                <SklepListTableRow sklepData={skl} key={skl.id_sklep}/>
            )}
            </tbody>
        </table>
    )

}
export default withTranslation() (SklepListTable)