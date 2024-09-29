import React from "react";

function StatusEffect({mon}){
    return(
        <div>
            {mon.status ? (Object.entries(mon.status).map(([statu, duration]) => {
            return <div>
                        <img src={`/icons/status/${statu}.png`} className="w-11 h-11"></img><p> {duration}</p>
                    </div>
            })) : (<p></p>)}
        </div>
    )
}

export default StatusEffect;