import React, { useEffect, useRef, useState } from 'react'



function UnfurlModal({
    mainDeck,
    handleHoveredCard,
    showUnfurlModal,
    setShowUnfurlModal
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    const [count, setCount] = useState(1)

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
        if (mainDeck.length === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
        console.log(mainDeck.slice(0,5))
    }, [mainDeck]);

    const handleUnfurl = () => {
        setCount(count + 1)
        document.body.style.overflow = 'auto';
    };

    const handleClose = () => {
        setShowUnfurlModal(false)
        document.body.style.overflow = 'auto';
    };

    // const handlePluck = (index) => {
    //     selectPluck(index)
    //     handleClose()
    // }

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
                            <button onClick={handleUnfurl}>
                                Unfurl
                            </button>
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

export default UnfurlModal
