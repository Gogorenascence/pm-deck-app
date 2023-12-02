import { useState, useEffect, useContext, useRef } from "react";
import { GameStateContext } from "../context/GameStateContext";


function LogChatPanel({
    // hoveredCard
}) {

    const [showPanel, setShowPanel] = useState(true)
    const [newMessage, setNewMessage] = useState(false)
    const [message, setMessage] = useState("")

    const {log, addToLog} = useContext(GameStateContext)
    const [logLength, setLogLength] = useState(log.length)

    const handleShowPanel = () => {
        if (!showPanel) {
            setShowPanel(true)
            setTimeout(() => {
                if (chatWindow.current) {
                    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
                    setNewMessage(false);
                }
            }, 100);
            document.body.style.overflow = 'hidden';
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

    useChatScroll(chatWindow)

    useEffect(() => {
        if (log.length > logLength){
            setNewMessage(true)
            setLogLength(log.length)
        }
    },[log])

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            addToLog(message)
            setMessage("")
        }
    }


    return (
        <div className={newMessage && !showPanel? "notify": null}>
            <div className={showPanel? "chatPanel" : "chatPanelClosed"}>
                {showPanel?
                    <div className="right">
                        <div className="scrollableChat" ref={chatWindow}>
                            {log.map((message) => (
                                <p>{message}</p>
                            ))}
                        </div>
                            <textarea
                                className="chatTextBox"
                                type="text"
                                value={message}
                                onChange={handleMessageChange}
                                onKeyDown={sendMessage}
                                focus={true}
                            >
                            </textarea>
                    </div>
                :null}
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
