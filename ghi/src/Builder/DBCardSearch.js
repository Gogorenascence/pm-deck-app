import {
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

function DBCardSearch() {

    return (
        <div>
            <h2 className="left">Search for cards</h2>
            <input
                className="left"
                type="text"
                placeholder=" Card Name Contains..."
                style={{width: "740px", height: "37px"}}>
                {/* value={query}
                onChange={(event)=> setQuery(event.target.value)} */}
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Card Text Contains..."
                style={{width: "740px", height: "37px"}}>
            </input>
            <br/>
            <input
                className="left"
                type="text"
                placeholder=" Card Number"
                style={{width: "177px", height: "37px"}}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Hero ID"
                style={{width: "177px", height: "37px"}}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Series"
                style={{width: "177px", height: "37px"}}>
            </input>
            <input
                className="left"
                type="text"
                placeholder=" Illustrator"
                style={{width: "177px", height: "37px"}}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder=" Type"
                style={{width: "115px", height: "37px"}}>
                <option value="type">Type</option>
                <option value="fighter">Fighter</option>
                <option value="aura">Aura</option>
                <option value="move">Move</option>
                <option value="ending">Ending</option>
                <option value="any_type">Any Type</option>
                <option value="item">Item</option>
                <option value="event">Event</option>
                <option value="comeback">Comeback</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Class"
                style={{width: "115px", height: "37px"}}>
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Extra Effect"
                style={{width: "115px", height: "37px"}}>
                <option value="extra_effect">Extra Effect</option>
                <option value="trigger">Trigger</option>
                <option value="limited">Limited</option>
                <option value="critical">Critical</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Reaction"
                style={{width: "115px", height: "37px"}}>
                <option value="reaction">Reaction</option>
                <option value="block">Block</option>
                <option value="counter">Counter</option>
                <option value="endure">Endure</option>
                <option value="redirect">Redirect</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Tag"
                style={{width: "115px", height: "37px"}}>
                <option value="tag">Tag</option>
                <option value="5_hp">5 HP</option>
                <option value="focus">Focus</option>
                <option value="auto">Auto</option>
                <option value="stay">Stay</option>
                <option value="max_1">Max</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder=" Sorted By"
                style={{width: "115px", height: "37px"}}>
                <option value="sorted_by">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most_views">Popular</option>
                <option value="card_number">Card Number</option>
            </select>
            <br/>
            <Button className="left" variant="dark">Reset Filters</Button>
            <br/>
            </div>
    );
}

export default DBCardSearch;
