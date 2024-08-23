
export default class Material{
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
        
        this.img = `/ore/${this.name}.gif`

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

    getImageElement(x, y) {
        const style = {
            width: x || "100px",
            height: y || "100px",
            objectFit: "cover",
        };
    
        return <img src={this.img} alt={this.name} style={style} />;
    }
}