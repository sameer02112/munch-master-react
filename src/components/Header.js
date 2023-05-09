import React from 'react';
import MunchMaster from './../resources/MunchMaster.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
      <div className="header">
        <div className="logo-container">
           <img src={MunchMaster} alt={'MunchMasterLogo'}></img>
           <p><b>Sign In | Sign Up</b></p>
           <p>Kondapur, Hyderabad, Telengana 500084 </p>
        </div>
        {/* <div className="signup-container">
          
        </div> */}
        <div className="nav-items">
          <ul>
              <li><Link to ="/"> Home </Link></li>
              <li><Link to = "/about"> About Us </Link></li>
              <li><Link to = "/contact"> Contact </Link></li>
              <li><Link to = "/cart"> <ShoppingCartOutlinedIcon fontSize="medium"/><sub className="cart-superscript-text">1</sub> </Link></li>
          </ul>
        </div>
        
      </div>
    )
  }
  