import React from "react";
import {Link, Redirect} from "react-router-dom";
import formMode from '../../helper/formHelpers'
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {
    addSklepApiCall,
    getSklepByIdApiCall, updateSklepApiCall,
} from "../../apiCalls/sklepApiCalls";
import {checkRequired, checkTextLengthRange} from "../../helper/validationCommon";

class SklepForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsSklepId = props.match.params.sklepId;
        const currentFormMode = paramsSklepId ? formMode.EDIT : formMode.NEW
        this.state = {

            sklep: {

                Adresa: '',
                Data_otwarcia: ''

            },
            errors: {
                Adresa: '',
                Data_otwarcia: ''

            },
            formMode: currentFormMode,
            redirect: false,
            error: null,

        }
    }
    fetchSklepDetails = () => {
        getSklepByIdApiCall(this.state.id_sklep)
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

                            sklep: data,

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
            this.fetchSklepDetails()
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        const sklep = { ...this.state.sklep};
        sklep[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            sklep: sklep,
            errors: errors
        })
    }
    validateField = (fieldName,fieldValue)=> {
        let errorMessage = '';
        if (fieldName === 'Adres')
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
            const notice = currentFormMode === formMode.NEW ? 'Dodano nowy sklep' : 'Sklep zostal modifikowany '
            return (
                <Redirect to={{
                    pathname: "/skleps",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }



        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy Sklep' : 'Edycja Sklepa'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Adres"
                        required
                        error={this.state.errors.Adresa}
                        name="Adresa"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.sklep.Adresa}
                    />

                    <FormInput
                        type="date"
                        label="Date"
                        required
                        error={this.state.errors.Data_otwarcia}
                        name="Data_otwarcia"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.sklep.Data_otwarcia}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/skleps"
                    />


                </form>
            </main>
        )
    }
    validateForm = () => {
        const sklep = this.state.sklep;
        const errors = this.state.errors;
        for (const fieldName in sklep) {
            const fieldValue = sklep[fieldName];
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
                sklep = this.state.sklep,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addSklepApiCall(sklep)

            } else if (currentFormMode === formMode.EDIT) {

                const sklepId = this.props.match.params.sklepId;
                promise = updateSklepApiCall(sklepId, sklep)
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

export default SklepForm