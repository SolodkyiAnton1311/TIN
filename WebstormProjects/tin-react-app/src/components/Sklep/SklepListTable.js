import React from "react";
import SklepListTableRow from "./SklepListTableRow"
function SklepListTable(props)
{
    const sklep = props.sklepList
    return(
        <table className="tabele-list">
            <thead>
            <tr>
                <th>Adres sklepu</th>
                <th>Data otwarcia</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {sklep.map(skl =>
                <SklepListTableRow sklepData={skl} key={skl.id_sklep}/>
            )}
            </tbody>
        </table>
    )

}
export default SklepListTable