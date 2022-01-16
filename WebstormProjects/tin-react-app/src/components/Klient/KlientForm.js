import React from "react";
import {Link} from "react-router-dom";

class KlientForm extends React.Component {
    render() {
        return (
            <main>
                <h2>Nowy Klient</h2>
                <form className="form">
                    <label htmlFor="imie">Imię: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="text" name="imie" id="imie" className="errors-text" placeholder="2-10 znaków" value=""/>
                    <span id="errorFirstName" className="errors-text"></span>
                    <span id="errorFirstName" className="errors-text"></span>

                    <label htmlFor="nazwisko">Nazwisko: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="number" name="nazwisko" id="nazwisko" className="errors-text" placeholder="2-20 znaków" value=""/>
                    <span id="errorLastName" className="errors-text"></span>
                    <span id="errorLastName" className="errors-text"></span>


                    <label htmlFor="wiek">Wiek: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="number" name="wiek" id="wiek" className="errors-text" placeholder="2-20 znaków" value=""/>
                    <span id="errorAge" className="errors-text"></span>
                    <span id="errorAge" className="errors-text"></span>

                    <label htmlFor="plec">Plec: <abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <input type="number" name="capacity" id="capacity" className="errors-text" placeholder="" value=""/>
                    <span id="errorAge" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj"/>
                        <Link to="/klients" className="form-button-cancel" >Zwrót</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default KlientForm