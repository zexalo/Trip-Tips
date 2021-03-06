import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';

export let SidebarDataOn = [

    {
        title: 'Home',
        path: '/home',
        icon: <FaIcons.FaHome/>,
        cName: 'nav-text mt-5',

    },

    {
        title: 'Login/Register',
        path: '/login_register',
        icon: <FaIcons.FaPlaneArrival/>,
        cName: 'nav-text',
    },
    
    
]

export let SidebarDataOutUser = [

    {
        title: 'Home',
        path: '/home',
        icon: <FaIcons.FaHome/>,
        cName: 'nav-text mt-5',

    },

    {
        title: 'Profil',
        path: '/monProfil',
        icon: <FaIcons.FaUser/>,
        cName: 'nav-text',
    },

    {
        title: 'LogOut',
        path: '/log_out',
        icon: <FaIcons.FaPlaneDeparture/>,
        cName: 'nav-text',
    },
]

export let SidebarDataOutOwner = [

    {
        title: 'Profil',
        path: '/monProfil',
        icon: <FaIcons.FaUser/>,
        cName: 'nav-text mt-5',
    },


    
    {
        title: 'Recommendation',
        path: '/add_recommendation',
        icon: <FaIcons.FaPlusCircle/>,
        cName: 'nav-text',
    },

    {
        title: 'LogOut',
        path: '/log_out',
        icon: <FaIcons.FaPlaneDeparture/>,
        cName: 'nav-text',
    },
]
