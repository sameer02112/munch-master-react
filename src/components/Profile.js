import { Outlet } from 'react-router-dom';
import './../stylesheets/userData.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


export const Profile = () => {

    const menuOptions = [{
        page: 'Orders',
        url: 'orders'
    },
    {
        page: 'Upgrade',
        url: 'upgrade'
    },
    {
        page: 'Favourites',
        url: 'favourites'
    },
    {
        page: 'Payments',
        url: 'payments'
    },
    {
        page: 'Addresses',
        url: 'addresses'
    },
    {
        page: 'Settings',
        url: 'settings'
    }];

    const scroller = () => {
        console.log('scrolling')
    }


    return (
        <div className="user-profile-parent-container" onScroll={scroller}>
            <div className="user-profile-container">
                <div className="user-basic-info-container">
                    <h1>Sameer Agrawal</h1>
                    <p>9597333102 . sameer02112@gmail.com</p>
                </div>
                <Button className="edit-profile-btn" variant="text">Edit Profile</Button>
            </div>
            <div className="user-profile-tabs-container">
                <div className="user-profile-menu-tab">
                    {menuOptions.map(ele=>{
                        return(
                            <ul>
                                <li><Link to = {`/profile/${ele.url}`} style={{color: 'inherit', textDecoration: 'none'}}>{ele.page}</Link></li>
                            </ul>
                        )
                    })}
                </div>
                <div className="user-profile-menu-screen">
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export const Upgrade = () => {
    return (
        <div>
            <h1>Upgrade</h1>
        </div>
    )
}

export const Payments = () => {
    return (
        <div>
            <h1>Payments</h1>
        </div>
    )
}

export const Addresses = () => {
    return (
        <div>
            <h1>Addresses</h1>
        </div>
    )
}

export const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

