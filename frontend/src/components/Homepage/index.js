import './Homepage.css';
import GoogleMapReact from 'google-map-react';


export const Homepage = () => {

    // const defaultProps = {
    //     center: {
    //       lat: 36,
    //       lng: -119
    //     },
    //     zoom: 7
    //   };

    return (
        <div className='homepage'>
            {/* <h2>Lets Find Your Next Adventure</h2>
            <p>Discover and book tent camping, RV parks, cabins, treehouses, and glamping.</p>
            <div className="where-to-form-container">
                <form>
                    <label>WHERE TO?</label>
                    <input
                    type='search'
                    placeholder='Try Yosemite, Napa...'
                    
                    />
                </form>
                <div style={{height: '500px', width: '500px'}}>
                    <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            yesIWantToUseGoogleMapApiInternals
                    >

                    </GoogleMapReact>
                </div>
            </div> */}
            
        </div>
    )
}