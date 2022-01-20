import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helper/dateHelper";
import {isAdmin} from "../../helper/authHelper";
import {withTranslation} from "react-i18next";


function ZakupyListTableRow(props)
{    const {t} = props;
    const zakupy = props.zakupyData
    return(
        <tr>
            <td>{zakupy.imie + " " + zakupy.nazwisko}</td>
            <td>{zakupy.Adresa}</td>
            <td>{zakupy.data_ostatniego_wizutu_klienta?getFormattedDate(zakupy.data_ostatniego_wizutu_klienta) : ""}</td>
            <td>{zakupy.data_nastepnego_wizytu?getFormattedDate(zakupy.data_nastepnego_wizytu) : ""}</td>
            <td>{zakupy.straczona_summa}</td>
            {isAdmin() === 1 &&
            <td>
                <ul className="list-actions">
                    <li><Link to={'zakups/details/' + zakupy.id_sklep_klient}
                              className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={'zakups/edit/' + zakupy.id_sklep_klient}
                              className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={'zakups/delete/' + zakupy.id_sklep_klient}
                              className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
            }
        </tr>
    )
}
export default withTranslation() (ZakupyListTableRow)