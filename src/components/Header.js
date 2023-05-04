import React from 'react';
import MunchMaster from './../resources/MunchMaster.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Header = () => {
    return (
      <div className="header">
        <div className="logo-container">
           <img src={MunchMaster} alt={'MunchMasterLogo'}></img>
        </div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li><ShoppingCartOutlinedIcon fontSize="medium"/><sub className="cart-superscript-text">1</sub></li>
          </ul>
        </div>
        
      </div>
    )
  }
  