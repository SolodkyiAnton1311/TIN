import React from "react";
import KlientListTableRow from "./KlientListTableRow"
function KlientListTable(props)
{
    const klient = props.klientList
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Wiek</th>
                <th>Plec</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {klient.map(kli =>
            <KlientListTableRow sklepData={kli} key={kli.id_klient}/>
            )}
            </tbody>
        </table>
    )

}
export default KlientListTable