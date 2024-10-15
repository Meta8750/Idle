import React from "react";

function MonStats({mon}){
    return(
        <div>
            <p className="text-white">  Level: {mon.level}/{mon.maxLevel}</p>
            <p className="text-white">  Exp: {mon.exp}/{mon.nextLevel}</p>
            <p></p>
            <p className="text-green-400">  Max Health: {mon.stats.maxHealth}</p>
            <p className="text-orange-500"> AD: {mon.stats.baseAD}</p>
            <p className="text-blue-500">   AP: {mon.stats.baseAP}</p>
            <p className="text-amber-700">  Armour: {mon.stats.baseArmour} / {mon.ADReduction}%</p>
            <p className="text-blue-700">   MR: {mon.stats.baseMR} / {mon.APReduction}%</p>
            <p className="text-white">      MS: {mon.stats.baseMS}</p>
            <p className="text-red-400">    Crit. rate: {mon.stats.baseCritRate * 100}%</p>
            <p className="text-red-600">    Crit. dmg: {mon.stats.baseCritDamage}x</p>
            <p className="text">Armour pen: {mon.stats.armourPen}%</p>
            <p className="text">MR pen: {mon.stats.mrPen}%</p>
            <p className="text">MaxHealthDmg: {mon.stats.maxHealthDmg}%</p>
            <p className="text">CurrentHealthDmg: {mon.stats.currentHealthDmg}%</p>
        </div>
    )
}

export default MonStats;