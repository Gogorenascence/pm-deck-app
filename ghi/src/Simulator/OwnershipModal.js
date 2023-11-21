import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';


function OwnershipModal({
    ownership,
    selectPluck,
    handleHoveredCard,
    selectedPluckIndex,
    showOwnershipModal,
    setShowOwnershipModal
}) {

    const full_ownership = ownership || [];
    const selectedIndex = selectedPluckIndex || null;

    const content = useRef(null)
    useOutsideAlerter(content)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current &&
                    !ref.current.contains(event.target)&&
                    !event.target.closest(".matCardOverlay")
                    // !event.target.closest(".cd-related-modal-card")
                ) {
                    handleClose();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }


    // useEffect(() => {

    // }, [showModal, main_list, pluck_list]); // Include showModal and card_list as dependencies

    useEffect(() => {
      // Check if filteredCards is empty
        if (ownership.length === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
    }, [ownership]);

    const handleClose = () => {
        setShowOwnershipModal(false)
        document.body.style.overflow = 'auto';
    };

    const handlePluck = (index) => {
        selectPluck(index)
        handleClose()
    }
    // const handleSetClass = (card_class, item) => {
    //     setShowModal({
    //         show: true,
    //         label: item,
    //         card_type: 0,
    //         card_class: card_class
    //     })
    //     document.body.style.overflow = 'hidden';
    // };

    // const handleSetType = async(card_type, item) => {
    //     setShowModal({
    //         show: true,
    //         label: item,
    //         card_type: card_type,
    //         card_class: ""
    //     })
    //     document.body.style.overflow = 'hidden';
    // };


    return(
        <div>
            {showOwnershipModal ?
                <div className="sim-modal topbar"
                >
                    <div className={full_ownership.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Ownership</h1>
                        <div>
                        <div className={full_ownership.length < 5 ? "card-pool-fill-hand" : "card-pool-fill"}>
                            {full_ownership.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <img
                                            onClick={() => handlePluck(index)}
                                            onMouseEnter={() => handleHoveredCard(card)}
                                            className={
                                                selectedIndex && selectedIndex === index?
                                                "selected builder-card margin-5 pointer glow3"
                                            :
                                                "builder-card margin-5 pointer glow3"
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
                            <button className={full_ownership.length > 4 ? "margin-bottom-20" :null} onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default OwnershipModal
