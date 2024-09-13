export default class ShopItem {
    name: string;
    gold: number;
    events: any;
    event: any; 
    id: number;
    cost: [string, number][]; 

    constructor(name: string, gold: number, event: number, id: number,cost : [string,number][]) {
        this.name = name;
        this.gold = gold;
        this.cost = cost;
        this.event = event; // Ein Objekt, das Ereignisse speichert
        this.id = id;
    }
   
    triggerEvent(player, id: number) {
        
        // cost[i][0] = name | cost[i][1] = actual cost
        for (let i = 0; i < this.cost.length; i++) {
            let item = player.inventory.findItem(this.cost[i][0]) 
            if (item != undefined) {
            if (item.quantity >= this.cost[i][1]){
                // code here after everything is suitable to buy the Item or what ever
                switch(id){
                    case 1: player.setCoins(100)
                }
                
                
                
                player.inventory.removeItem(item, this.cost[i][1]);
        }}}

        
    }

    setCost(costArray) {
        this.cost = costArray;
    }
}

