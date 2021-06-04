import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./styleProfil.scss";
import EditMyProfil from './editMyProfil';
import EditProfilPicture from "./editProfilPicture";
import DefaultImage from "../../images/profil/user.png";

function Profil() {
    const { state } = useContext(AuthContext);

    const [isEditProfileVisible, setisEditProfileVisible] = useState(false);

    const [isEditProfilePictureVisible, setisEditProfilePictureVisible] = useState(false);

    const showEditProfileWindow = () => {
        setisEditProfileVisible (true);
    }

    const hideEditProfileWindow = () => {
        setisEditProfileVisible (false);
    }

    const showEditProfilePictureWindow = () => {
        setisEditProfilePictureVisible (true);
    }

    const hideEditProfilePictureWindow = () => {
        setisEditProfilePictureVisible (false);
    }

    useEffect( () => {
    }, [isEditProfileVisible, isEditProfilePictureVisible]);

    return (
        <div className="myProfilContainer">
            <div className="myProfil">

                <div className="profilImageContainer">
                    <div className="profilImage" onClick={showEditProfilePictureWindow}>
                        <img src={DefaultImage} alt="profile picture"></img>
                    </div>
                </div>

                <div className="nameContainer">
                    <h1>{state.user?.firstName} {state.user?.lastName}</h1>
                </div>



                <div className="personnalInformationsMainContainer">
                    <div className="personnalInformationTitleAndButton">
                        <h2>Your personnal informations {isEditProfileVisible} </h2>
                        <button onClick={showEditProfileWindow}>
                            <p>edit your profil</p>
                        </button>

                    </div>

                    <div className="personnalInformationsContainer">
                        <div className="personnalInformation">Name : {state.user?.firstName} {state.user?.lastName}</div>
                        <div className="personnalInformation">Email : {state.user?.email}</div>
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

                                <DropdownButton className="dropDownButton" title="sort for ..">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>

                                <DropdownButton className="dropDownButton" title="sort by blabla">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                    </div>

                    <div className="favoriteRecommandationsMainContainer">
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                        <div className="favoriteRecommandationContainer"></div>
                    </div>
                </div>
            </div>
            <EditMyProfil
            isEditProfileVisible = {isEditProfileVisible}
            hideEditProfileWindow = {hideEditProfileWindow}
            />

            <EditProfilPicture
            isEditProfilePictureVisible = {isEditProfilePictureVisible}
            hideEditProfilePictureWindow = {hideEditProfilePictureWindow}
            />
        </div>
    )
}
export default Profil;
