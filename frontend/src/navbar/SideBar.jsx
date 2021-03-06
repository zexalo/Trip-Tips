import React, {useContext, useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {Link} from 'react-router-dom';
import logoTripTips from "../images/logoTripTips.png";
import CountrySearchHome from "../worldMap/CountrySearchHome";
import './sidebar.scss'
import {SidebarDataOn, SidebarDataOutOwner, SidebarDataOutUser} from './SideBarData.jsx';
import {AuthContext} from "../contexts/AuthContext";

function SideBar() {

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const { state } = useContext(AuthContext);
    const [data, setSidebarData] = useState([])

    useEffect(() => {

        if (state.user?.email) {
            if(state.user?.authorities[0]=="ROLE_USER"){
                setSidebarData(SidebarDataOutUser)
            }else if(state.user?.authorities[0]=="ROLE_OWNER"){
                setSidebarData(SidebarDataOutOwner)
            }
        } else {

            setSidebarData(SidebarDataOn)
        }
    }, [state.user?.email]);


    return (
        <div>
            <div className="navbar">
                <Link to="#" className="sidebarButton ">
                    <CgIcons.CgMenuGridO onClick={showSidebar} size={50} color={sidebar ? '#22293c':'white'}/>
                </Link>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>

                    {data.map((item, index) =>{

                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} onClick={showSidebar}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>

                            </li>
                        )
                    })}
                    { state.user?.authorities && state.user?.authorities[0]=="ROLE_USER"  ?
                    <div>
                    <hr className="mb-0"/>
                    <CountrySearchHome/>
                    
                    </div>   
                    :
                    ""
                    }
                    <hr className="mt-0"/> 

                    <img src={logoTripTips} width='150px' height='75px'/>

                </ul>
            </nav>

        </div>

    )
}

export default SideBar