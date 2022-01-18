import React from 'react';
import { Link } from 'react-router-dom';

import SklepDetailsData from "./SklepDetailsData";
import {getSklepByIdApiCall} from "../../apiCalls/sklepApiCalls";
import {withTranslation} from "react-i18next";




class SklepDetails extends React.Component {
    constructor(props) {
        super(props)
        let { sklepId } = props.match.params
        this.state = {
            sklepId: sklepId,
            zakupy: null,
            error: null,
            isLoaded: false,
            message:null
        }
    }

    fetchSklepDetails = () =>{
        getSklepByIdApiCall(this.state.sklepId)
            .then(res=>res.json())
            .then(
                (data)=>{
                    if (data.message)
                    {
                        this.setState(
                            {
                                sklep:null,
                                message:data.message
                            }
                        )
                    }else {
                        this.setState({
                            sklep:data,
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
        this.fetchSklepDetails()
    }
    render() {
        const {sklep: sklep,error,isLoaded,message} = this.state
        let content;
        if(error){
            content=<p>Blad:{error.message}</p>
        }else if (!isLoaded)
        {
            content=<p>Ladowanie danych klienta</p>
        } else if (message){
            content = <p>{message}</p>
        }else {
            content =<SklepDetailsData sklepData={sklep}/>
        }
        return(<main>
            <h2>Szegoly klienta</h2>
            {content}
            <div className="section-buttons">
                <Link to="/skleps" className="form-button-cancel">Powrot</Link>
            </div>
        </main>)
    }
}
export default withTranslation() (SklepDetails)