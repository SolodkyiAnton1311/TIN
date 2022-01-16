import React from 'react'
import {Link} from "react-router-dom";
import {getSklepApiCalls} from "../../apiCalls/sklepApiCalls";
const sklepList = getSklepApiCalls();
function SklepList() {
    return (
        <main>

            <h2>
                Lista Klientów
            </h2>
            <table className="tabele-list">
                <tr>
                    <th>Adres</th>
                    <th>Data Otwarcia</th>
                    <th>Akcje</th>
                </tr>
                <tbody>
                {sklepList.map(sklep=>(
                    <tr key={sklep._id}>
                        <td>{sklep.adres}</td>
                        <td>{sklep.DataOtwarcia}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={'skleps/details/'+sklep._id} className="list-actions-button-details">Szczególy</Link></li>
                                <li><Link to={'skleps/edit/'+sklep._id} className="list-actions-button-edit">Edit</Link></li>
                                <li><Link to={'skleps/delete/'+sklep._id} className="list-actions-button-delete">Usuń</Link></li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p className="section-buttons">
                <Link to="/skleps/add" class="button-add">Dodaj nowy sklep</Link>
            </p>
        </main>

    )
}

export default SklepList