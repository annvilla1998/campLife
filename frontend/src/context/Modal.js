import ReactDOM from "react-dom"
import { createContext, useEffect, useState } from "react"
import { useRef } from "react"
import { useContext } from "react"
import './Modal.css'


export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const modalRef = useRef()
    const [value, setValue] = useState()

    useEffect(() => {
        setValue(modalRef.current)
    },[])

    return (
    <>
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
        <div ref={modalRef}></div>
    </>
    )
}

export const Modal = ({onClose,children}) => {
    const modalNode  = useContext(ModalContext)
    if(!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}/>
                <div id="modal-content">
                    {children}
                </div>
            </div>,
            modalNode
    )
}