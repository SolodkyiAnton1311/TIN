import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getKlientByIdApiCall } from '../../apiCalls/klientApiCalls'

function KlientDetails() {
    let { klientId: klientId } = useParams()
    klientId = parseInt(klientId)
    const klient = getKlientByIdApiCall(klientId)

    return (
        <main>
            <h2>Szczegóły pracownika</h2>
            <p>Imię: {klient.firstName}</p>
            <p>Nazwisko: {klient.lastName} </p>
            <p>Wiek: {klient.wiek} </p>
            <p>Plec: {klient.plec} </p>
            <table className="table-list">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/klients" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default KlientDetails