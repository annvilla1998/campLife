import './profilePage.css'
import { useState } from 'react'
import { Modal } from '../../context/Modal'
import { CreateSite } from '../Sites/CreateSiteForm'

export const ProfilePage = () => {
    const [showSiteModal, setShowSiteModal] = useState(false)

    return (
        <div className="profile-page">
            <div className="host-new-site" onClick={() => setShowSiteModal(true)}>Host New Site</div>
            {showSiteModal && (
                <Modal onClose={() => setShowSiteModal(false)}>
                    <CreateSite setShowSiteModal={setShowSiteModal}/>
                </Modal>
            )}
        </div>
    )
}