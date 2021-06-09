import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import ApiService from "../../services/ApiService";
import PreviewRecomandationInProfile from "../../Recommendation/PreviewInProfile";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./styleProfil.scss";
import EditMyProfil from './editMyProfil';
import EditMyPassword from './editMyPassword';

function Profil() {
    const { state } = useContext(AuthContext);
    console.log("email", state.user.authorities);

    const [isEditProfileVisible, setisEditProfileVisible] = useState(false);
    const [isEditPasswordVisible, setisEditPasswordVisible] = useState(false);

    const showEditProfileWindow = () => {
        setisEditProfileVisible (true);
    }

    const hideEditProfileWindow = () => {
        setisEditProfileVisible (false);
    }

    const showEditPasswordWindow = () => {
        setisEditPasswordVisible (true);
    }

    const hideEditPasswordWindow = () => {
        setisEditPasswordVisible (false);
    }

    useEffect( () => {
        if(state.user?.authorities[0]=="ROLE_USER"){
            fetchFavoriteRecommandation()
        }
        else{
            fetchOwnerRecommandation()
        }
    }, [isEditProfileVisible, isEditPasswordVisible]);


    const [listFav, setListFav] = useState([]);
    const [listOwnReco, setListOwnReco] = useState([]);

    const fetchFavoriteRecommandation = async () => { 
        await ApiService.get('/favorites?', state).then((data) =>  setListFav(data))
    }

    const fetchOwnerRecommandation = async () => {
        await ApiService.get('/owner-recomendations', state).then((data) =>  setListOwnReco(data))
    }

    const ListFavorite = () => (
        <div className="allFavoriteContainer">
            <h2>Your favorite recommandations</h2>
            <div className="dropDownButtonsContainer">
                <DropdownButton className="dropDownButton" title="sort with ..  ">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>

            </div>
            <div className="favoriteRecommandationsMainContainer">
                <div className="favoriteRecommandationsMainContainer">
                        
                    {(listFav || []).map(item => (
                            <div className="favoriteRecommandationContainer">
                                <PreviewRecomandationInProfile title={item.title}/>
                            </div >
                    ))}
                </div>
            </div>
        </div>
    );

    const ListOwnRecommandation = () => {
        <div className="allOwnContainer">
            <h2>Your own recommandations</h2>
            <div className="dropDownButtonsContainer">
                <DropdownButton className="dropDownButton" title="sort with ..  ">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>

            </div>
            <div className="ownRecommandationsMainContainer">
                <div className="ownRecommandationsMainContainer">
                        
                    {(listOwnReco || []).map(item => (
                            <div className="ownRecommandationContainer">
                                <PreviewRecomandationInProfile title={item.title}/>
                            </div >
                    ))}
                </div>
            </div>
        </div>
    }


    return (
        <div className="myProfilContainer">
            <div className="myProfil">

                <div className="profilImageContainer">
                    <div className="profilImage">
                    </div>
                </div>

                <div className="nameContainer">
                    <h1>{state.user?.firstName} {state.user?.lastName}</h1>
                </div>



                <div className="personnalInformationsMainContainer">
                    <div className="personnalInformationTitleAndButton">
                        <h2>Your personnal informations</h2>
                        <button onClick={showEditProfileWindow}>
                            <p>edit your profil</p>
                        </button>

                    </div>

                    <div className="personnalInformationsContainer">
                        <div className="personnalInformation">Name : {state.user?.firstName} {state.user?.lastName}</div>
                        <div className="personnalInformation">Email : {state.user?.email}</div>
                    </div>

                    <div className="buttonEditPasswordContainer">
                        <button className="buttonEditPassword" onClick={showEditPasswordWindow}>
                            <p>modify your password</p>
                        </button>
                    </div>
                </div>
                
                { state.user?.authorities[0]=="ROLE_USER" ? <ListFavorite/> : <ListOwnRecommandation/> }

            </div>
            <EditMyProfil
            isEditProfileVisible = {isEditProfileVisible}
            hideEditProfileWindow = {hideEditProfileWindow}
            />

            <EditMyPassword
            isEditPasswordVisible = {isEditPasswordVisible}
            hideEditPasswordWindow = {hideEditPasswordWindow}
            />
        </div>

    )
}
export default Profil;
