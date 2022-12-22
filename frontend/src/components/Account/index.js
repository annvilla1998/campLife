import { useSelector } from 'react-redux';
import './Account.css';

export const About = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div className="account-page">
            <div className="account-background">
                <div className='account-info-container'>
                    <div className='account-photo'>
                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'></img>
                    </div>
                    <hr/>
                    <div className='introduction'>
                        <p className="account-username">Hi, I'm {user.username}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}