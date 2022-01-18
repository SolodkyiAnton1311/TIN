import React from 'react';
import { Link } from 'react-router-dom';
import { getKlientByIdApiCall } from '../../apiCalls/klientApiCalls'
import KlientDetailData from "./KlientDetailData";





class KlientDetails extends React.Component {
    constructor(props) {
        super(props)
        let { klientId } = props.match.params
        this.state = {
            klientId: klientId,

            error: null,
            isLoaded: false,
            message:null
        }
    }

    fetchKlientDetails = () =>{
        getKlientByIdApiCall(this.state.klientId)
            .then(res=>res.json())
            .then(
                (data)=>{
                    if (data.message)
                    {
                        this.setState(
                            {
                                klient:null,
                                message:data.message
                            }
                        )
                    }else {
                        this.setState({
                            klient:data,
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
        this.fetchKlientDetails()
    }
    render() {
        const {klient,error,isLoaded,message} = this.state
        let content;
        if(error){
            content=<p>Blad:{error.message}</p>
        }else if (!isLoaded)
        {
            content=<p>Ladowanie danych klienta</p>
        } else if (message){
            content = <p>{message}</p>
        }else {
            content =<KlientDetailData klientData={klient}/>
        }
        return(<main>
            <h2>Szegoly klienta</h2>
            {content}
            <div className="section-buttons">
                <Link to="/klients" className="form-button-cancel">Powrot</Link>
            </div>
        </main>)
    }
}
export default KlientDetails