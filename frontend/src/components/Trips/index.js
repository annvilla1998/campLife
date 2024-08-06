import './Trips.css'
import { useState } from 'react'
import { Modal } from '../../context/Modal'
import { CreateSite } from '../Sites/CreateSiteForm'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllTrips, deleteTrip } from '../../store/trips'
import { SiteContainer } from '../Sites/SiteContainer'

export const Trips = () => {
    const [showSiteModal, setShowSiteModal] = useState(false)
    const [showConfirmTripDelete, setShowConfirmTripDelete] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const trips = useSelector(state => state.tripState.trips)
    const tripsArr = Object.values(trips)

    useEffect(() => {
        dispatch(getAllTrips(id))
    }, [dispatch, id])


    const handleDeleteTrip = (trip) => {
        dispatch(deleteTrip(trip)).then(() => {
            dispatch(getAllTrips(id))
        })
        setShowConfirmTripDelete(false);
    }

    return (
        <div className="profile-page">
            <div className="trips-header">
                <div className="host-new-site" onClick={() => setShowSiteModal(true)}>Host New Site</div>
                {showSiteModal && (
                    <Modal onClose={() => setShowSiteModal(false)}>
                        <CreateSite setShowSiteModal={setShowSiteModal} />
                    </Modal>
                )}
                <h2 className="trip-title">Trips</h2>
            </div>
            <div className="trips">
                {(trips.length === 0) ? (
                    <div>You have no trips. Let's get you <NavLink to="/sites">outside!</NavLink></div>
                ) :
                    <>
                        <div className="trips-list-container">
                            {tripsArr.map((trip, i) => {
                                const startDate = new Date(trip.startDate).toDateString();
                                const endDate = new Date(trip.endDate).toDateString();
                                return (
                                    <div className="trip" key={i}>
                                        <SiteContainer site={trip.site}>

                                            {showConfirmTripDelete && (
                                                <Modal onClose={() => setShowConfirmTripDelete(false)}>
                                                    <div>Are you sure you want to remove this from your list of trips?</div>
                                                    <button onClick={() => handleDeleteTrip(trip)}>Yes</button>
                                                    <button onClick={() => setShowConfirmTripDelete(false)}>No</button>
                                                </Modal>
                                            )}
                                            <NavLink className="site-list-link" exact to={`/sites/${trip.site.id}`}>
                                                <div className="site-name">{trip.site?.name}</div>
                                            </NavLink>
                                            <div className="start date"><strong>Arrival Date: </strong>{startDate}</div>
                                            <div className="end date"><strong>Departure: </strong>{endDate}</div>
                                            <i className="fa-regular fa-trash-can" onClick={() => setShowConfirmTripDelete(true)}></i>
                                        </SiteContainer>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}