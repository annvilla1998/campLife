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
            <a href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/">
                <i id="businessIcon" className="fa-solid fa-user-tie"></i>
            </a>
            <a id="github" href='https://github.com/annvilla1998/campLife'>
                <img alt="github" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
            </a>
            <div id="used">
                <p>React</p>
                <p>Redux</p>
                <p>Javascript</p>
                <p>Postgres</p>
                <p>CSS</p>
                <p>HTML</p>
            </div>
        </div>
    )
}