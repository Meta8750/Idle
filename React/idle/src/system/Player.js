import Inventory from '../system/Inventory.js'
import MonDex from '../system/MonDex.js'

class Player {
    constructor() {
        this.inventory = new Inventory();
        this.monDex = new MonDex();
        this.score = 0;
        this.level = 1;
        this.coins = 100;
        this.health = 100;
        this.skills = {
            Mining: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 4 },
            Cutting: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Crafting: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Smithing: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Gambling: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 0 },
        };
        this.activity = '';
        this.activeTab = '';
        this.mons = [];
        this.team = [];
        
    }

    calculateNextLevel(level) {
        return 0.5 * Math.pow(level, 3.5) + 9.5;
    }

    updateSkillExp(skillName, exp) {
        const skill = this.skills[skillName];
        skill.exp += exp;
        
        if (skill.exp >= skill.nextLevel) {
            skill.level += 1;
            skill.exp = 0;
            skill.nextLevel = this.calculateNextLevel(skill.level);
        }

        this.skills[skillName] = skill;
    }

    progress(time) {
        if (this.activity) {
            const totalCD = this.skills[this.activity.job].CD + this.activity.additionalCD;
    
            // Überprüfen, ob die Zeit den Cooldown überschreitet
            if (time >= totalCD) {
                time = 0; // Setze die Zeit zurück
                this.updateSkillExp(this.activity.job, this.activity.exp);
                this.inventory.updateItem(this.activity);
                return true

            }
        }
        
        return false;
    }

    

    isUIDUnique(uid){
        return !this.team.some(mon => mon.uid === uid)
    }


    setCoins(pcoins) {
        this.coins += pcoins;
    }
  
    setActivity(activity){     
        this.activity = activity;
    }
    setActiveTab(tab){
        this.activeTab = tab;
    }
    setMons(id){
        this.mons.push(this.monDex.generateMon(id));
    }

    setTeam(mon) {
        if (this.team.length >= 3) {
            this.team.shift();  
        }
        if (this.isUIDUnique(mon.uid)) {
            this.team.push(mon);  
        }

    }
    
    getSkills(skill) { //return the hole obj
        return this.skills[skill]
    }
    getCurrentSkill() { //return the hole obj, but only the current active one based of the acitvity
        return this.activity ? this.skills[this.activity.job] : "";
    }
    getCurrentTabSkill() {
        return this.activeTab ? this.skills[this.activeTab] : "";
    }
    getActivity() {
        return this.activity
    }
    getCoins() {
        return this.coins;
    }
    getActiveTab() {
        return this.activeTab
    }
    getMons(slot) {
        if (slot >= 0){
            return this.mons[slot];
        }
        return this.mons;
    }
    getTeam(slot) {
        if (slot >= 0){
            return this.team[slot];
        } 
        return this.team;
    }
}

// Klasse exportieren
export default Player;