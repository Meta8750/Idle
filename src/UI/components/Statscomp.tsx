import React from "react";

function Statscomp({mon, prev}){
   
    return(
        <div>
            <p></p>
            <p className="text-green-400">  Max Health: {mon.stats.maxHealth} + {mon.stats.maxHealth - prev.stats.maxHealth}</p>
            <p className="text-orange-500"> AD: {mon.stats.baseAD} + {mon.stats.baseAD- prev.stats.baseAD}</p>
            <p className="text-blue-500">   AP: {mon.stats.baseAP}</p>
            <p className="text-amber-700">  Armour: {mon.stats.baseArmour} / {mon.ADReduction}%</p>
            <p className="text-blue-700">   MR: {mon.stats.baseMR} / {mon.APReduction}%</p>
            <p className="text-white">      MS: {mon.stats.baseMS}</p>
            <p className="text-red-400">    Crit. rate: {mon.stats.baseCritRate * 100}%</p>
            <p className="text-red-600">    Crit. dmg: {mon.stats.baseCritDamage}x</p>
            <p className="text">              Armour pen: {mon.stats.armourPen}%</p>
            <p className="text">              MR pen: {mon.stats.mrPen}%</p>
            <p className="text">              MaxHealthDmg: {mon.stats.maxHealthDmg}%</p>
            <p className="text">              CurrentHealthDmg: {mon.stats.currentHealthDmg}%</p>
        </div>
    )
}


export default Statscomp;