import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helper/authHelper";

function KlientListTableRow(props) {
    const klients = props.sklepData
    const {t} = props;
    return (
        <tr>
            <td>{klients.Imie}</td>
            <td>{klients.Nazwisko}</td>
            <td>{klients.Wiek}</td>
            <td>{klients.Plec}</td>
            <td>
                {isAuthenticated() &&
                <ul className="list-actions">
                    <li><Link to={'klients/details/' + klients.id_klient} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={'/klients/edit/' + klients.id_klient} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={'klients/delete/' + klients.id_klient} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
                }
            </td>
        </tr>
    )
}
export default withTranslation()  (KlientListTableRow)