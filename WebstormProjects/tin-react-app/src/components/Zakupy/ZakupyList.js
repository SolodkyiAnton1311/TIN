import React from 'react';
import { Link } from 'react-router-dom';
import {getZakupyApiCall} from "../../apiCalls/zakupyApiCalls";
import ZakupyListTable from "./ZakupyListTable";


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
            content = <p>Ładowanie danych zatrudnień...</p>
        } else {
            content = <ZakupyListTable zakupyList={zakupy} />
        }

        return (
            <main>
                <h2>Lista Zakupów</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/zakups/add" className="button-add">Dodaj nowe Zakupy</Link>
                </p>
            </main>
        )
    }
}

export default ZakupyList

