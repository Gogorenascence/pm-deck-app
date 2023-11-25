import React, { useEffect, useRef, useState } from 'react'
import {
    menuSound,
} from "../Sounds/Sounds";


function SimPluckSearch({
    pluckDeck,
    setShowPluckSearchModal,
    drawPluck,
    // setShowUnfurlPluckModal,
    shufflePluckDeck,
    pluckDiscard,
    setShowPluckDiscardModal,
    volume
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    const [showDeckMenu, setShowDeckMenu] = useState(false)
    const [showDiscardMenu, setShowDiscardMenu] = useState(false)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current &&
                    !ref.current.contains(event.target)&&
                    !event.target.closest(".card-menu-item")&&
                    !event.target.closest(".deck-menu-item")&&
                    !event.target.closest(".matCard")&&
                    !event.target.closest(".matCardSelected")
                ) {
                    handleClose();
                    handleCloseDiscard();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useEffect(() => {
        if (pluckDeck.length === 0) {
            handleClose();
        }
        if (pluckDiscard.length === 0) {
            handleCloseDiscard(); // Call handleClose when filteredCards is empty
        }
    }, [pluckDeck, pluckDiscard]);

    const handleOpen = () => {
        setShowPluckSearchModal(true)
        setShowDeckMenu(false)
        menuSound(volume)
        document.body.style.overflow = 'hidden';
    };

    // const handleUnfurl = () => {
    //     setShowUnfurlModal(true)
    //     document.body.style.overflow = 'hidden';
    // };

    const handleClose = () => {
        setShowPluckSearchModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleCloseDiscard = () => {
        setShowPluckDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleOpenDiscard = () => {
        setShowPluckDiscardModal(true)
        setShowDiscardMenu(false)
        menuSound(volume)
        document.body.style.overflow = 'hidden';
    };

    const handleShowDeckMenu = () => {
        setShowDeckMenu(!showDeckMenu)
        menuSound(volume)
    }

    const handleShowDiscardMenu = () => {
        setShowDiscardMenu(!showDiscardMenu)
        menuSound(volume)
    }


    return(
        <div className='flex'>
            <span>
                <div className="matCard margin-left"
                    onClick={() => handleOpenDiscard()}
                >
                    {pluckDiscard.length > 1 ?
                        <div className="matCardOverlay">
                            <h1 className="fontSize60">{pluckDiscard.length}</h1>
                        </div> :null
                    }
                    {pluckDiscard.length > 0 ?
                    <img
                        // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                        className="builder-card5 pointer glow3"
                        src={pluckDiscard[pluckDiscard.length-1].picture_url ?
                            pluckDiscard[pluckDiscard.length-1].picture_url :
                            "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                        alt={pluckDiscard[pluckDiscard.length-1].name}/>
                        :null}
                </div>
            </span>
            <span>
                <div className={showDeckMenu && pluckDeck.length > 0 ? "deck-menu": "hidden2"}>
                    <div className="card-menu-item"
                        onClick={() => drawPluck()}
                    ><p>Draw</p></div>
                    <div className="card-menu-item"
                        // onClick={() => handleUnfurl()}
                    ><p>Unfurl</p></div>
                    <div className="card-menu-item"
                        onClick={() => handleOpen()}
                    ><p>Search</p></div>
                    <div className="card-menu-item"
                        onClick={() => shufflePluckDeck()}
                    ><p>Shuffle</p></div>
                </div>
                <div className="matCard"
                    onClick={() => handleShowDeckMenu()}
                >
                    {pluckDeck.length > 1 ?
                        <div className="matCardOverlay"
                            onDoubleClick={() => drawPluck()}
                        >
                            <h1 className="fontSize60">{pluckDeck.length}</h1>
                        </div> :null
                    }
                    <img
                        className="builder-card5 pointer glow3"
                        src="https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"
                        alt="pluck deck"/>
                </div>
            </span>
        </div>
    )
}

export default SimPluckSearch
