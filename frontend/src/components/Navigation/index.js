import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
import './Navigation.css';
import LoginFormModal from "../LoginFormModal";

export const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    
    
    if(!sessionUser) {
        sessionLinks = (  
        <>
            <LoginFormModal />
            <NavLink to='/signup'>Sign Up</NavLink>
        </>
       )  
    }else{
            sessionLinks = (
                <ProfileButton user={sessionUser} />
            )   
    }
    


    return (
        <div  className="nav-container">
            <ul className="nav-bar">
                <li>
                    <NavLink exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>    
        </div>
    )
}