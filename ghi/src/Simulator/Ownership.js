import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';


function Ownership({
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

    const handleOpen = () => {
        setShowOwnershipModal(true)
        console.log("moo")
        document.body.style.overflow = 'hidden';
    };

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
            <div className="matCard"
                onClick={() => handleOpen()}
                style={{marginLeft: "-160px", marginRight: "20px"}}
            >
                {full_ownership.length > 0 ?
                    <div className="matCardOverlay">
                        <h1>{full_ownership.length}</h1>
                    </div> :null
                }
                <img
                    // onClick={() => discardCard(fighter[fighter.length-1], 0, "fighter_slot")}
                    className="builder-card5 pointer glow3"
                    // title={`${ending.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                    src="https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"
                    alt="ownership"/>
            </div>
        </div>
    )
}

export default Ownership
