import React from 'react';
import {Redirect} from 'react-router-dom';
import {deletePracownikApiCall} from "../../apiCalls/pracownikApiCalls";





class PracownikDelete extends React.Component {
    constructor(props) {
        super(props)
        let {pracownikId} = props.match.params
        this.state = {
            pracownikId: pracownikId,
        }
    }

    fetchPracownikDelete = () => {
        deletePracownikApiCall(this.state.pracownikId)
    }


    componentDidMount() {
        this.fetchPracownikDelete()


    }
    render() {


        return(<>
                <Redirect to={"/pracowniki"} />
            </>
        )
    }
}
export default PracownikDelete