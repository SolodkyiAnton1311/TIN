import React from 'react'
import {Link} from "react-router-dom";
import {getKlientApiCall} from "../../apiCalls/klientApiCalls";
import KlientListTable from "./KlientListTable";
import {withTranslation} from 'react-i18next'
import {isAdmin, isAuthenticated} from "../../helper/authHelper";
class KlientList extends React.Component {

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
        this.fetchKlientList()

    }

    fetchKlientList = () => {
        getKlientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        klients: data
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
        const { error, isLoaded, klients } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych klientow...</p>
        } else {
            content = <KlientListTable klientList={klients} />
        }
        const {t} = this.props;
        return (
            isAuthenticated() &&
            <main>
                <h2>{t('klient.list.pageTitle')}</h2>
                {content}
                {isAdmin() === 1 &&
                <p className="section-buttons">
                    <Link to="/klients/add" className="button-add">{t('klient.list.addNew')}</Link>
                </p>
                }
            </main>
        )
    }
}


export default withTranslation() (KlientList)