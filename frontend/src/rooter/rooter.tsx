import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideBar from "../navbar/SideBar";
import Slider from "../categories/Menu_selection";
import Category from "../categories/Category";
import DetailRecomandation from "../recommendation/Detail";
import Profil from "../accueil/profil/profil";
import NotFound from "../NotFound";
import {LoginAndRegisterContainer, LogOut} from "../accueil/loginAndRegister";
import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import WorldMapPage from "../worldMap/WorldMapPage";
import Add_recommendation from "../recommendation/Add_recommendation"
import Index from "../index/index"

const UserRouter = () => {
    return (
        <Switch>
            <Route path='/categories' component={() => <Slider heading="Example Slider"/>}/>
            <Route path='/recommandations' component={Category}/>
            <Route path='/recommandation' component={DetailRecomandation}/>
            <Route path='/monProfil' component={Profil}/>
            <Route path='/log_out' component={LogOut}/>
            <Route path='/home' component={WorldMapPage}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

const NotLoggedInRouter = () => {
    return (
        <Switch>
            <Route path='/home' component={() => <Index/>}/>
            <Route path='/login_register' component={() => <LoginAndRegisterContainer/>}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

const OwnerRouter = () => {
    return (
        <Switch>
            <Route path='/home' component={() => <Index/>}/>
            <Route path='/add_recommendation' component={() => <Add_recommendation/>}/>
            <Route path='/recommandation' component={DetailRecomandation}/>
            <Route path='/monProfil' component={Profil}/>
            <Route path='/log_out' component={LogOut}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

const Rooter: React.FC = () => {
    const {state} = useContext(AuthContext);
    console.log("email", state.user?.email)
    return (
        <Router>
            <SideBar/>
                {state.user?.email && state.user?.authorities[0] === "ROLE_OWNER" && <OwnerRouter/>}
                {state.user?.email && state.user?.authorities[0] === "ROLE_USER" && <UserRouter/>}
                {!state.user?.email && <NotLoggedInRouter/>}
        </Router>
    )
}
export default Rooter;