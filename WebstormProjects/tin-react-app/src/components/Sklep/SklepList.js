import React from 'react'
import {Link} from "react-router-dom";

import SklepListTable from "./SklepListTable";
import {getSklepApiCalls} from "../../apiCalls/sklepApiCalls";
import {withTranslation} from "react-i18next";

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
        const {t} = this.props;
        return (
            <main>
                <h2>{t('shop.fields.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/skleps/add" className="button-add">{t('shop.fields.list.addNew')}</Link>
                </p>
            </main>
        )
    }
}


export default withTranslation() (SklepList)