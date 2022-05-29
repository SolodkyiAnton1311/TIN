import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helper/dateHelper";
import {isAdmin} from "../../helper/authHelper";
import {withTranslation} from "react-i18next";


function ZakupyListTableRow(props)
{    const {t} = props;
    const praca = props.pracaData
    console.log(praca.id)

    return(
        <tr>
            <td>{praca.imie + " " + praca.nazwisko}</td>
            <td>{praca.Adresa}</td>
            <td>{praca.data_zatrudnienia?getFormattedDate(praca.data_zatrudnienia) : ""}</td>

            {isAdmin() === 1 &&
            <td>
                <ul className="list-actions">
                    <li><Link to={'praca/details/' + praca.id}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={'praca/edit/' + praca.id}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={'praca/delete/' + praca.id}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
            }
        </tr>
    )
}
export default withTranslation() (ZakupyListTableRow)