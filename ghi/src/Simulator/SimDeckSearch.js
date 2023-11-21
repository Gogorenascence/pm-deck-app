import React, { useEffect, useRef, useState } from 'react'


function SimDeckSearch({
    mainDeck,
    setShowDeckSearchModal,
    drawCard,
    setShowUnfurlModal,
    shuffleMainDeck
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    const [showDeckMenu, setShowDeckMenu] = useState(false)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current &&
                    !ref.current.contains(event.target)&&
                    !event.target.closest(".card-menu-item")&&
                    !event.target.closest(".deck-menu-item")
                ) {
                    handleClose();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }


    useEffect(() => {
        if (mainDeck.length === 0) {
            handleClose();
        }
    }, [mainDeck]);

    const handleDraw = () => {
        drawCard()
        setShowDeckMenu(false)
    }

    const handleOpen = () => {
        setShowDeckSearchModal(true)
        document.body.style.overflow = 'hidden';
    };

    const handleUnfurl = () => {
        setShowUnfurlModal(true)
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setShowDeckSearchModal(false)
        document.body.style.overflow = 'auto';
    };


    return(
        <div>
            <div className={showDeckMenu? "deck-menu": "hidden2"}>
                <div className="card-menu-item"
                    onClick={() => handleDraw()}
                ><p>Draw</p></div>
                <div className="card-menu-item"
                    onClick={() => handleUnfurl()}
                ><p>Unfurl</p></div>
                <div className="card-menu-item"
                    onClick={() => handleOpen()}
                ><p>Search</p></div>
                <div className="card-menu-item"
                    onClick={() => shuffleMainDeck()}
                ><p>Shuffle</p></div>
            </div>
            <div className="matCard"
                onClick={() => setShowDeckMenu(!showDeckMenu)}
            >
                {mainDeck.length > 1 ?
                    <div className="matCardOverlay">
                        <h1>{mainDeck.length}</h1>
                    </div> :null
                }
                <img
                    // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                    className="builder-card5 pointer glow3"
                    // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                    src="https://i.imgur.com/krY25iI.png"
                    alt="deck"/>
            </div>
        </div>
    )
}

export default SimDeckSearch
