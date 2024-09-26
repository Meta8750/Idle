import Inventory from './Inventory.ts'
import dex from './dex/generator.ts'

type Skill = {
    level: number,
    maxLevel: number,
    exp: number,
    nextLevel: number,
    CD: number,
}

type Skills = {
    Mining: Skill,
    Cutting: Skill,
    Crafting: Skill,
    Smithing: Skill,
    Gambling: Skill,
}

class Player {
    inventory: Inventory;
    dex: dex;
    score: number;
    level: number;
    coins: number;
    health: number;
    skills: Skills;
    activity: any;
    activeTab: string;
    mons: any[];
    team: any[];
    
    constructor() {
        
        this.inventory = new Inventory();
        this.dex = new dex();
        this.score = 0;
        this.level = 1;
        this.coins = 100;
        this.health = 100;
        // exp muliplicatoren
        // global stats buffs
        this.skills = {
            Mining: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Cutting: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Crafting: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Smithing: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
            Gambling: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 0 },
        };
        this.activity = null;
        this.activeTab = '';
        this.mons = [];
        this.team = [];
        
    }

    calculateNextLevel(level: number) {
        return 0.5 * Math.pow(level, 3.5) + 9.5;
    }

    updateSkillExp(skillName:string, exp:number) {
        const skill = this.skills[skillName];
        skill.exp += exp;
        
        if (skill.exp >= skill.nextLevel) {
            skill.level += 1;
            skill.exp = 0;
            skill.nextLevel = this.calculateNextLevel(skill.level);
        }

        this.skills[skillName] = skill;
    }

    progress(time: number) {
        if (this.activity) {
            const totalCD = this.skills[this.activity.job].CD + this.activity.additionalCD;
           
            // Überprüfen, ob die Zeit den Cooldown überschreitet
            if (time >= totalCD) {
                time = 0; // Setze die Zeit zurück
                this.updateSkillExp(this.activity.job, this.activity.exp);
                this.inventory.updateItem(this.activity);
                this.activity.prozess()
                
                return true
               
            }
        }
        
        return false;
    }
    
    isUIDUnique(uid: number){
        return !this.team.some(mon => mon.uid === uid)
    }

    setCoins(pcoins: number) {
        this.coins += pcoins;
    }
  
    setActivity(activity: any){     
        this.activity = activity;
    }
    setActiveTab(tab: string){
        this.activeTab = tab;
    }
    setMons(id: number){
        this.mons.push(this.dex.generate(id));
    }

    setTeam(mon: any) {
        if (this.team.length >= 3) {
            this.team.shift();  
        }
        if (this.isUIDUnique(mon.uid)) {
            this.team.push(mon);  
        }

    }
    removeItemFromMon(slotType: string, uid: number): void {
        // Iteriere durch die Mons-Sammlung
        for (const mon of this.mons) {
            if (mon.equipment[slotType] === null) continue
              
                
                if (mon.equipment[slotType].uid === uid) {
                    // Item gefunden, entferne es
                    mon.equipItem(mon.equipment[slotType])
                    mon.equipment[slotType] = null;
                    return;
                
            }
        }
      
    }
    getSkills(skill: any) { //return the hole obj
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
    getMons(slot: number) {
        if (slot >= 0){
            return this.mons[slot];
        }
        return this.mons;
    }
    getTeam(slot: number) {
        if (slot >= 0){
            return this.team[slot];
        } 
        return this.team;
    }
}

// Klasse exportieren
export default Player;