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
        fetchFavoriteRecommandation()
    }, [isEditProfileVisible, isEditPasswordVisible]);


    const [listFav, setListFav] = useState([]);

    const fetchFavoriteRecommandation = async () => { 
        await ApiService.get('/favorites?', state).then((data) =>  setListFav(data))
    }

    const ListFavorite = () => (
        <div className="favoriteRecommandationsMainContainer">
                {(listFav || []).map(item => (
                    <div className="favoriteRecommandationContainer">
                        <PreviewRecomandationInProfile title={item.title}/>
                    </div >
                ))}
        </div>
    );


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

                <div className="favoriteRecommandationsMainContainer">
                    <h2>Your favorite recommandations</h2>
                    <div className="dropDownButtonsContainer">
                                <DropdownButton className="dropDownButton" title="sort with ..  ">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>

                    </div>

                    <ListFavorite/>
                </div>
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
