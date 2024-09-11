export default class ShopItem {
    name: string;
    gold: number;
    cost: number[];
    events: any;
    event: any; 


    constructor(name: string, gold: number, event: number) {
        this.name = name;
        this.gold = gold;
        this.cost = [];
        this.event = event; // Ein Objekt, das Ereignisse speichert
    }

    // Methode zum Auslösen eines Ereignisses
    triggerEvent(player, id: number) {
        const eventData = [
            {
                id: 1,
                buff: player.setCoins(100)
            }
        ]
        eventData.find(event => event.id === id);
    }

    setCost(costArray) {
        this.cost = costArray;
    }
}

