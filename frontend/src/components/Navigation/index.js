import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
import './Navigation.css';
import LoginFormModal from "../LoginFormModal";

export const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);
  
    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ProfileButton id='profile-button' user={sessionUser} />
        )
    } else {
        sessionLinks = (
        <>
            <LoginFormModal />
            <NavLink id='sign-up' to='/signup'>Sign Up</NavLink>
        </>
       ) 
    }


    return (
        <div  className="nav-container">
            <NavLink id='home-link' to="/">
                <img alt="logo" id='logo' src='https://cdn-icons-png.flaticon.com/512/1020/1020586.png'/>
                    CAMPLIFE</NavLink>
            <div className='nav-menu'>
                <div className="nav-bar">
                        <div id="user-buttons">
                            {isLoaded && sessionLinks}
                        </div>
                        <NavLink id='sites' to="/sites">Sites</NavLink>                        
                </div>    
            </div>
        </div>
    )
}