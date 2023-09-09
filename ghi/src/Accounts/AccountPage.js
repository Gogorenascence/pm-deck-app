import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { DeckQueryContext } from "../context/DeckQueryContext";
import { AuthContext } from "../context/AuthContext";
import AccountDecks from "./AccountDecks";
import AccountFavoriteDecks from "./AccountFavoriteDecks";

function AccountPage() {
    const {
        account,
        users,
        getAccountData,
    } = useContext(AuthContext)

    const [option, setOption] = useState("profile")
    const navigate = useNavigate()

    useEffect(() => {
        getAccountData();
        document.title = "Account Info - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, []);

    const handleOption = (item) => {
        setOption(item);
        console.log(option)
    };

    if (!account) {
        setTimeout(function() {
            window.location.href = `${process.env.PUBLIC_URL}/`
        }, 3000);
    }

    return (
        <div>
            {account?
                <div className="white-space">
                    <div className="account-split">
                        <div className="account-info-container">
                            <h1 className="left-h1">Account Page</h1>
                            <h2 className="left">Welcome back, {account.username}!</h2>

                            <div className={option === "profile"? "bigStaunch selected2 pointer" : "bigStaunch pointer half"}
                                onClick={() => handleOption("profile")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>Profile</h4>
                            </div>
                            <div className={option === "security"? "bigPower selected2 pointer" : "bigPower pointer half"}
                                onClick={() => handleOption("security")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>Security</h4>
                            </div>
                            <div className={option === "myDecks"? "bigUnity selected2 pointer" : "bigUnity pointer half"}
                                onClick={() => handleOption("myDecks")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>My Uploaded Decks</h4>
                            </div>
                            <div className={option === "favoriteDecks"? "bigCanny selected2 pointer" : "bigCanny pointer half"}
                                onClick={() => handleOption("favoriteDecks")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>My Favorited Decks</h4>
                            </div>
                            <div className={option === "collection"? "bigNoClass selected2 pointer" : "bigNoClass pointer half"}
                                onClick={() => handleOption("collection")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>My Collection</h4>
                            </div>
                            <div className={option === "wishList"? "bigFaith selected2 pointer" : "bigFaith pointer half"}
                                onClick={() => handleOption("wishList")}
                            >
                                <h4 style={{fontWeight: "600", margin: "12px"}}>My Wishlist</h4>
                            </div>
                        </div>
                        <div className="account-options-container">
                            <AccountDecks option={option}/>
                            <AccountFavoriteDecks option={option}/>
                        </div>
                    </div>
                </div>:
                <div className="textwindow">
                    <h1 className="undercontext">This Feature Is For Users Only</h1>
                    <h3 className="undercontext">Redirecting in 3 Seconds</h3>
                </div>
            }
        </div>
    );
}

export default AccountPage;
