
export default class Material{
    name:string;
    quantity: number;
    exp: number;
    value: number;
    minLevel: number;
    additionalCD: number;
    job: string;
    mastery: number;
    masteryExp: number;
    masteryNextLevel: number;
    masteryValue: number;
    masteryBarWidth: string;
    img: string;

    constructor(name, quantity, exp,  value , minLevel, additionalCD,masteryValue, job){
        this.name = name;
        this.quantity = quantity;
        this.exp = exp;
        this.value = value;
        this.minLevel = minLevel;
        this.additionalCD = additionalCD;
        this.job = job;

        this.mastery = 0
        this.masteryExp = 0
        this.masteryNextLevel = this.calculateNextLevel()
        this.masteryValue = masteryValue
        this.masteryBarWidth = "0%"
        
        this.img = `/ore/${this.name}.png`;

    }
    calculateNextLevel(){
        return Math.pow(1.11, this.mastery) + 10 * this.mastery * (this.mastery / 2) + 4;
    };

    prozess(){
        this.masteryExp += this.masteryValue
        if  (this.masteryExp >= this.masteryNextLevel){
            this.mastery++
            this.masteryExp = 0
            this.masteryNextLevel = this.calculateNextLevel()
            if (this.mastery == 99){ this.additionalCD = 0  }
        }
        if(this.mastery >= 99){ this.quantity *= 2 }

        this.masteryBarWidth = this.masteryExp / this.masteryNextLevel * 100 + "%" 

    }

}