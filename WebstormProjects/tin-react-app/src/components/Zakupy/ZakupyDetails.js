import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getZakupyByIdApiCall } from '../../apiCalls/zakupyApiCalls'

function ZakupyDetails() {
    let { zakupyId: zakupyId } = useParams()
    zakupyId = parseInt(zakupyId)
    const zakupy = getZakupyByIdApiCall(zakupyId)

    return (
        <main>
            <h2>Szczegóły Zakupów</h2>
            <p>Imię klienta: {zakupy.Klient.firstName + " " + zakupy.Klient.lastName}</p>
            <p>Adres sklepa: {zakupy.Sklep.adres}</p>
            <p>Data wizytu: {zakupy.dateFrom}</p>
            <p>Data nastepnego wizytu: {zakupy.dateTo}</p>
            <p>Straczona summa: {zakupy.straczona}</p>
            <table className="table-list">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/zakups" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default ZakupyDetails