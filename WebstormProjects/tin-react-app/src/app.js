import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import KlientList from "./components/Klient/KlientList"
import SklepList from "./components/Sklep/SklepList"
import ZakupyList from "./components/Zakupy/ZakupyList"
import ZakupyForm from "./components/Zakupy/ZakupyForm"
import ZakupyDetails from "./components/Zakupy/ZakupyDetails"
import SklepForm from "./components/Sklep/SklepForm"
import SklepDelete from "./components/Sklep/SklepDelete"
import MainContent from "./components/other/MainContent";
import RegistrationForm from "./components/other/RegistrationForm";
import Footer from "./components/fragments/Footer";
import KlientDetails from "./components/Klient/KlientDetails";
import SklepDetails from "./components/Sklep/SklepDetails";
import KlientForm from "./components/Klient/KlientForm";
import KlientDelete from "./components/Klient/KlientDelete";
import ZakupyDelete from "./components/Zakupy/ZakupyDelete";
import {getCurrentUser} from "./helper/authHelper";
import LoginForm from "./components/other/LoginForm";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:undefined,
            prevPath:''
        }
    }
    handleLogin = (user) => {
        localStorage.setItem("user",user)
        this.setState({user:user})
    }
    handleLogout = () =>{
        localStorage.removeItem("user");
        this.setState({user:undefined})
    }
    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({user:currentUser})
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Navigation handleLogout={this.handleLogout} Rediret="/"/>
                    <Switch>
                        <Route exact path='/login' render={(props) => (<LoginForm handleLogin={this.handleLogin}/>)}/>
                        <Route exact path="/" component={MainContent}/>
                        <Route exact path="/skleps" component={SklepList}/>
                        <Route exact path="/zakups" component={ZakupyList}/>
                        <Route exact path="/klients" component={KlientList}/>
                        <Route exact path="/zakups/add" component={ZakupyForm}/>
                        <Route exact path="/zakups/edit/:zakupyId" component={ZakupyForm}/>
                        <Route exact path="/skleps/edit/:sklepId" component={SklepForm}/>
                        <Route exact path="/skleps/delete/:sklepId" component={SklepDelete}/>
                        <Route exact path="/zakups/delete/:zakupyId" component={ZakupyDelete}/>
                        <Route exact path="/skleps/add" component={SklepForm}/>
                        <Route exact path="/klients/add" component={KlientForm}/>
                        <Route exact path="/klients/edit/:klientId" component={KlientForm}/>
                        <Route exact path="/klients/details/:klientId" component={KlientDetails}/>
                        <Route exact path="/klients/delete/:klientId" component={KlientDelete}/>
                        <Route exact path="/zakups/details/:zakupyId" component={ZakupyDetails}/>
                        <Route exact path="/skleps/details/:sklepId" component={SklepDetails}/>
                        <Route exact path="/registration" component={RegistrationForm}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>

        );
    }
}

export default App;
