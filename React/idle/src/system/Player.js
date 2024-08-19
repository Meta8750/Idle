import Inventory from '../system/Inventory.js'
import Smithing from '../UI/skills/Smithing.js';
class Player {
    constructor() {
        this.inventory = new Inventory();
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
            if (time >= this.skills[this.activity.job].CD +this.activity.additionalCD) {
              time = -0.1
              this.updateSkillExp(this.activity.job, this.activity.exp)
              this.inventory.updateItem(this.activity)
              
            }
            }
        return time
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
    setMons(mon){
        this.mons.push(mon);
    }

    setTeam(mon) {
        if (this.team.length >= 3) {
            this.team.shift();  
        }
        this.team.push(mon);  
    
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