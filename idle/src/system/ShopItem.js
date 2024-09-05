export default class ShopItem {
    constructor(name, gold, events = {}) {
        this.name = name;
        this.gold = gold;
        this.cost = [];
        this.events = events; // Ein Objekt, das Ereignisse speichert
    }

    // Methode zum Auslösen eines Ereignisses
    triggerEvent(player, id) {
        const eventData = [
            {
                id: 1,
                buff: player.setCoins(100)
            }
        ]
        this.event = eventData.find(event => event.id === id);
    }

    // Beispielmethode zum Festlegen der Kosten
    setCost(costArray) {
        this.cost = costArray;
    }
}

