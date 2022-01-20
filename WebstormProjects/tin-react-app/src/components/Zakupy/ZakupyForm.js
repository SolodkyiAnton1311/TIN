import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from '../../helper/formHelpers'
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {checkRequired, checkTextLengthRange} from "../../helper/validationCommon";
import {addZakupyApiCall, getZakupyApiCall, updateZakupyApiCall} from "../../apiCalls/zakupyApiCalls";
import {withTranslation} from "react-i18next";

class ZakupyForm extends React.Component {
    constructor(props) {
        super(props);
        const zakupyKlientId = props.match.params.zakupyId;
        const currentFormMode = zakupyKlientId ? formMode.EDIT : formMode.NEW
        this.state = {
            zakupyKlientId:zakupyKlientId,
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
                klients: [],
                allKlients: [],
                allSkleps: []
            },
            errors: {
                id_sklep: '',
                id_klient: '',
                DataVizytu: '',
                DataNastepnego: '',
                straczona_summa:''


            },
            formMode: currentFormMode,
            redirect: false,
            error: null,

        }
    }
    fetchZakupyDetails = () => {

        getZakupyApiCall(this.state.zakupy.id)
            .then(res => res.json())
            .then(k => {

                return k
            })
            .then(
                (data) => {



                        this.setState({

                            zakupy:data,

                            message: null
                        })
                    console.log(data)

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
            this.fetchZakupyDetails()
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        const zakupy = { ...this.state.zakupy};
        zakupy[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            zakupy: zakupy,
            errors: errors
        })
    }
    validateField = (fieldName,fieldValue)=> {
        let errorMessage = '';

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

        const { redirect } = this.state;
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Dodano nowe zakupy' : 'Zakupy zostali modifikowany '
            return (
                <Redirect to={{
                    pathname: "/zakups",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('zakupy.fields.list.addNew') : t('zakupy.fields.list.editTitle')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="id_sklep">poebat<abbr title="required" aria-label="required" className="symbol-required">*</abbr></label>
                    <select name="id_sklep" id="id_sklep" defaultValue={this.state.zakupy.id_sklep} onChange={this.handleChange} required>
                        <option value=""></option>
                        {this.state.zakupy.allSkleps.map(sklep =>
                            (<option key={sklep.id_sklep} value={sklep.id_sklep} selected={sklep.id_sklep === this.state.zakupy.id_sklep}>{sklep.Adresa}</option>)
                        )}
                    </select>
                    <FormInput
                        type="text"
                        label="sklep"
                        required
                        error={this.state.errors.id_sklep}
                        name="id_sklep"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.zakupy.id_sklep}
                    />

                    <FormInput
                        type="text"
                        label={t('zakupy.fields.firstName')}
                        required
                        error={this.state.errors.id_klient}
                        name="id_klient"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.zakupy.id_klient}
                    />

                    <FormInput
                        type="date"
                        label={t('zakupy.fields.dataLast')}
                        required
                        error={this.state.errors.DataVizytu}
                        name="DataVizytu"
                        onChange={this.handleChange}
                        defaultValue={this.state.zakupy.DataVizytu}
                    />

                    <FormInput
                        type="date"
                        label={t('zakupy.fields.dateNext')}
                        required
                        error={this.state.errors.DataNastepnego}
                        name="Plec"
                        onChange={this.handleChange}
                        defaultValue={this.state.zakupy.DataNastepnego}
                    />

                    <FormInput
                        type="number"
                        label={t('zakupy.fields.straczonasumma')}
                        required
                        error={this.state.errors.straczona_summa}
                        name="straczona_summa"
                        onChange={this.handleChange}
                        defaultValue={this.state.zakupy.straczona_summa}
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

                const zakupyId = this.props.match.params.zakupyId;
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

export default withTranslation() (ZakupyForm)