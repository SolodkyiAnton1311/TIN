import React from 'react'
import {Link} from "react-router-dom";

import SklepListTable from "./SklepListTable";
import {getSklepApiCalls} from "../../apiCalls/sklepApiCalls";

class SklepList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            skleps: []
        }
    }

    componentDidMount() {
        this.fetchSklepList()
    }

    fetchSklepList = () => {
        getSklepApiCalls()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        skleps: data
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
        const { error, isLoaded, skleps } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych Sklepow...</p>
        } else {
            content = <SklepListTable sklepList={skleps} />
        }

        return (
            <main>
                <h2>Lista klientow</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/skleps/add" className="button-add">Dodaj nowego Sklepa</Link>
                </p>
            </main>
        )
    }
}


export default SklepList