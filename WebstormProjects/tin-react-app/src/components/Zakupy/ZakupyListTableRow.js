import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helper/dateHelper";
import {isAuthenticated} from "../../helper/authHelper";


function ZakupyListTableRow(props)
{
    const zakupy = props.zakupyData
    return(
        <tr>
            <td>{zakupy.imie + " " + zakupy.nazwisko}</td>
            <td>{zakupy.Adresa}</td>
            <td>{zakupy.data_ostatniego_wizutu_klienta?getFormattedDate(zakupy.data_ostatniego_wizutu_klienta) : ""}</td>
            <td>{zakupy.data_nastepnego_wizytu?getFormattedDate(zakupy.data_nastepnego_wizytu) : ""}</td>
            <td>{zakupy.straczona_summa}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={'zakups/details/' + zakupy.id_sklep_klient}
                              className="list-actions-button-details">Szczególy</Link></li>
                    <li><Link to={'zakups/edit/' + zakupy.id_sklep_klient}
                              className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={'zakups/delete/' + zakupy.id_sklep_klient}
                              className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
            }
        </tr>
    )
}
export default ZakupyListTableRow