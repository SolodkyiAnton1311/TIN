import React from "react";
import FormInput from "../form/FormInput";
import {withTranslation} from "react-i18next";
import {getFormattedDate} from "../../helper/dateHelper";
import {Redirect} from "react-router-dom";

import FormButtons from "../form/FormButtons";
import formMode from "../../helper/formHelpers";
import {addPracaApiCall, getPracaByIdApiCall, updatePracaApiCall} from "../../apiCalls/pracaApiCalls";

class PracaFrom extends React.Component {

    constructor(props) {
        super(props);
        const paramsPracaId = props.match.params.pracaId;
        const currentFormMode = paramsPracaId ? formMode.EDIT : formMode.NEW;

        this.state = {
            paramsPracaId: paramsPracaId,

            praca: {
                id: "",
                data_zatrudnienia: "",
                id_sklep: "",
                id_pracownik: "",
                imie:"",
                nazwisko:"",
                stawka:"",
                allSkleps:[],
                allPracowniki:[]
            },
            errors: {
                id: "",
                data_zatrudnienia: "",
                id_sklep: "",
                id_pracownik: "",
                stawka:"",
                imie:"",
                nazwisko:""


            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }

    }

    fetchPracaDetails = () => {

        getPracaByIdApiCall(this.state.paramsPracaId)
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
                            praca: data,
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
        this.fetchPracaDetails()
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const praca = {...this.state.praca};
        if (name === "id_sklep" || name === "id_pracownik"){
            praca[name] = parseInt(value);
        } else {
            praca[name] = value;
        }


        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            praca: praca,
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
                praca = this.state.praca,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addPracaApiCall(praca)

            } else if (currentFormMode === formMode.EDIT) {
                const pracaId = this.state.praca.id

                promise = updatePracaApiCall(pracaId, praca)
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
        const praca = this.state.praca;
        const errors = this.state.errors;
        for (const fieldName in praca) {
            const fieldValue = praca[fieldName];
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
            const notice = currentFormMode === formMode.NEW ? "" : ""
            console.log(this.state.praca.allSkleps)
            return (
                <Redirect to={{
                    pathname: "/praca",
                    state: {
                        notice: notice,
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? t('error.validation.formErrors') : ''
        const fetchError = this.state.error ? `${t('error.error')} ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('praca.fields.list.addNew') : t('praca.fields.list.editTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                    <label htmlFor="pracaId"> {t('zakupy.fields.market')} <abbr title="required"
                                                                                 aria-label="required"
                                                                                 className="symbol-required">*</abbr></label>
                    <select name="id_sklep" id="id_sklep" defaultValue={this.state.praca.id_sklep}
                            onChange={this.handleChange} required>
                        <option value="">Wybiez sklep</option>
                        {this.state.praca.allSkleps.map(sklep =>
                            (<option key={sklep.id_sklep} value={sklep.id_sklep}
                                     selected={sklep.id_sklep === this.state.praca.id_sklep}>{sklep.Adresa}</option>)
                        )}
                    </select>
                    <span id="errorKlientId" className="errors-text">{this.state.errors.sklepId}</span>


                    <label htmlFor="id_pracownik"> {t('praca.fields.employeer')}  <abbr title="required"
                                                                                   aria-label="required"
                                                                                   className="symbol-required">*</abbr></label>
                    <select name="id_pracownik" id="id_pracownik" defaultValue={this.state.praca.id_pracownik} onChange={this.handleChange}  required>
                        <option value="">Wybiez pracownika</option>
                        {this.state.praca.allPracowniki.map(pracownik =>
                            (<option key={pracownik.id_pracownik} value={pracownik.id_pracownik}
                                     selected={pracownik.id_pracownik === this.state.praca.id_pracownik}>{pracownik.imie} {pracownik.nazwisko}</option>)
                        )}
                    </select>
                    <span id="ErrorSklep" className="errors-text">{this.state.errors.pracownik}</span>
                    <FormInput
                        type="date"
                        label= {t('praca.fields.dataZatrudnienia')}
                        required
                        error={this.state.errors.data_zatrudnienia?getFormattedDate(this.state.praca.data_zatrudnienia) : ""}
                        name="data_zatrudnienia"
                        onChange={this.handleChange}
                        selected = {this.state.praca.data_zatrudnienia}
                        value={this.state.praca.data_zatrudnienia?getFormattedDate(this.state.praca.data_zatrudnienia) : ""}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/praca"
                    />
                </form>
            </main>
        )


    }


}

export default withTranslation()(PracaFrom)