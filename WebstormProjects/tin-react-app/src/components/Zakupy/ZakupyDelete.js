import React from 'react';
import {Redirect} from 'react-router-dom';
import {deleteZakupyApiCall} from "../../apiCalls/zakupyApiCalls";




class ZakupyDelete extends React.Component {
    constructor(props) {
        super(props)
        let {zakupyId: zakupyId} = props.match.params
        this.state = {
            zakupyId: zakupyId,
        }
    }

    fetchZakupyDelete = () => {
        deleteZakupyApiCall(this.state.zakupyId)
    }


    componentDidMount() {
        this.fetchZakupyDelete()


    }
    render() {


        return(<>
                <Redirect to={"/zakups"} />
            </>
        )
    }
}
export default ZakupyDelete