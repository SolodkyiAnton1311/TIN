import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from '../../helper/formHelpers'
import FormInput from "../form/FormInput";

import FormButtons from "../form/FormButtons";
import {checkRequired, checkTextLengthRange} from "../../helper/validationCommon";
import {withTranslation} from "react-i18next";
import {addPracownikApiCall, getPracownikByIdApiCall, updatePracownikApiCall} from "../../apiCalls/pracownikApiCalls";

class PracownikForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsPracownikiId = props.match.params.pracownikId;
        console.log(paramsPracownikiId)
        const currentFormMode = paramsPracownikiId ? formMode.EDIT : formMode.NEW
        this.state = {
            id_pracownik:paramsPracownikiId,
            pracownik: {

                imie: '',
                nazwisko: '',
                stawka: ''


            },
            errors: {
                imie: '',
                nazwisko: '',
                stawka: ''



            },
            formMode: currentFormMode,
            redirect: false,
            error: null,

        }
    }
    fetchPracownikDetails = () => {
        getPracownikByIdApiCall(this.state.id_pracownik)
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

                            pracownik: data,
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
            this.fetchPracownikDetails()
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        const pracownik = { ...this.state.pracownik};
        pracownik[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            pracownik: pracownik,
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
        if (fieldName === 'stawka')
        {

            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane"
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
                    pathname: "/pracowniki",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }


        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('pracownik.fields.list.addNew') : t('pracownik.fields.list.editTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('klient.fields.firstName')}
                        required
                        error={this.state.errors.imie}
                        name="imie"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.pracownik.imie}
                    />

                    <FormInput
                        type="text"
                        label={t('klient.fields.lastName')}
                        required
                        error={this.state.errors.nazwisko}
                        name="nazwisko"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.pracownik.nazwisko}
                    />

                    <FormInput
                        type="number"
                        label={t('pracownik.fields.salaryPerHours')}
                        required
                        error={this.state.errors.stawka}
                        name="stawka"
                        onChange={this.handleChange}
                        value={this.state.pracownik.stawka}
                    />


                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/pracowniki"
                    />
                </form>
            </main>
        )
    }
    validateForm = () => {
        const pracownik = this.state.pracownik;
        const errors = this.state.errors;
        for (const fieldName in pracownik) {
            const fieldValue = pracownik[fieldName];
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
                pracownik = this.state.pracownik,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addPracownikApiCall(pracownik)

            } else if (currentFormMode === formMode.EDIT) {

                const pracownikId = this.props.match.params.pracownikId;
                promise = updatePracownikApiCall(pracownikId, pracownik)
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

export default withTranslation()  (PracownikForm)