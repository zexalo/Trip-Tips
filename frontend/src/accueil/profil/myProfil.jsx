import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export class MyProfil extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="myProfilContainer">
        <div className="myProfil">

            <div className="profilImageContainer">
                <div className="profilImage">
                </div>
            </div>

            <div className="nameContainer">
                <h1>Félix Nedelec</h1>
            </div>
            

            <div className="personnalInformationsMainContainer">
                <div className="personnalInformationTitleAndButton">
                    <h2>Your personnal informations</h2>
                    <button>
                        <p>edit your profil</p>
                    </button>
                </div>
                
                <div className="personnalInformationsContainer">
                    <div>Name : Félix Nedelec</div>
                    <div>BirthDay : 05/11/1999</div>
                    <div>Sex : Male</div>
                    <div>BirthDay : 05/11/1999</div>

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
        </div>
    }
}