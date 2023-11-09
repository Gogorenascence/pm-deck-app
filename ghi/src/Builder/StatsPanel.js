import React from 'react';


function StatsPanel({
main_list,
pluck_list
}) {

    const stats = {
        fighters: 0,
        auras: 0,
        moves: 0,
        endings: 0,
        anyTypes: 0,
        items: 0,
        events: 0,
        comebacks: 0,
        staunch: 0,
        power: 0,
        unity: 0,
        canny: 0
    }

    for (let card of main_list){
        if (card.card_type[0] === 1001) {
            stats["fighters"] += 1
        }
        else if (card.card_type[0] === 1002) {
            stats["auras"] += 1
        }
        else if (card.card_type[0] === 1003) {
            stats["moves"] += 1
        }
        else if (card.card_type[0] === 1004) {
            stats["endings"] += 1
        }
        else if (card.card_type[0] === 1005) {
            stats["anyTypes"] += 1
        }

        if (card.card_class === "Staunch") {
            stats["staunch"] += 1
        }
        else if (card.card_class === "Power") {
            stats["power"] += 1
        }
        else if (card.card_class === "Unity") {
            stats["unity"] += 1
        }
        else if (card.card_class === "Canny") {
            stats["canny"] += 1
        }
    }

    for (let card of pluck_list){
        if (card.card_type[0] === 1006) {
            stats["items"] += 1
        }
        else if (card.card_type[0] === 1007) {
            stats["events"] += 1
        }
        else if (card.card_type[0] === 1008) {
            stats["comebacks"] += 1
        }
    }

    return(
        <div className="rarities">
            <div className="card-pool-fill2">
                <p>Fighters: {stats.fighters}</p>
                <p>Auras: {stats.auras}</p>
                <p>Moves: {stats.moves}</p>
                <p>Endings: {stats.endings}</p>
                <p>Any Types: {stats.anyTypes}</p>
                <p>Items: {stats.items}</p>
                <p>Events: {stats.events}</p>
                <p>Comebacks: {stats.comebacks}</p>
                <p>Staunch: {stats.staunch}</p>
                <p>Power: {stats.power}</p>
                <p>Unity: {stats.unity}</p>
                <p>Canny: {stats.canny}</p>
            </div>
        </div>
    )
}

export default StatsPanel
