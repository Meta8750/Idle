
export default class Attack{
    constructor(name, id, level, type, baseDMG,adScaling, apScaling, manaCost, armorPen, mrPen,lifeSteal,selfHeal,allyHeal,buffs,debuffs){
            this.name = name;
            this.id = id;
            this.level = level;
            this.type = type;
            this.baseDMG = baseDMG;
            this.adScaling = adScaling;
            this.apScaling = apScaling;
            this.manaCost = manaCost;
            this.armorPen = armorPen;
            this.mrPen = mrPen;
            this.lifeSteal = lifeSteal;
            this.selfHeal = selfHeal;
            this.allyHeal = allyHeal;
            this.buffs = buffs;
            this.debuffs = debuffs;

    }
}