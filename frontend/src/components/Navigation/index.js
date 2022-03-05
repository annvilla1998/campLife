import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
import './Navigation.css';
import LoginFormModal from "../LoginFormModal";

export const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
       sessionLinks = (  
        <>
            <LoginFormModal />
            <NavLink to='/signup'>Sign Up</NavLink>
        </>
       )    
    }

    return (
        <div  className="nav-container">
            <ul className="nav-bar">
                <li>
                    <NavLink exact to="/">Home</NavLink>
                    <div>
                        {isLoaded && sessionLinks}
                    </div>
                </li>
            </ul>    
        </div>
    )
}