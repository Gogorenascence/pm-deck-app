import React, { useState, useEffect, useRef } from 'react'


function PlayAreaModal({
    // ownership,
    // selectPluck,
    handleHoveredCard,
    // selectedPluckIndex,
    showPlayAreaModal,
    setShowPlayAreaModal,
    // discardPluckFromOwnership,
    // returnPluckToDeck,
    // showPluckMenu,
    // setShowPluckMenu
}) {

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
        if (showPlayAreaModal.zone?.length === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
    }, [showPlayAreaModal.zone]);

    // const handleShowCardMenu = (index) => {
    //     showPluckMenu === index?
    //     setShowPluckMenu(null):
    //         setShowPluckMenu(index)
    // }

    const handleClose = () => {
        setShowPlayAreaModal({name: "", zone: null})
        // setShowPluckMenu(null)
        document.body.style.overflow = 'auto';
    };

    // const handlePluck = (index) => {
    //     selectPluck(index)
    //     handleClose()
    // }

    return(
        <div>
            {showPlayAreaModal.zone ?
                <div className="sim-modal2 topbar"
                >
                    <div className={showPlayAreaModal.zone.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h1 className="centered-h1">{showPlayAreaModal.name}</h1>
                        <div>
                        <div className={showPlayAreaModal.zone.length < 5 ? "card-pool-fill-hand" : "card-pool-fill"}>
                            {showPlayAreaModal.zone.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            {/* <div className={showCardMenu === index ? "deck-menu5Items": "hidden2"}>
                                                <div className="card-menu-item"
                                                    onClick={() => handlePluck(index)}
                                                ><p>{selectedPluckIndex === index? "Cancel" : "Play"}</p></div>
                                                <div className="card-menu-item"><p>Place</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => discardPluckFromOwnership(index)}
                                                ><p>Discard</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => returnPluckToDeck(index, "top")}
                                                ><p>Decktop</p></div>
                                                <div className="card-menu-item"
                                                    onClick={() => returnPluckToDeck(index, "bottom")}
                                                ><p>Deckbottom</p></div>
                                            </div> */}
                                            <img
                                                // onClick={() => handleShowCardMenu(index)}
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                // onDoubleClick={() => handlePluck(index)}
                                                className={
                                                    // showPluckMenu === index || selectedPluckIndex === index?
                                                    "selected3 builder-card margin-10 pointer glow3"
                                                // :
                                                    // "builder-card margin-10 pointer glow3"
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
                            <button className={showPlayAreaModal.zone.length > 4 ? "margin-bottom-20" :null} onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default PlayAreaModal
