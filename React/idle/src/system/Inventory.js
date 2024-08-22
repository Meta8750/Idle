export default class Inventory {
    constructor() {
        this.inventory = [];
    }

    // Methode zum Hinzufügen oder Aktualisieren eines Items im Inventar
    updateItem(item) {
        const existingItemIndex = this.inventory.findIndex(i => i.name === item.name);
        if (existingItemIndex >= 0) {
            // Existierendes Item aktualisieren
            this.inventory[existingItemIndex] = {
                ...this.inventory[existingItemIndex],
                quantity: this.inventory[existingItemIndex].quantity + item.quantity
            };
        } else {
            // Neues Item hinzufügen
            this.inventory.push({ name: item.name, quantity: item.quantity, value: item.value });
        }
    }
    getInventory(){
        return this.inventory;
    }
}