import React, { useEffect, useRef, useState } from 'react'



function UnfurlModal({
    mainDeck,
    handleHoveredCard,
    showUnfurlModal,
    setShowUnfurlModal,
    addCardFromDeck,
    selectCard,
    setFromDeck,
    discardFromDeck
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    const [count, setCount] = useState(1)
    const [showDeckMenu, setShowDeckMenu] = useState(null)

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
                    setCount(1);
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useEffect(() => {
      // Check if filteredCards is empty
        if (mainDeck.length === 0 || count === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
    }, [mainDeck, count]);

    const handleUnfurl = () => {
        setCount(count + 1)
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setShowUnfurlModal(false)
        setCount(1);
        document.body.style.overflow = 'auto';
    };

    const handleShowDeckMenu = (index) => {
        showDeckMenu === index ?
            setShowDeckMenu(null) :
            setShowDeckMenu(index)
    }

    const handleAddCard = (index, unfurling) => {
        addCardFromDeck(index, unfurling)
        setCount(count - 1)
        setShowDeckMenu(null)
    }

    const handleCardFromDeck = (index) => {
        selectCard(index)
        setFromDeck(true)
        setShowDeckMenu(null)
        handleClose()
    }

    const handleDiscardCard = (index) => {
        discardFromDeck(index)
        setCount(count - 1)
        setShowDeckMenu(null)
    }

    return(
        <div>
            {showUnfurlModal ?
                <div className="sim-modal topbar"
                >
                    <div className="outScrollableSim" ref={content}>
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Unfurled Cards</h1>
                        <div>
                        <div className="card-pool-fill-hand">
                            {mainDeck.slice(0, count).map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            <div className={showDeckMenu === index ? "deck-menu3": "hidden2"}>
                                                <div className="card-menu-item"
                                                    onClick={() => handleAddCard(index, true)}
                                                ><p>Add to Hand</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => handleCardFromDeck(index)}
                                                ><p>Add to Play</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => handleDiscardCard(index)}
                                                ><p>Discard</p></div>
                                            </div>
                                            <img
                                                onClick={() => handleShowDeckMenu(index)}
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                className={
                                                    showDeckMenu === index?
                                                    "selected3 builder-card margin-10 pointer glow3"
                                                :
                                                    "builder-card margin-10 pointer"
                                                }
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                        <div className="cd-inner margin-top-20">
                            <button className="margin-bottom-20" onClick={handleUnfurl}>
                                Unfurl
                            </button>
                            <button className="margin-bottom-20" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default UnfurlModal
