import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {Link} from 'react-router-dom';
import logoTripTips from "../images/logoTripTips.png";
import {AuthContext} from "../contexts/AuthContext";
import React, {useContext, useState, useEffect} from 'react';

export const  SidebarData = ()=>{
    const { state } = useContext(AuthContext);

   

 const rubrique=[

    
{   title: 'Home',
    path: '/home',
    icon: <FaIcons.FaHome/>,
    cName: 'nav-text mt-5',
    
},

{   title: 'Profil',
    path: '/monProfil',
    icon: <FaIcons.Fa500Px/>,
    cName: 'nav-text',
    
},


{   title: 'Categories',
    path: '/categories',
    icon: <FaIcons.FaAdobe/>,
    cName: 'nav-text',
   
},
{   title: 'Login/Register',
    path: '/login_register',
    icon: <FaIcons.FaBlog/>,
    cName: 'nav-text',
    
},
{   title: 'LogOut',
    path: '/',
    icon: <FaIcons.FaBlog/>,
    cName: 'nav-text',
   
},





]

}