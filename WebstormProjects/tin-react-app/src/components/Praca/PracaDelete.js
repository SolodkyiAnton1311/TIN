import React from 'react';
import {Redirect} from 'react-router-dom';
import {deletePracaApiCall} from "../../apiCalls/pracaApiCalls";




class PracaDelete extends React.Component {
    constructor(props) {
        super(props)
        let {pracaId: pracaId} = props.match.params
        this.state = {
            pracaId: pracaId,
        }
    }

    fetchZakupyDelete = () => {
        deletePracaApiCall(this.state.pracaId)
    }


    componentDidMount() {
        this.fetchZakupyDelete()


    }
    render() {


        return(<>
                <Redirect to={"/praca"} />
            </>
        )
    }
}
export default PracaDelete