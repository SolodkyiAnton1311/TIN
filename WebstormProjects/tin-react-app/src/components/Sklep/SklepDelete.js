import React from 'react';
import {Redirect} from 'react-router-dom';
import {deleteSklepApiCall} from "../../apiCalls/sklepApiCalls";
import {SklepList} from "./SklepList";



class SklepDelete extends React.Component {
    constructor(props) {
        super(props)
        let {sklepId} = props.match.params
        this.state = {
            sklepId: sklepId,
        }
    }

    fetchSklepDelete = () => {
        deleteSklepApiCall(this.state.sklepId)
    }


    componentDidMount() {
        this.fetchSklepDelete()
    }
    render() {


        return(<Redirect to={"/skleps"}/>)
    }
}
export default SklepDelete