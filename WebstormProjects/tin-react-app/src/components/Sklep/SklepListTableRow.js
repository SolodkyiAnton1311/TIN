import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helper/dateHelper";
import {withTranslation} from "react-i18next";

function SklepListTableRow(props) {
    const skleps = props.sklepData
    const {t} = props;
    return (
        <tr>
            <td>{skleps.Adresa}</td>
            <td>{skleps.Data_otwarcia?getFormattedDate(skleps.Data_otwarcia) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={'skleps/details/' + skleps.id_sklep} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={'skleps/edit/' + skleps.id_sklep} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={'skleps/delete/' + skleps.id_sklep} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}
export default withTranslation() (SklepListTableRow)