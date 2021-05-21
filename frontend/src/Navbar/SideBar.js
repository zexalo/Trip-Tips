import React, {useState} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader,SidebarContent,SidebarFooter } from 'react-pro-sidebar';
import * as FaIcons from 'react-icons/fa';
import * as CgIcons from 'react-icons/cg';
import {Link} from 'react-router-dom';

import './sidebar.scss'






function SideBar() {

  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

    return (
      <div>
        <Link to="#">
          <CgIcons.CgMenuGridO onClick={showSidebar}/>
        </Link>
      <ProSidebar className={sidebar ? 'open' : 'close'}>
        
        <SidebarHeader >
        {
          <Menu iconShape="">
          <MenuItem icon={<CgIcons.CgMenuGridO/>}>
            Dashboard
            <Link to="/" />
          </MenuItem>
        </Menu>
        }
      </SidebarHeader>
      <SidebarContent>
        {/**
         *  You can add the content of the sidebar ex: menu, profile details, ...
         */}
      </SidebarContent>
      <SidebarFooter>
        {/**
         *  You can add a footer for the sidebar ex: copyright
         */}
      </SidebarFooter>
        
    </ProSidebar></div>
        
    )
}



export default SideBar
