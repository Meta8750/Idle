interface Item {
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
}

export default class Inventory {

    inventory: Item[];  // Array for Items
   

    constructor() {
        this.inventory = [];
    }

    // Methode zum Hinzufügen oder Aktualisieren eines Items im Inventar
    updateItem(item: Item): void {
        const existingItemIndex = this.inventory.findIndex(i => i.name === item.name);
        if (existingItemIndex >= 0) {
            // Existierendes Item aktualisieren
            this.inventory[existingItemIndex] = {
                ...this.inventory[existingItemIndex],
                quantity: this.inventory[existingItemIndex].quantity + item.quantity
            };
        } else {
            // Neues Item hinzufügen
            this.inventory.push(item);
        }
    }
     // Methode, um ein bestimmtes Item zu finden
     findItem(itemName: string) {
        console.log(itemName )
        return this.inventory.find(i => i.name === itemName);

    }

   
    getInventory(){
        return this.inventory;
    }
}