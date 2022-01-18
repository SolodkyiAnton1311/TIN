import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from '../../helper/formHelpers'
import FormInput from "../form/FormInput";

import FormButtons from "../form/FormButtons";
import {addKlientApiCall, getKlientByIdApiCall, updateKlientApiCall} from "../../apiCalls/klientApiCalls";
import {checkRequired, checkTextLengthRange} from "../../helper/validationCommon";

class KlientForm extends React.Component {
    constructor(props) {
        super(props);
      const paramsKlientId = props.match.params.klientId;
        const currentFormMode = paramsKlientId ? formMode.EDIT : formMode.NEW
        this.state = {

            klient: {

                Imie: '',
                Nazwisko: '',
                Plec: '',
                Wiek: ''

            },
            errors: {
                Imie: '',
                Nazwisko: '',
                Plec: '',
                Wiek: ''

            },
            formMode: currentFormMode,
            redirect: false,
            error: null,

        }
    }
    fetchKlientDetails = () => {
        getKlientByIdApiCall(this.state.id_klient)
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

                            klient: data,

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
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchKlientDetails()
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        const klient = { ...this.state.klient};
        klient[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            klient: klient,
            errors: errors
        })
    }
    validateField = (fieldName,fieldValue)=> {
        let errorMessage = '';
        if (fieldName === 'imie')
        {

        if (!checkRequired(fieldValue)) {
            errorMessage = "Pole jest wymagane"
        } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
        errorMessage = 'pole powinno zawierac od 2 do 20 znakow'
        }
    }
        if (fieldName === 'nazwisko')
        {

            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane"
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = 'pole powinno zawierac od 2 do 20 znakow'
            }
        }
        return errorMessage;

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
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Dodano nowego klienta' : 'Klient zostal modifikowany '
            return (
                <Redirect to={{
                    pathname: "/klients",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }



        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy Klient' : 'Edycja Klienta'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Imię"
                        required
                        error={this.state.errors.Imie}
                        name="Imie"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.klient.Imie}
                    />

                    <FormInput
                        type="text"
                        label="Nazwisko"
                        required
                        error={this.state.errors.Nazwisko}
                        name="Nazwisko"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.klient.Nazwisko}
                    />

                    <FormInput
                        type="number"
                        label="Wiek"
                        required
                        error={this.state.errors.Wiek}
                        name="Wiek"
                        onChange={this.handleChange}
                        defaultValue={this.state.klient.Wiek}
                    />

                    <FormInput
                        type="text"
                        label="Plec"
                        required
                        error={this.state.errors.Plec}
                        name="Plec"
                        onChange={this.handleChange}
                        defaultValue={this.state.klient.Plec}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/klients"
                    />
                </form>
            </main>
        )
    }
    validateForm = () => {
        const klient = this.state.klient;
        const errors = this.state.errors;
        for (const fieldName in klient) {
            const fieldValue = klient[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                klient = this.state.klient,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addKlientApiCall(klient)

            } else if (currentFormMode === formMode.EDIT) {

                const klientId = this.props.match.params.klientId;
                console.log(this.state.id_klient)
                promise = updateKlientApiCall(klientId, klient)
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
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )}
        }
    }

    hasErrors = () =>{
        const errors = this.state.errors
        for (const  errorField in this.state.errors)
        {
            if(errors[errorField].length > 0)
            {
                return true
            }
        }
        return false
    }
}

export default KlientForm