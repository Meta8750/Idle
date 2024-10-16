import React from "react";

function FightStats({mon}){
    return(
        <div>
            <p>{mon.name}</p>
            <p className="text-white"> {mon.dmgDealt}</p>
            <p className="text-white"> {mon.dmgTaken}</p>
            <p className="text-white"> {mon.healingDone}</p>
            
        </div>
    )
}

export default FightStats;