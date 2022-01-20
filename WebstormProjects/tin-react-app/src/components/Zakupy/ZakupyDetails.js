import React from 'react';
import { Link } from 'react-router-dom';
import { getZakupyByIdApiCall } from '../../apiCalls/zakupyApiCalls';
import ZakupyDetailData from './ZakupyDetailsData'
import {withTranslation} from "react-i18next";

class ZakupyDetails extends React.Component {
    constructor(props) {
        super(props)
        let { zakupyId } = props.match.params
        this.state = {
            zakupyId: zakupyId,
            employment: null,
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchZakupyDetails()
    }

    fetchZakupyDetails = () => {
        getZakupyByIdApiCall(this.state.zakupyId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            zakupy: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            zakupy: data,
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
        const { zakupy: zakupy, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Pobieranie danych zakupów...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <ZakupyDetailData zakupyData={zakupy} />
        }
        const {t} = this.props;
        return (
            <main>
                <h2>{t('zakupy.fields.list.detailsTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/zakups" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </main >
        )
    }
}

export default withTranslation() (ZakupyDetails)