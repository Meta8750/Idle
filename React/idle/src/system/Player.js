class Player {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.coins = 0;
        this.health = 100;
        this.skills = {
            Mining: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 4 },
            Cutting: { level: 1, maxLevel: 100, exp: 0, nextLevel: this.calculateNextLevel(1), CD: 2 },
        };
        this.activity ='';
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
            if (time >= this.skills[this.activity.job].CD) {
              time = -0.1
              this.updateSkillExp(this.activity.job, this.activity.exp)
              //activity.mastery += 1
              //updateItem(activity)
              
            }
            }
        return time
    }
  
    setActivity(activity){     
        this.activity = activity;
    }
    getSkills(skill) {
        return this.skills[skill]
    }
    getCurrentSkill() {
        
        return this.activity ? this.skills[this.activity.job] : "";
    }
    getActivity() {
        return this.activity
       
    }
    getScore() {
        return this.score;
    }

    getCoins() {
        return this.coins;
    }
}

// Klasse exportieren
export default Player;