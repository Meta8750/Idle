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
    // Methode zum Auslösen eines Ereignisses
    triggerEvent(player, id: number) {
        const eventData = [
            {
                id: 1,
                buff: player.setCoins(100)
            }
        ]
        
        let item = player.inventory.findItem(this.cost[0][0])
        
        if (item != undefined) {
        for (let i = 0; i < this.cost.length; i++) {
            
            if (item.quantity >= this.cost[i][1]){
                eventData.find(event => event.id === id);
        }}}

        
    }

    setCost(costArray) {
        this.cost = costArray;
    }
}

