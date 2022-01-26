import React from "react";
import {Link, Redirect} from "react-router-dom";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {checkRequired, checkTextLengthRange} from "../../helper/validationCommon";
import {withTranslation} from "react-i18next";
import {addUserApiCall} from "../../apiCalls/registrationApiCalls";

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            user: {
                email:"",
                password:"",
                isAdmin:"0"

            },
            errors: {
                email:"",
                password:"",
                isAdmin:"0"

            },
            redirect: false,
            error: null,

        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const user = { ...this.state.user};
        user[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = { ...this.state.errors };
        errors[name] = errorMessage;

        this.setState({
            user: user,
            errors: errors
        })
    }
    validateField = (fieldName,fieldValue)=> {
        let errorMessage = '';
        if (fieldName === 'email')
        {

            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane"
            } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = 'pole powinno zawierac od 2 do 20 znakow'
            }
        }
        if (fieldName === 'password')
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
            return (
                <Redirect to={{
                    pathname: "/",
                    state: {

                    }
                }} />
            )
        }


        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''


        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{t('nav.registration')}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Login"
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.user.email}
                    />

                    <FormInput
                        type="text"
                        label={t('list.actions.password')}
                        required
                        error={this.state.errors.email}
                        name="password"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        defaultValue={this.state.user.password}
                    />

                    <FormButtons
                        formMode={"NEW"}
                        error={globalErrorMessage}
                        cancelPath="/"
                    />
                </form>
            </main>
        )
    }
    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;
        for (const fieldName in user) {
            const fieldValue = user[fieldName];
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
                user = this.state.user

            let promise,
                response;
                promise = addUserApiCall(user)

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

export default withTranslation()  (UserForm)