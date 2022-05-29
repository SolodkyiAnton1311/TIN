import React from 'react';
import { Link } from 'react-router-dom';
import {isAdmin, isAuthenticated} from "../../helper/authHelper";
import {withTranslation} from "react-i18next";
import {getPracaApiCall} from "../../apiCalls/pracaApiCalls";
import PracaListTable from "./PracaListTable";

class PracaList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            praca: []
        }
    }

    componentDidMount() {
        this.fetchPracaList()
    }

    fetchPracaList = () => {
        getPracaApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        praca: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, praca: praca } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych zakupow...</p>
        } else {
            content = <PracaListTable pracaList={praca} />
        }
        console.log(content)
        const {t} = this.props;
        return (

            isAuthenticated() &&
            <main>
                <h2>{t('praca.fields.list.pageTitle')}</h2>
                {content}
                { isAdmin() === 1 &&
                <p className="section-buttons">
                    <Link to="/praca/add" className="button-add">{t('praca.fields.list.addNew')}</Link>
                </p>
                }
            </main>
        )
    }
}

export default withTranslation() (PracaList)

