import React from 'react'
import { Link } from 'react-router-dom'
import { getKlientApiCall } from '../../apiCalls/klientApiCalls'
import { getSklepApiCalls } from '../../apiCalls/sklepApiCalls'

class ZakupyForm extends React.Component {
    render() {
        const allKlient = getKlientApiCall()
        const allSklep = getSklepApiCalls()

        return (
            <main>
                <h2>Nowe Zakupy</h2>
                <form className="form">
                    <label htmlFor="employee">Klient: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="employee" name="empId" required>
                        <option value="">--- Wybierz klienta ---</option>
                        {allKlient.map(klient =>
                            (<option key={klient._id} value={klient._id} label={klient.firstName + " " + klient.lastName}></option>)
                        )}
                    </select>
                    <span id="errorEmployee" className="errors-text"></span>
                    <span id="errorEmployee" className="errors-text"></span>
                    <label htmlFor="department">Sklep: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="department" name="deptId" required>
                        <option value="">--- Wybierz Sklep ---</option>
                        {allSklep.map(sklep =>
                            (<option key={sklep._id} value={sklep._id} label={sklep.adres}></option>)
                        )}
                    </select>
                    <span id="errorDepartment" className="errors-text"></span>
                    <span id="errorDepartment" className="errors-text"></span>
                    <label htmlFor="salary">Straczona Summa</label>
                    <input type="number" name="salary" value="" id="salary" placeholder="2000 - 1000000" />
                    <span id="errorSalary" className="errors-text"></span>
                    <span id="errorSalary" className="errors-text"></span>
                    <label htmlFor="dateFrom">Data wizytu</label>
                    <input type="date" name="dateFrom" value="" id="dateFrom" />
                    <span id="errorDateFrom" className="errors-text"></span>
                    <span id="errorDateFrom" className="errors-text"></span>
                    <label htmlFor="dateTo">Data nastepnego wizytu</label>
                    <input type="date" name="dateTo" value="" id="dateTo" />
                    <span id="errorDateTo" className="errors-text"></span>
                    <span id="errorDateTo" className="errors-text"></span>
                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj" />
                        <Link to="/zakups" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default ZakupyForm