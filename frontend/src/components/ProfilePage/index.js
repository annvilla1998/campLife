import './profilePage.css'
import { useState } from 'react'
import { Modal } from '../../context/Modal'
import { CreateSite } from '../Sites/CreateSiteForm'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllTrips } from '../../store/trips'

export const ProfilePage = () => {
    const [showSiteModal, setShowSiteModal] = useState(false)
    const dispatch = useDispatch()
    const trips = useSelector(state => state.tripState.trips)    
    const tripsArr = Object.values(trips)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllTrips(id))
    },[dispatch, id])

    return (
        <div className="profile-page">
            <div className="host-new-site" onClick={() => setShowSiteModal(true)}>Host New Site</div>
            {showSiteModal && (
                <Modal onClose={() => setShowSiteModal(false)}>
                    <CreateSite setShowSiteModal={setShowSiteModal}/>
                </Modal>
            )}
            <div className="trips">
                <h2>Trips</h2>
                {(trips.length === 0) ? (
                    <div>You have no trips. Let's get you <NavLink to="/sites">outside!</NavLink></div>
                ):
                    <div className="table">
                            <div className="header"></div>
                            <div className="header">Campsite Name</div>
                            <div className="header">Start Date</div>
                            <div className="header">End Date</div>
                        {tripsArr.map(trip => (
                            <>
                                <img key={trip.id} src={trip.Site.images[0]}></img>
                                <div className="name">{trip.Site.name}</div>
                                <div className="start date">{trip.startDate}</div>
                                <div className="end date">{trip.endDate}</div>
                            </>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}