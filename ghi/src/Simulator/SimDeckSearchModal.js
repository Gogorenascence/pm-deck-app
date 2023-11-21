import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';


function SimDeckSearchModal({
    mainDeck,
    handleHoveredCard,
    showDeckSearchModal,
    setShowDeckSearchModal,
    mainDiscard,
    showDiscardModal,
    setShowDiscardModal
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

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
      // Check if filteredCards is empty
        if (mainDeck.length === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
        if (mainDiscard.length === 0) {
            handleCloseDiscard(); // Call handleClose when filteredCards is empty
        }
    }, [mainDeck, mainDiscard]);

    const handleClose = () => {
        setShowDeckSearchModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleCloseDiscard = () => {
        setShowDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    // const handlePluck = (index) => {
    //     selectPluck(index)
    //     handleClose()
    // }

    return(
        <div>
            {showDiscardModal ?
                <div className="sim-modal topbar"
                >
                    <div className={mainDiscard.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Discard Pile</h1>
                        <div>
                        <div className={mainDiscard.length < 5 ? "card-pool-fill-hand" : "card-pool-fill"}>
                            {mainDiscard.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <img
                                            // onClick={() => handlePluck(index)}
                                            onMouseEnter={() => handleHoveredCard(card)}
                                            className={
                                            //     selectedIndex && selectedIndex === index?
                                            //     "selected builder-card margin-5 pointer glow3"
                                            // :
                                                "builder-card margin-5 pointer"
                                            }
                                            // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                            alt={card.name}/>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                        <div className="cd-inner margin-top-20">
                            <button className={mainDiscard.length > 4 ? "margin-bottom-20" :null} onClick={handleCloseDiscard}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
            {showDeckSearchModal ?
                <div className="sim-modal topbar"
                >
                    <div className={mainDeck.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Main Deck</h1>
                        <div>
                        <div className={mainDeck.length < 5 ? "card-pool-fill-hand" : "card-pool-fill"}>
                            {mainDeck.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <img
                                            // onClick={() => handlePluck(index)}
                                            onMouseEnter={() => handleHoveredCard(card)}
                                            className={
                                            //     selectedIndex && selectedIndex === index?
                                            //     "selected builder-card margin-5 pointer glow3"
                                            // :
                                                "builder-card margin-5 pointer"
                                            }
                                            // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                            alt={card.name}/>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                        <div className="cd-inner margin-top-20">
                            <button className={mainDeck.length > 4 ? "margin-bottom-20" :null} onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default SimDeckSearchModal
