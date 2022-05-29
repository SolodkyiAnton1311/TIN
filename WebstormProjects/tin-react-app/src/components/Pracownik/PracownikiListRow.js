import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAdmin, isAuthenticated} from "../../helper/authHelper";

function PracowniktListTableRow(props) {
    const pracowniki = props.pracownikData
    const {t} = props;
    return (
        <tr>
            <td>{pracowniki.imie}</td>
            <td>{pracowniki.nazwisko}</td>
            <td>{pracowniki.stawka}</td>

            <td>
                {isAdmin() === 1 &&
                <ul className="list-actions">
                    <li><Link to={'pracowniki/details/' + pracowniki.id_pracownik} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={'/pracowniki/edit/' + pracowniki.id_pracownik} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={'pracowniki/delete/' + pracowniki.id_pracownik} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
                }
            </td>
        </tr>
    )
}
export default withTranslation()  (PracowniktListTableRow)