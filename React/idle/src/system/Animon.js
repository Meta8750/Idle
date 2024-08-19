
export default class Animon {
    constructor(name, id, level, rarity, type, maxhealth, ad, ap, armor, mr, ges) {
        this.name = name;
        this.level = level
        this.maxLevel = 0
        this.rarity = rarity
        this.type = type
        this.maxhealth = maxhealth
        this.health = this.maxhealth
        this.ad = ad
        this.ap = ap
        this.armor = armor
        this.mr = mr
        this.ges = ges
        this.attacks = {}
        this.exp = 0
        this.nextLevel = 100
        this.id = id
        this.img = `/animon/${this.id}.gif`
        

    }
    getImageElement(x,y) {
        if (x){
            const style = {
                width: x,
                height: y,
                objectFit: "cover",
            };
        } else {
            const style = {
                width: "100px",
                height: "100px",
                objectFit: "cover",
            };
        }
        return <img src={this.img} alt={this.name} style={style} />;
    }
   
}
