import React from 'react';
import MunchMaster from './../resources/MunchMaster.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import './../stylesheets/login.css';
import { LogIn } from './LogIn';

export const Header = () => {

  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
  const [isUserLoggedIn , setIsUserLoggedIn] = useState(true);

  const openSignInPage = () => {
    setIsLoginDrawerOpen(true);
  }

  const closeLoginDrawer = () => {
    setIsLoginDrawerOpen(false);
  }


    return (
      <div className="header">
        <div className="logo-container">
            <Link to ="/" style={{color: 'inherit', textDecoration: 'none'}}><img className="logo-container-img" src={MunchMaster} alt={'MunchMasterLogo'}></img></Link>
           <p>Kondapur, Hyderabad, Telengana 500084 </p>
        </div>
        {/* <div className="signup-container">
          
        </div> */}
        <div className="nav-items">
          <ul>
              <li><Link to ="/" style={{color: 'inherit', textDecoration: 'none'}}> Home </Link></li>
              <li><Link to = "/about" style={{color: 'inherit', textDecoration: 'none'}}> About Us </Link></li>
              <li><Link to = "/contact" style={{color: 'inherit', textDecoration: 'none'}}> Contact </Link></li>

              {!isUserLoggedIn && 
                <li onClick={openSignInPage}>Sign In</li>}

              {isUserLoggedIn && 
              <div className="profile-dropdown">
                  <li>Hello, Sameer</li>
                  <ul className="profile-dropdown-content">
                      <li><Link to = "/profile" style={{color: 'inherit', textDecoration: 'none'}}>Profile</Link></li>
                      <li><Link to = "/profile/orders" style={{color: 'inherit', textDecoration: 'none'}}>Orders</Link></li>
                      <li><Link to = "/profile/favourites" style={{color: 'inherit', textDecoration: 'none'}}>Favourites</Link></li>
                      <li>Logout</li>
                  </ul>
                </div>
              }

              <li><Link to = "/cart" style={{color: 'inherit', textDecoration: 'none'}}> <ShoppingCartOutlinedIcon fontSize="medium"/><sub className="cart-superscript-text">1</sub> </Link></li>
          </ul>
        </div>

        <Drawer
          open={isLoginDrawerOpen}
          onClose={closeLoginDrawer}
          anchor="right"
          fullWidth={true}
          className="login-drawer"
          >
            <LogIn/>
        </Drawer>
        
      </div>
    )
  }
  