import React from "react";
import {Link} from "react-router-dom";

class SklepForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowy Sklep</h2>
                <form className="form">
                    <label htmlFor="imie">Adres: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="text" name="adres" id="adres" className="errors-text" placeholder="2-10 znaków" value=""/>
                    <span id="errorFirstName" className="errors-text"></span>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="dataotwarcia">Data otwarcia: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="number" name="nazwisko" id="nazwisko" className="errors-text" placeholder="2-20 znaków" value=""/>
                    <span id="errorLastName" className="errors-text"></span>
                    <span id="errorLastName" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj"/>
                        <Link to="/skleps" className="form-button-cancel" >Zwrót</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default SklepForm