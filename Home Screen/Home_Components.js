import React, {Component} from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

export const OptionButton = (props) => {
    return (
    
    <Link to={props.redirect} className = "OptionButton" >{props.label}</Link>


    )
};

export const Options = (props) => {
    return (
        <div className = "Options">
            
            <div>
            <OptionButton
            label = 'View Dashboard'
            redirect = '/calculator'
            />
            <OptionButton
            label = 'Update Existing Account'
            redirect = '/update'
            />
            <OptionButton
            label = 'Add New Account'
            redirect = '/newaccount'
            />
            </div>
            
        </div>
    )

};