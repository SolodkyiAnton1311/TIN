import React from "react";
import FormInput from "../form/FormInput";
import {withTranslation} from "react-i18next";
import {getFormattedDate} from "../../helper/dateHelper";
import {Redirect} from "react-router-dom";
import {addZakupyApiCall, getZakupyByIdApiCall, updateZakupyApiCall} from "../../apiCalls/zakupyApiCalls";
import {checkRequired} from "../../helper/validationCommon";
import FormButtons from "../form/FormButtons";
import formMode from "../../helper/formHelpers";

class Zakupy extends React.Component {

    constructor(props) {
        super(props);
        const paramsZakupyId = props.match.params.zakupyId;
        const currentFormMode = paramsZakupyId ? formMode.EDIT : formMode.NEW;

        this.state = {
            paramsZakupyId: paramsZakupyId,

            zakupy: {
                id: "",
                DataVizytu: "",
                straczona_summa: "",
                DataNastepnego: "",
                id_sklep: "",
                id_klient: "",
                imie: "",
                nazwisko: "",
                adres: "",
                allSkleps:[],
                allKlients:[]
            },
            errors: {
                id: "",
                DataVizytu: "",
                straczona_summa: "",
                DataNastepnego: "",
                id_sklep: "",
                id_klient: "",
                imie: "",
                nazwisko: "",
                adres: "",


            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }

    }

    fetchZakupyDetails = () => {

        getZakupyByIdApiCall(this.state.paramsZakupyId)
            .then(res => res.json())
            .then(k => {
                return k
            })
            .then(
                (data) => {
                    if (data.message != null) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            zakupy: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }


    componentDidMount() {
        this.fetchZakupyDetails()
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const zakupy = {...this.state.zakupy};
        if (name === "id_sklep" || name === "id_klient"){
            zakupy[name] = parseInt(value);
        } else {
            zakupy[name] = value;
        }


        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            zakupy: zakupy,
            errors: errors
        })

    }

    validateField = (fieldName, fieldValue) => {

            let errorMessage = "";
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                zakupy = this.state.zakupy,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addZakupyApiCall(zakupy)

            } else if (currentFormMode === formMode.EDIT) {
                const zakupyId = this.state.zakupy.id

                promise = updateZakupyApiCall(zakupyId, zakupy)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {

                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const zakupy = this.state.zakupy;
        const errors = this.state.errors;
        for (const fieldName in zakupy) {
            const fieldValue = zakupy[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true;
            }
        }
        return false;
    }

    render() {
        const {t} = this.props;
        const {redirect} = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? "t('footballMatch.form.add.notice')" : "t('footballMatch.form.edit.notice')"
            console.log(this.state.zakupy.allSkleps)
            return (
                <Redirect to={{
                    pathname: "/zakups",
                    state: {
                        notice: notice,
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? t('error.validation.formErrors') : ''
        const fetchError = this.state.error ? `${t('error.error')} ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? "Zakups" : "Zakups"

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <label htmlFor="zakupyId"> Sklep <abbr title="required"
                                                                                       aria-label="required"
                                                                                       className="symbol-required">*</abbr></label>
                    <select name="id_sklep" id="id_sklep" defaultValue={this.state.zakupy.id_sklep}
                            onChange={this.handleChange} required>
                        <option value="">Wybiez sklep</option>
                        {this.state.zakupy.allSkleps.map(sklep =>
                            (<option key={sklep.id_sklep} value={sklep.id_sklep}
                                     selected={sklep.id_sklep === this.state.zakupy.id_sklep}>{sklep.Adresa}</option>)
                        )}
                    </select>
                    <span id="errorKlientId" className="errors-text">{this.state.errors.sklepId}</span>


                    <label htmlFor="id_klient">Klient <abbr title="required"
                                                                                   aria-label="required"
                                                                                   className="symbol-required">*</abbr></label>
                    <select name="id_klient" id="id_klient" defaultValue={this.state.zakupy.id_klient} onChange={this.handleChange}  required>
                        <option value="">Wybiez klienta</option>
                        {this.state.zakupy.allKlients.map(klients =>
                            (<option key={klients.id_klient} value={klients.id_klient}
                                     selected={klients.id_klient === this.state.zakupy.id_klient}>{klients.Imie} {klients.Nazwisko}</option>)
                        )}
                    </select>
                    <span id="ErrorSklep" className="errors-text">{this.state.errors.klient}</span>
                    <FormInput
                        type="date"
                        label="Data Vizytu"
                        required
                        error={this.state.errors.DataVizytu?getFormattedDate(this.state.zakupy.DataNastepnego) : ""}
                        name="DataVizytu"
                        onChange={this.handleChange}
                        selected = {this.state.zakupy.DataVizytu}
                        value={this.state.zakupy.DataVizytu?getFormattedDate(this.state.zakupy.DataVizytu) : ""}
                    />

                    <FormInput
                        type="date"
                        label="DataNastepnego"
                        required
                        error={this.state.errors.DataNastepnego?getFormattedDate(this.state.zakupy.DataNastepnego) : ""}
                        name="DataNastepnego"
                        onChange={this.handleChange}
                        selected = {this.state.zakupy.DataNastepnego}
                        value={this.state.zakupy.DataNastepnego?getFormattedDate(this.state.zakupy.DataNastepnego) : ""}
                    />

                    <FormInput
                        type="number"
                        label="straczona_summa"
                        required
                        error={this.state.errors.straczona_summa}
                        name="straczona_summa"
                        onChange={this.handleChange}
                        value={this.state.zakupy.straczona_summa}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/zakups"
                    />
                </form>
            </main>
        )


    }


}

export default withTranslation()(Zakupy)