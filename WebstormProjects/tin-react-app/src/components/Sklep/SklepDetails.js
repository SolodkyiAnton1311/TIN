import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSklepByIdApiCall } from '../../apiCalls/sklepApiCalls'

function SklepDetails() {
    let { sklepId: sklepId } = useParams()
    sklepId = parseInt(sklepId)
    const sklep = getSklepByIdApiCall(sklepId)

    return (
        <main>
            <h2>Szczegóły pracownika</h2>
            <p>Imię: {sklep.adres}</p>
            <p>Nazwisko: {sklep.DataOtwarcia} </p>
            <table className="table-list">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div className="section-buttons">
                <Link to="/skleps" className="button-back">Powrót</Link>
            </div>
        </main>
    )
}
export default SklepDetails