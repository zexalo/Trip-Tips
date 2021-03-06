import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import ApiService from "../../services/ApiService";
import PreviewRecomandationInProfile from "../../recommendation/PreviewInProfile";
import {DropdownButton, Dropdown} from 'react-bootstrap';
import "./styleProfil.scss";
import EditMyProfil from './editMyProfil';
import EditProfilPicture from "./editProfilPicture";
import DefaultImage from "../../images/profil/user.png";
import EditMyPassword from './editMyPassword';

function Profil() {
    const {state} = useContext(AuthContext);
    let display = <h2></h2>;

    const [isEditProfileVisible, setisEditProfileVisible] = useState(false);
    const [isEditPasswordVisible, setisEditPasswordVisible] = useState(false);
    const [isEditProfilePictureVisible, setisEditProfilePictureVisible] = useState(false);


    const showEditProfileWindow = () => {
        setisEditProfileVisible(true);
    }

    const hideEditProfileWindow = () => {
        setisEditProfileVisible(false);
    }

    const showEditProfilePictureWindow = () => {
        setisEditProfilePictureVisible(true);
    }

    const hideEditProfilePictureWindow = () => {
        setisEditProfilePictureVisible(false);
    }

    const showEditPasswordWindow = () => {
        setisEditPasswordVisible(true);
    }

    const hideEditPasswordWindow = () => {
        setisEditPasswordVisible(false);
    }

    const [listFav, setListFav] = useState([]);
    const [listIdRecomandationFav, setListIdRecomandationFav] = useState([]);
    const [listOwnerRecomendations, setListOwnerRecomendations] = useState([]);

    const fetchFavoriteRecommandation = async () => {
        await ApiService.get('/favorites?', state).then((data) => setListFav(data))
    }
    const fetchFavoriteRecommandationID = async () => {
        await ApiService.get('/favorites', state).then((data) => setListIdRecomandationFav(data.map((item) => item.id)))
    }

    const fetchOwnerRecommandationID = async () => {
        await ApiService.get('/owner-recomendations', state).then((data) => setListOwnerRecomendations(data))
    }

    useEffect(() => {
        if (state.user?.authorities[0] === "ROLE_OWNER") {
            fetchOwnerRecommandationID()
        } else {
            fetchFavoriteRecommandation()
            fetchFavoriteRecommandationID()
        }

    }, [isEditProfileVisible, isEditPasswordVisible, isEditProfilePictureVisible]);

    const ListFavorite = () => (
        <div className="favoriteRecommandationsMainContainer">
            {( state.user?.authorities[0] === "ROLE_OWNER" ? listOwnerRecomendations : listFav || []).map(item => (
                <div className="favoriteRecommandationContainer">
                    <PreviewRecomandationInProfile title={item.title} content={item.content} id={item.id}
                                                   isInUserFavorite={listIdRecomandationFav.includes(item.id)}
                                                   globalRating={item.globalRating} city={item.city}
                                                   country={item.country} picture={item.picture} price={item.price}/>
                </div>
            ))}
        </div>
    );

    if (state.user?.authorities[0] == "ROLE_OWNER") {
        display = <h2>Your posted recomendations</h2>;
    } else {
        display = <h2>Your favorite recommandations</h2>;
    }


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

                        <h2>Your personnal informations</h2>
                        <button onClick={showEditProfileWindow}>
                            <p>edit your profil</p>
                        </button>

                    </div>

                    <div className="personnalInformationsContainer">
                        <div className="personnalInformation">Name
                            : {state.user?.firstName} {state.user?.lastName}</div>
                        <div className="personnalInformation">Email : {state.user?.email}</div>
                    </div>

                    <div className="buttonEditPasswordContainer">
                        <button className="buttonEditPassword" onClick={showEditPasswordWindow}>
                            <p>modify your password</p>
                        </button>
                    </div>
                </div>

                <div className="favoriteRecommandationsMainContainer">

                    {display}

                    <ListFavorite/>
                </div>
            </div>
            <EditMyProfil
                isEditProfileVisible={isEditProfileVisible}
                hideEditProfileWindow={hideEditProfileWindow}
            />

            <EditMyPassword
                isEditPasswordVisible={isEditPasswordVisible}
                hideEditPasswordWindow={hideEditPasswordWindow}
            />

            <EditProfilPicture
                isEditProfilePictureVisible={isEditProfilePictureVisible}
                hideEditProfilePictureWindow={hideEditProfilePictureWindow}
            />
        </div>
    )
}

export default Profil;
