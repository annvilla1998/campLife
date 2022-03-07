import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from '../../store/session'


export const ProfileButton = ({user}) => {
    const dispatch = useDispatch()
    const [dropdown, showDropdown] = useState(false)

    const showMenu = () => {
        if(dropdown) return;
        showDropdown(true)
    }

    useEffect(() => {
        if(!dropdown) return;
        const closeMenu = () => {
            showDropdown(false)
        }
        document.addEventListener('click', closeMenu)
      
        return () => document.removeEventListener('click', closeMenu)
    },[dropdown])

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }

    return (
        <>
        <button onClick={showMenu}>
            <i class="fa-solid fa-user"></i>
        </button>
        {dropdown && (
            <ul className="profile-dropdown">
                <li>{user.username}</li>    
                <li>{user.email}</li>    
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>    
            </ul>
        )}
        </>
    )
}