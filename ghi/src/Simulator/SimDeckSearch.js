import React, { useEffect, useRef, useState } from 'react'


function SimDeckSearch({
    mainDeck,
    setShowDeckSearchModal,
    drawCard,
    setShowUnfurlModal,
    shuffleMainDeck,
    mainDiscard,
    setShowDiscardModal
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
                    !event.target.closest(".deck-menu-item")
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
        if (mainDeck.length === 0) {
            handleClose();
        }
        if (mainDiscard.length === 0) {
            handleCloseDiscard(); // Call handleClose when filteredCards is empty
        }
    }, [mainDeck, mainDiscard]);

    const handleOpen = () => {
        setShowDeckSearchModal(true)
        setShowDeckMenu(false)
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

    const handleCloseDiscard = () => {
        setShowDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleOpenDiscard = () => {
        setShowDiscardModal(true)
        setShowDiscardMenu(false)
        document.body.style.overflow = 'hidden';
    };


    return(
        <div className='flex'>
            <span>
                <div className={showDiscardMenu? "discard-menu margin-left": "hidden2"}>
                    <div className="card-menu-item"
                        onClick={() => handleOpenDiscard()}
                    ><p>Search</p></div>
                </div>
                <div className="matCard margin-left"
                    onClick={() => setShowDiscardMenu(!showDiscardMenu)}
                >
                    {mainDiscard.length > 1 ?
                        <div className="matCardOverlay">
                            <h1>{mainDiscard.length}</h1>
                        </div> :null
                    }
                    {mainDiscard.length > 0 ?
                    <img
                        // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                        className="builder-card5 pointer glow3"
                        // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                        src={mainDiscard[mainDiscard.length-1].picture_url ? mainDiscard[mainDiscard.length-1].picture_url : "https://i.imgur.com/krY25iI.png"}
                        alt={mainDiscard[mainDiscard.length-1].name}/>
                        :null}
                </div>
            </span>
            <span>
                <div className={showDeckMenu? "deck-menu": "hidden2"}>
                    <div className="card-menu-item"
                        onClick={() => drawCard()}
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
            </span>
        </div>
    )
}

export default SimDeckSearch
