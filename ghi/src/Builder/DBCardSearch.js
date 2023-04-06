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
        <div style={{marginLeft: "45px"}}>
            <h2 className="left">Search for cards</h2>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Card Name Contains..." >
                {/* value={query}
                onChange={(event)=> setQuery(event.target.value)} */}
            </input>
            <br/>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Card Text Contains..." >

            </input>
            <br/>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Card Number">
            </input>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Hero ID">
            </input>
            <br/>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Series">
            </input>
            <input
                className="left dcbsearch-medium"
                type="text"
                placeholder=" Illustrator">
            </input>
            <br/>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Type">
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
                className="left dcbsearch-small"
                type="text"
                placeholder=" Class">
                <option value="class">Class</option>
                <option value="staunch">Staunch</option>
                <option value="power">Power</option>
                <option value="unity">Unity</option>
                <option value="canny">Canny</option>
            </select>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Extra Effect">
                <option value="extra_effect">Extra Effect</option>
                <option value="trigger">Trigger</option>
                <option value="limited">Limited</option>
                <option value="critical">Critical</option>
            </select>
            <br/>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Reaction">
                <option value="reaction">Reaction</option>
                <option value="block">Block</option>
                <option value="counter">Counter</option>
                <option value="endure">Endure</option>
                <option value="redirect">Redirect</option>
            </select>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Tag">
                <option value="tag">Tag</option>
                <option value="5_hp">5 HP</option>
                <option value="focus">Focus</option>
                <option value="auto">Auto</option>
                <option value="stay">Stay</option>
                <option value="max_1">Max</option>
            </select>
            <select
                className="left dcbsearch-small"
                type="text"
                placeholder=" Sorted By">
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
