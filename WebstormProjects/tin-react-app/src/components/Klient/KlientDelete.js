import React from 'react';
import {Redirect} from 'react-router-dom';
import {deleteKlientApiCall} from "../../apiCalls/klientApiCalls";




class KlientDelete extends React.Component {
    constructor(props) {
        super(props)
        let {klientId} = props.match.params
        this.state = {
            klientId: klientId,
        }
    }

    fetchKlientDelete = () => {
        deleteKlientApiCall(this.state.klientId)
    }


    componentDidMount() {
            this.fetchKlientDelete()


    }
    render() {


        return(<>
                <Redirect to={"/klients"} />
        </>
           )
    }
}
export default KlientDelete