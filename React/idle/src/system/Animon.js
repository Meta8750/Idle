import { v4 as uuidv4 } from 'uuid';
export default class Animon {
    constructor(name, id, level, rarity, type, role,maxhealth, ad, ap, armor, mr, ges) {
        this.name = name;
        this.level = level
        this.maxLevel = 0
        this.rarity = rarity
        this.type = type
        this.role = role
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
        this.uid = uuidv4()
        

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
