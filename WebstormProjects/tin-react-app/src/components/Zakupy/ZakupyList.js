import React from 'react'
import {Link} from "react-router-dom";
import {getZakupyApiCall} from "../../apiCalls/zakupyApiCalls";
import {getFormattedDate} from "../../helper/dateHelper";
const zakupy = getZakupyApiCall();
function ZakupyList() {
    return (
        <main>
            <h2>
                Lista Zakupów
            </h2>
            <table className="tabele-list">
                <tr>
                    <th>Imie klienta</th>
                    <th>Adres Sklepa</th>
                    <th>Data Ostatniego wizytu</th>
                    <th>Data Następnego wizytu</th>
                    <th>Straczona summa</th>
                    <th>Akcje</th>
                </tr>
                <tbody>
                {zakupy.map(zakupy=>(
                    <tr key={zakupy._id}>
                        <td>{zakupy.Klient.firstName + " " + zakupy.Klient.lastName}</td>
                        <td>{zakupy.Sklep.adres}</td>
                        <td>{zakupy.dateFrom? getFormattedDate(zakupy.dateTo) : ""}</td>
                        <td>{zakupy.dateTo? getFormattedDate(zakupy.dateTo) : ""}</td>
                        <td>{zakupy.straczona}</td>

                        <td>
                            <ul className="list-actions">
                                <li><Link to={'zakups/details/'+zakupy._id} className="list-actions-button-details">Szczególy</Link></li>
                                <li><Link to={'zakups/edit/'+zakupy._id} className="list-actions-button-edit">Edit</Link></li>
                                <li><Link to={'zakups/delete/'+zakupy._id} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link to="/zakups/add" class="button-add">Dodaj nowe zakupy</Link>
            </p>
        </main>

    )
}

export default ZakupyList