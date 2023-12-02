import { useState, useEffect, useContext, useRef } from "react";
import { GameStateContext } from "../context/GameStateContext";


function LogChatPanel({
    // hoveredCard
}) {

    const [showPanel, setShowPanel] = useState(false)
    const [newMessage, setNewMessage] = useState(false)

    const {log} = useContext(GameStateContext)
    const [logLength, setLogLength] = useState(log.length)
    const handleShowPanel = () => {
        if (!showPanel) {
            document.body.style.overflow = 'hidden';
            setShowPanel(true)
            setTimeout(() => {
                if (chatWindow.current) {
                    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
                    setNewMessage(false);
                }
            }, 100);
        } else {
            document.body.style.overflow = 'auto';
            setShowPanel(false)
            setNewMessage(false)
        }
    }
    const chatWindow = useRef(null)

    function useChatScroll(ref) {
        useEffect(() => {
            if (ref && ref.current) {
                const { scrollHeight, clientHeight } = ref.current;
                ref.current.scrollTop = scrollHeight - clientHeight
                // ref.current.scrollTop = ref.current.scrollHeight
            }
        },[log])
    }

    useEffect(() => {
        if (log.length > logLength){
            setNewMessage(true)
            setLogLength(log.length)
        }
    },[log])

    useChatScroll(chatWindow)

    return (
        <div className={newMessage && !showPanel? "notify": null}>
            <div className={showPanel? "chatPanel" : "chatPanelClosed"}>
                <div className="vertical_container">
                    {showPanel?
                        <>
                            <div className="scrollableChat" ref={chatWindow}>
                                {log.map((message) => (
                                    <p>{message}</p>
                                ))}
                            </div>
                        </>
                    :null}
                </div>
                {showPanel?
                    <p className="white chat-panel-close pointer" onClick={() => handleShowPanel()}>&#129170;</p>
                :
                    <p className="white chat-panel-open pointer" onClick={() => handleShowPanel()}>&#129168;</p>
                }
            </div>
        </div>
    );
}

export default LogChatPanel;
