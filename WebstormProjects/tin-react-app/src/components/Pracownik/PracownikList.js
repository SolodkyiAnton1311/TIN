import React from 'react'
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next'
import {isAdmin, isAuthenticated} from "../../helper/authHelper";
import {getPracowniktApiCall} from "../../apiCalls/pracownikApiCalls";
import PracownikiListTable from "./PracownikiListTable";
class PracownikiList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            klients: [],
            notice:this.notice
        }
    }

    componentDidMount() {
        this.fetchPracownikiList()

    }

    fetchPracownikiList = () => {
        getPracowniktApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        pracowniki: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, pracowniki } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownikow...</p>
        } else {
            content = <PracownikiListTable pracownikiList={pracowniki} />
        }
        const {t} = this.props;
        return (
            isAuthenticated() &&
            <main>
                <h2>{t('pracownik.fields.list.pageTitle')}</h2>
                {content}
                {isAdmin() === 1 &&
                <p className="section-buttons">
                    <Link to="/pracowniki/add" className="button-add">{t('pracownik.fields.list.addNew')}</Link>
                </p>
                }
            </main>
        )
    }
}


export default withTranslation() (PracownikiList)