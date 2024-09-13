import React from "react";
import { useState } from "react";


function Gambling({player,casino}) {

    const [bet, setBet] = useState(0);
    
    const handleSpin = () => {
        casino.spin()
        casino.checkWinnings(player, bet)
    }
    const handleSliderChange = (e) => {
        setBet(Number(e.target.value));
    };
    
    return (
        <div>
            <p> {casino.slots[0]} {casino.slots[1]} {casino.slots[2]}</p>
            <button onClick={() => handleSpin()}></button>
            <input
                type="range"
                id="sellSlider"
                min="0"
                max={player.getCoins()}
                value={bet}
                onChange={handleSliderChange}
            />
            <p>{bet}</p>
        </div>
    )
}

export default Gambling;