import { useDispatch, useSelector } from "react-redux"

export const Sites = () => {
    const dispatch = useDispatch();
    const site = useSelector(state => {
        return state.sites.map(site => state.sites)
    })
    
    return (
        <>
        
        </>    
    )
}