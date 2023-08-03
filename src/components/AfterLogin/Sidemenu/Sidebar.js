import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import greenTick from '../../../assets/greenTick.svg';
import dashboardIcon from '../../../assets/dashboardInactive.png';
import dashboardActive from '../../../assets/dashboardActive.png';
import PortalAdministrationInActive from '../../../assets/PortalAdministrationInActive.png';
import PortalAdministrationActive from '../../../assets/PortalAdministrationActive.png';
import userRoleInactive from '../../../assets/userRoleInactive.png';
import userRoleactive from '../../../assets/userRoleactive.png';
import propertyManagementInactive from '../../../assets/propertyManagementInactive.png';
import propertyManagementactive from '../../../assets/propertyManagementactive.png';
import propertyListInactive from '../../../assets/propertyListInactive.png';
import propertyListactive from '../../../assets/propertyListactive.png';
import serviceListInactive from '../../../assets/serviceListInactive.png';
import serviceListactive from '../../../assets/serviceListactive.png';
import subManagementInactive  from '../../../assets/subManagementInactive.png';
import subManagementactive from '../../../assets/subManagementactive.png';
const Sidebar = () => {
  const roles =  localStorage.getItem("role")
  const [menuItems, setmenuItems] = useState([]);

  useEffect(() => {
    
    if(roles === "student"){
      let obj = [
       
        {
          name: 'Dashboard',
          value:'Dashboard',
          path: '/Dashboard',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
         {
          name: 'Activities',
          value:'Activities',
          path: '/Activities',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
        {
          name: 'Appointments',
          value:'Appointments',
          path: '/Appointments',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
        {
          name: 'Reports',
          value:'Reports',
          path: '/Reports',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
        {
          name: 'Upcoming Events',
          value:'Upcoming Events',
          path: '/UpcomingEvents',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
        {
          name: 'User Settings',
          value:'User Settings',
          path: '/UserSettings',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
       
      ];
      setmenuItems(obj)
    }
  
    else if(roles === "admin"){
      let obj = [
        {
          name: 'Dashboard',
          value:'Dashboard',
          path: '/dashboard',
          iconInactive:`${dashboardIcon}`,
          iconActive:`${dashboardActive}`
        },
        {
          name: 'Portal Administration',
          value:'User List',
         subItems: [
          { name: 'User List', value:'User List',path: '/PortalAdministration',iconInactive: `${userRoleInactive}`,iconActive:`${userRoleactive}` },
    { name: 'User Role', value:'User Role',path: '/UserRole',iconInactive: `${userRoleInactive}`,iconActive:`${userRoleactive}` }
  ],
          path: '/PortalAdministration',
          iconInactive:`${PortalAdministrationInActive}`,
          iconActive:`${PortalAdministrationActive}`
        },
          
        {
          name: 'Property Management',
          value:'Property List',
          subItems: [
            { name: 'Property List', value:'Property List',path: '/PropertyList',iconInactive:`${propertyListInactive}`,iconActive:`${propertyListactive}` },
           
          ],
          path: '/PropertyList',
          iconInactive:`${propertyManagementInactive}`,
          iconActive:`${propertyManagementactive}`
        },
        {
          name: 'Task Management',
          value:'Task Management',
         
          path: '/TaskManagement',
          iconInactive:`${PortalAdministrationInActive}`,
          iconActive:`${PortalAdministrationActive}`
        },
        
        {
          name: 'Subscription Management',
          value:'Subscription List',
          path: '/SubscriptionManagement',
          subItems: [
            { name: 'Subscription List',value:'Subscription List', path: '/SubscriptionManagement',
          iconInactive:`${serviceListInactive}`,
        iconActive:`${serviceListactive}`},
            { name: 'Service List',value:'Service List', path: '/ServiceList',
          iconInactive:`${serviceListInactive}`,
        iconActive:`${serviceListactive}`},
        { name: 'Billing List',value:'Billing List', path: '/BillingList',
        iconInactive:`${serviceListInactive}`,
      iconActive:`${serviceListactive}`}
          ],
          iconInactive:`${subManagementInactive}`,
          iconActive:`${subManagementactive}`
        }
      
      ];
      setmenuItems(obj)
    }
  }, [roles]);

  
 
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(()=>{
  
    if(localStorage.getItem('SelectedSubmenu') != null){
      setSelectedItem(localStorage.getItem('SelectedSubmenu'))
    }
    else{
      setSelectedItem('Upcoming Events')
    }
    const activeIndex = menuItems.findIndex(
      item => item.subItems && item.subItems.some(subItem => subItem.value === selectedItem)
    );
    setActiveSubmenuIndex(activeIndex);
  }, [selectedItem])
  const handleClick = (name) => {
    
    setSelectedItem(name);
    localStorage.setItem('SelectedSubmenu', name);
    console.log(selectedItem,name,localStorage.getItem('SelectedSubmenu'),"selected menu")

  };
  
  const handleSubmenuClick = (index) => {
    setActiveSubmenuIndex(index === activeSubmenuIndex ? null : index);
    const subItem = menuItems[index];
    console.log(subItem)
    setSelectedItem(subItem.value);
    localStorage.setItem('SelectedSubmenu', subItem.value);
    console.log(selectedItem,subItem.value,localStorage.getItem('SelectedSubmenu'),"selected submenu")
   
  };
  return (
    <div className="side-menu" style={{borderRadius:"12px"}} >
    <ul style={{fontSize:'14px'}} >
      {menuItems.map((item, index) => (
        <li key={index}>
          {item.subItems ? (
            <>
            <Link  to={item.path} onClick={() => handleSubmenuClick(index)} className={localStorage.getItem('SelectedSubmenu') === item.value ? 'activeClass' : 'InactiveClass'} >
            <div className='d-flex align-items-center'>

<img width="25px" className='mr-3'  src={localStorage.getItem('SelectedSubmenu') === item.value ? item.iconActive : item.iconInactive}/>
  {item.name}
  </div>
              
              {}</Link>
              
              <ul style={{display: activeSubmenuIndex === index ? 'block' : 'none'}}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    

                    <Link to={subItem.path}  onClick={() => handleClick(subItem.value)} 
                    className={localStorage.getItem('SelectedSubmenu') === subItem.value ? 'activeClass' : 'InactiveClass'} >          
                    <div className='d-flex  align-items-center'>

                  <img width="25px" className='mr-3' src={localStorage.getItem('SelectedSubmenu') === subItem.value ? subItem.iconActive : subItem.iconInactive} />
                    {subItem.name}
                    </div>
                    </Link>
                  
                    
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link style={{marginTop:'20px'}} to={item.path} onClick={() => handleClick(item.value)}
            
            className={localStorage.getItem('SelectedSubmenu') === item.value ? 'activeClass' : 'InactiveClass'} >
              
              <div className='d-flex  align-items-center'>

<img width="25px" className='mr-2' src={localStorage.getItem('SelectedSubmenu') === item.value ? item.iconActive : item.iconInactive}/>
  {item.name}
  </div></Link>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Sidebar;
