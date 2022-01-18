import React from "react";

function KlientDetailData(props)
{
    const klients = props.klientData
    return(
        <React.Fragment>
            <p>Imie:{klients.Imie}</p>
            <p>Nazwisko:{klients.Nazwisko}</p>
            <p>Wiek:{klients.Wiek}</p>
            <p>Plec:{klients.Plec}</p>
        </React.Fragment>
    )
}
export default KlientDetailData