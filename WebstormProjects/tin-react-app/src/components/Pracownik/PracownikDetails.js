import React from 'react';
import { Link } from 'react-router-dom';
import {withTranslation} from "react-i18next";
import {getPracowniktApiCall} from "../../apiCalls/pracownikApiCalls";
import PracownikDetailData from "./PracownikDetailData";


class PracownikDetails extends React.Component {
    constructor(props) {
        super(props)
        let { pracownikId: pracownikId } = props.match.params
        this.state = {
            pracownikId: pracownikId,

            error: null,
            isLoaded: false,
            message:null
        }
    }

    fetchPracownikDetails = () =>{
        getPracowniktApiCall(this.state.pracownikId)
            .then(res=>res.json())
            .then(
                (data)=>{
                    if (data.message)
                    {
                        this.setState(
                            {
                                pracownik:null,
                                message:data.message
                            }
                        )
                    }else {
                        this.setState({
                            pracownik:data,
                            message:null
                        })
                    }
                    this.setState({
                        isLoaded:true,
                    })
                },
                (error) =>{
                    this.setState({
                        isLoaded:true,
                        error
                    })
                }
            )
    }
    componentDidMount() {
        this.fetchPracownikDetails()
    }

    render() {
        const {t} = this.props;
        const {pracownik,error,isLoaded,message} = this.state
        let content;
        if(error){
            content=<p>Blad:{error.message}</p>
        }else if (!isLoaded)
        {
            content=<p>Ladowanie danych pracownika</p>
        } else if (message){
            content = <p>{message}</p>
        }else {
            content =<PracownikDetailData pracownikData={pracownik}/>
        }
        return(<main>
            <h2>{t('klient.list.detailsTitle')}</h2>
            {content}
            <div className="section-buttons">
                <Link to="/pracowniki" className="form-button-cancel">{t('form.actions.return')}</Link>
            </div>
        </main>)
    }
}
export default withTranslation()(PracownikDetails)