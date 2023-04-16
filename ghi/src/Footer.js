import { NavLink} from 'react-router-dom';

function Footer() {
    return (
        <div className="white-space">
            <div className="footer">
                <NavLink to="https://discord.gg/hVfTNEZG9p">
                    <img
                        className="social-icon"
                        src="https://i.imgur.com/TVbM9Jg.png"
                        alt="discord">
                    </img>
                </NavLink>
                <NavLink to="https://discord.gg/hVfTNEZG9p">
                    <img
                        className="social-icon"
                        src="https://i.imgur.com/WstHvlw.png"
                        alt="instagram">
                    </img>
                </NavLink>
                <NavLink to="https://discord.gg/hVfTNEZG9p">
                    <img
                        className="social-icon"
                        src="https://i.imgur.com/h72khiX.png"
                        alt="twitter">
                    </img>
                </NavLink>
                <NavLink to="https://discord.gg/hVfTNEZG9p">
                    <img
                        className="social-icon"
                        src="https://i.imgur.com/Qk0npzS.png"
                        alt="youtube">
                    </img>
                </NavLink>
            </div>
        </div>
    );
}

export default Footer;