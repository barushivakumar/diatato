import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  border-radius:40px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  margin-bottom:10px;
  
  &:hover {
    background: #40485d;
    color:white;
    text-decoration:none;
    cursor: pointer;
    border-radius:40px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 18px;
  border-radius:40px;
margin-bottom:5px;

  &:hover {
    background: #40485d;
    cursor: pointer;
    border-radius:40px;
  }
`;

const SubMenu = ({ item,sidebar }) => {
  const [subnav, setSubnav] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  
  useEffect(()=>{
    if(localStorage.getItem('SelectedSubmenu') != null){
      setSelectedItem(localStorage.getItem('SelectedSubmenu'))
    }
    else{
      setSelectedItem('Upcoming Events')
    }
    
  }, [selectedItem])
  const showSubnav = () => setSubnav(!subnav);
  const handleClick = (item) => {
    setSelectedItem(item.title);
    localStorage.setItem('SelectedSubmenu', item.title);
    console.log(item.title,item.subNav,"selected submenu")

    if(item.subNav){
      setSubnav(!subnav)
    }
    

  };
  return (
    <div>
  
      <SidebarLink to={item.path} onClick={() => handleClick(item)} style={{background: selectedItem === item.title ? '#40485d' : 'normal',color: selectedItem === item.title ? 'white' : 'black'}} >
        <div>
          {item.icon}
          {
            sidebar &&
                    <SidebarLabel>{item.title}</SidebarLabel>
          }
          
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      
      {subnav === true &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              {
            sidebar &&
                    <SidebarLabel onClick={() => handleClick(item)} style={{background: selectedItem === item.title ? '#40485d' : 'normal',color: selectedItem === item.title ? 'white' : 'black'}}>{item.title}</SidebarLabel>
          }
              
            </DropdownLink>
          );
        })}
    </div>
  );
};

export default SubMenu;
