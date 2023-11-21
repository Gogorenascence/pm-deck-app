import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';


function SimDeckSearchModal({
    mainDeck,
    handleHoveredCard,
    showDeckSearchModal,
    setShowDeckSearchModal
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
    }, [mainDeck]);

    const handleClose = () => {
        setShowDeckSearchModal(false)
        document.body.style.overflow = 'auto';
    };

    // const handlePluck = (index) => {
    //     selectPluck(index)
    //     handleClose()
    // }

    return(
        <div>
            {showDeckSearchModal ?
                <div className="sim-modal topbar"
                >
                    <div className="outScrollableSim2" ref={content}>
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Main Deck</h1>
                        <div>
                        <div className="card-pool-fill">
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
                            <button onClick={handleClose}>
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
