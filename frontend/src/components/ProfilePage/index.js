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
    const trips = useSelector(state => state.tripState)
    const tripsArr = Object.values(trips)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllTrips(id))
    },[dispatch])

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
                    <table>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                        {tripsArr.map(trip => (
                        <tr key={trip.id}>
                            <td>{trip.startDate}</td>
                            <td>{trip.endDate}</td>
                        </tr>
                        ))}
                    </table>
                }
            </div>
        </div>
    )
}