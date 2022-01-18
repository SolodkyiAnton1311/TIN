import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helper/dateHelper";

function SklepListTableRow(props) {
    const skleps = props.sklepData
    return (
        <tr>
            <td>{skleps.Adresa}</td>
            <td>{skleps.Data_otwarcia?getFormattedDate(skleps.Data_otwarcia) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={'skleps/details/' + skleps.id_sklep} className="list-actions-button-details">Szczególy</Link></li>
                    <li><Link to={'skleps/edit/' + skleps.id_sklep} className="list-actions-button-edit">Edit</Link></li>
                    <li><Link to={'skleps/delete/' + skleps.id_sklep} className="list-actions-button-delete">Usuń</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}
export default SklepListTableRow