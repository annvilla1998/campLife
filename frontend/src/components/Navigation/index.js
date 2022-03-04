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
            <ProfileButton user={sessionUser}/>
        )
    } else {
       sessionLinks = (  
        <nav>
            <LoginFormModal/>
            <NavLink to='/signup'>Sign Up</NavLink>
        </nav>
       )    
    }

    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </nav>
    )
}