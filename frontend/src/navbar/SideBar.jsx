import React, {useContext, useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {Link} from 'react-router-dom';
import logoTripTips from "../images/logoTripTips.png";
import './sidebar.scss'
import {SidebarDataOn, SidebarDataOut} from './SideBarData.jsx';
import {AuthContext} from "../contexts/AuthContext";

function SideBar() {

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const {state} = useContext(AuthContext);
    const [data, setSidebarData] = useState([])

    useEffect(() => {
        if (state.user?.email) {
            setSidebarData(SidebarDataOut)

        } else {
            setSidebarData(SidebarDataOn)
        }
    }, [state.user?.email]);

    return (
        <div>
            <div className="navbar">
                <Link to="#" className="sidebarButton">
                    <CgIcons.CgMenuGridO onClick={showSidebar} size={50} color={sidebar ? '#22293c' : 'white'}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {data.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} onClick={showSidebar}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <hr/>
                    <input type="search" className="form-control rounded" placeholder="Pays" aria-label="Search" aria-describedby="search-addon"/>
                    <input className="mt-2 searchbtn" type="submit" value="Search"></input>
                    <hr/>
                    <img src={logoTripTips} width='150px'/>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar
