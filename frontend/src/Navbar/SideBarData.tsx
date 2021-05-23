import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {Link} from 'react-router-dom';
import logoTripTips from "../images/logoTripTips.png";

export const SidebarData =[

{   title: 'Home',
    path: '/',
    icon: <FaIcons.FaHome/>,
    cName: 'nav-text mt-5'
},

{   title: 'Login/Register',
    path: '/login_register',
    icon: <FaIcons.FaBlog/>,
    cName: 'nav-text'
},

{   title: 'Categories',
    path: '/categories',
    icon: <FaIcons.FaAdobe/>,
    cName: 'nav-text'
},





]