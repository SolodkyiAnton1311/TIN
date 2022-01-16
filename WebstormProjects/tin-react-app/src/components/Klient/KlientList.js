import React from 'react'
import {Link} from "react-router-dom";
import {getKlientApiCall} from "../../apiCalls/klientApiCalls";
const klientList = getKlientApiCall();
function KlientList() {
    return (
        <main>

            <h2>
               Lista Klientów
            </h2>
            <table className="tabele-list">
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Wiek</th>
                        <th>Plec</th>
                        <th>Akcje</th>
                    </tr>
                <tbody>
                {klientList.map(klient=>(
                    <tr key={klient._id}>
                        <td>{klient.firstName}</td>
                        <td>{klient.lastName}</td>
                        <td>{klient.wiek}</td>
                        <td>{klient.plec}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={'klients/details/'+klient._id} className="list-actions-button-details">Szczególy</Link></li>
                                <li><Link to={'klients/edit/'+klient._id} className="list-actions-button-edit">Edit</Link></li>
                                <li><Link to={'klients/delete/'+klient._id} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link to="/klients/add" class="button-add">Dodaj nowego pracownika</Link>
            </p>
        </main>

    )
}

export default KlientList