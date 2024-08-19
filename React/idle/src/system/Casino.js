export default class Casino {
    constructor() {
        this.symbols = ['🍒', '🍋', '🍉', '⭐', '7️⃣'];
        this.slots =['🍒', '🍋', '🍉']

    }
    spin(){
        this.slots = [
            this.symbols[Math.floor(Math.random() * this.symbols.length)],
            this.symbols[Math.floor(Math.random() * this.symbols.length)],
            this.symbols[Math.floor(Math.random() * this.symbols.length)],
          ];
          
        return this.slots;
    }

    checkWinnings(player, bet){
        if (this.slots[0] === this.slots[1] && this.slots[1] === this.slots[2]) {
            
            if (this.slots[1] === '🍒') {
                player.setCoins(bet * 1,5)
            }
            if (this.slots[1] === '🍋') {
                player.setCoins(bet * 2)
            }
            if (this.slots[1] === '⭐') {
                player.setCoins(bet * 10)
            }
            if (this.slots[1] === '7️⃣') {
                player.setCoins(bet * 100)
            }
        
        
        } else {
            console.log('lose')
            player.setCoins(-bet);
            
        }

    }
}