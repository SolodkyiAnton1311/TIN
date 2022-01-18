import React from "react";
import ZakupyListTableRow from "./ZakupyListTableRow"
function ZakupyListTable(props)
{
    const zakupy = props.zakupyList
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>Imie klienta</th>
                <th>Adres Sklepu</th>
                <th>Data ostatniego wizytu</th>
                <th>Data nastepnego wizytu</th>
                <th>Straczona suma</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {zakupy.map(zak =>
                <ZakupyListTableRow zakupyData={zak} key={zak.id_sklep_klient}/>
            )}
            </tbody>
        </table>
    )

}
export default ZakupyListTable