import React from 'react';
import { Link } from 'react-router-dom';
import {withTranslation} from "react-i18next";
import {getPracaByIdApiCall} from "../../apiCalls/pracaApiCalls";
import PracaDetailData from "./PracaDetailsData";

class PracaDetails extends React.Component {
    constructor(props) {
        super(props)
        let { pracaId } = props.match.params
        this.state = {
            pracaId: pracaId,
            employment: null,
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchPracaDetails()
    }

    fetchPracaDetails = () => {
        getPracaByIdApiCall(this.state.pracaId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            praca: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            praca: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    render() {
        const { praca: praca, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Pobieranie danych zakupów...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <PracaDetailData pracaData={praca} />
        }
        const {t} = this.props;
        return (
            <main>
                <h2>{t('praca.fields.list.detailsTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/praca" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </main >
        )
    }
}

export default withTranslation() (PracaDetails)