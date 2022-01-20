import React from 'react';
import { Link } from 'react-router-dom';
import {getZakupyApiCall} from "../../apiCalls/zakupyApiCalls";
import ZakupyListTable from "./ZakupyListTable";
import {isAdmin, isAuthenticated} from "../../helper/authHelper";
import {withTranslation} from "react-i18next";

class ZakupyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            zakupy: []
        }
    }

    componentDidMount() {
        this.fetchZakupyList()
    }

    fetchZakupyList = () => {
        getZakupyApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        zakupy: data
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
        const { error, isLoaded, zakupy: zakupy } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych zakupow...</p>
        } else {
            content = <ZakupyListTable zakupyList={zakupy} />
        }
        const {t} = this.props;
        return (

            isAuthenticated() &&
            <main>
                <h2>{t('zakupy.fields.list.pageTitle')}</h2>
                {content}
                { isAdmin() === 1 &&
                <p className="section-buttons">
                    <Link to="/zakups/add" className="button-add">{t('zakupy.fields.list.addNew')}</Link>
                </p>
                }
            </main>
        )
    }
}

export default withTranslation() (ZakupyList)

