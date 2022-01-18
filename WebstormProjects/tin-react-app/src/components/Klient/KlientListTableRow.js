import React from "react";
import {Link} from "react-router-dom";

function KlientListTableRow(props) {
    const klients = props.sklepData
    return (
        <tr>
            <td>{klients.Imie}</td>
            <td>{klients.Nazwisko}</td>
            <td>{klients.Wiek}</td>
            <td>{klients.Plec}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={'klients/details/' + klients.id_klient} className="list-actions-button-details">Szczególy</Link></li>
                    <li><Link to={'/klients/edit/' + klients.id_klient} className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={'klients/delete/' + klients.id_klient} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}
export default KlientListTableRow