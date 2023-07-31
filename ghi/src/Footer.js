function Footer() {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <div className="white-space">
            <div className="footer">

                <img
                    onClick={() => openInNewTab("https://discord.gg/hVfTNEZG9p")}
                    cursor
                    className="social-icon pointer"
                    src="https://i.imgur.com/TVbM9Jg.png"
                    alt="discord">
                </img>

                <img
                    onClick={() => openInNewTab("https://www.instagram.com/jothplaymaker/")}
                    className="social-icon pointer"
                    src="https://i.imgur.com/WstHvlw.png"
                    alt="instagram">
                </img>

                <img
                    onClick={() => openInNewTab("https://www.twitch.tv/playmakersccg")}
                    className="social-icon pointer"
                    src="https://i.imgur.com/QJUUtwL.png"
                    alt="twitch">
                </img>

                <img
                    onClick={() => openInNewTab("https://www.youtube.com/channel/UCGyH2iJdgKFnm2vEdoZ88Og?ref=jothplaymaker.com")}
                    className="social-icon pointer"
                    src="https://i.imgur.com/Qk0npzS.png"
                    alt="youtube">
                </img>

            </div>
        </div>
    );
}

export default Footer;
