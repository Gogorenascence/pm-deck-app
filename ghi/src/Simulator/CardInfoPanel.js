import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";


function CardInfoPanel({
    hoveredCard
}) {

    const [showPanel, setShowPanel] = useState(false)

    const handleShowPanel = () => {
        setShowPanel(!showPanel)
    }

    const processText = (text) => {
        return text.split("//")
    }

    return (
        <div className="flex">
        <div className={showPanel? "infoPanel" : "infoPanelClosed"}>
            <div className="vertical_container">
                {showPanel?
                    <>
                        {hoveredCard?
                            <span>
                                <div className="cd-inner">
                                    <img
                                        className="panel-card"
                                        // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                        src={hoveredCard.picture_url ? hoveredCard.picture_url : "https://i.imgur.com/krY25iI.png"}
                                        alt={hoveredCard.name}/>
                                </div>
                                <p className="white semi-bold-25 margin-bottom-0 margin-left-13">{hoveredCard.name}</p>
                                <div className="flex-wrap">
                                    <p className="white panel-text-box-text margin-left-13">{hoveredCard.card_class? hoveredCard.card_class:null}</p>
                                    <p className="white panel-text-box-text">{hoveredCard.card_type[0].name}</p>
                                    {hoveredCard.reactions.length > 0?
                                        hoveredCard.reactions.map(reaction =>
                                            <p className="white panel-text-box-text">&#11089;{reaction.name} {reaction.count}</p>
                                        ):null
                                    }
                                    {hoveredCard.card_tags.length > 0?
                                        hoveredCard.card_tags.map(card_tag =>
                                            <p className="white panel-text-box-text">&#11089;{card_tag.name}</p>
                                        ):null
                                    }
                                    {hoveredCard.enthusiasm?
                                        <p className="white panel-text-box-text">&#11089;{hoveredCard.enthusiasm} Enthusiasm</p>
                                    :null}
                                </div>
                                <div className="panel-text-box">
                                    {processText(hoveredCard.effect_text).map(text =>(
                                        <p className="white panel-text-box-text">{text}</p>
                                    ))}
                                    {processText(hoveredCard.second_effect_text).map(text =>(
                                        <p className="white panel-text-box-text">{text}</p>
                                    ))}
                                </div>
                                <p className="white panel-text-box-text margin-left-13">{hoveredCard.series_name.replaceAll("//", " | ")}</p>
                            </span>
                        :null}
                    </>
                :null}
            </div>
            {showPanel?
                <p className="white panel-close pointer" onClick={() => handleShowPanel()}>&#129168;</p>
            :
                <p className="white panel-open pointer" onClick={() => handleShowPanel()}>&#129170;</p>
            }
            </div>
        </div>
    );
}

export default CardInfoPanel;
