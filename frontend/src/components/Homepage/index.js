import { Link } from 'react-router-dom'
import './Homepage.css'


export const Homepage = () => {
    return (
        <div className='homepage'>
            <h2>Welcome to CampLife!</h2>
            <p>Click "Sites" to begin</p>
            <a href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/">
                <i id="businessIcon" class="fa-solid fa-user-tie"></i>
            </a>
            <a id="github" href='https://github.com/annvilla1998/campLife'>
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
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