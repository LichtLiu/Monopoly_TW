// monopoly.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game board
const board = [
  { name: 'GO', type: 'corner' },
  { name: 'Mediterranean Avenue', type: 'property', price: 60 },
  { name: 'Community Chest', type: 'card' },
  { name: 'Baltic Avenue', type: 'property', price: 60 },
  { name: 'Income Tax', type: 'tax', amount: 200 },
  { name: 'Reading Railroad', type: 'railroad', price: 200 },
  { name: 'Jail', type: 'corner' },
  { name: 'St. Charles Place', type: 'property', price: 140 },
  { name: 'Electric Company', type: 'utility', price: 150 },
  { name: 'States Avenue', type: 'property', price: 140 },
  { name: 'Virginia Avenue', type: 'property', price: 160 },
  { name: 'Pennsylvania Railroad', type: 'railroad', price: 200 },
  { name: 'Free Parking', type: 'corner' },
  { name: 'St. James Place', type: 'property', price: 180 },
  { name: 'Community Chest', type: 'card' },
  { name: 'Tennessee Avenue', type: 'property', price: 180 },
  { name: 'New York Avenue', type: 'property', price: 200 },
  { name: 'Short Line', type: 'railroad', price: 200 },
  { name: 'Go to Jail', type: 'corner' },
  { name: 'Kentucky Avenue', type: 'property', price: 220 },
  { name: 'Chance', type: 'card' },
  { name: 'Indiana Avenue', type: 'property', price: 220 },
  { name: 'Illinois Avenue', type: 'property', price: 240 },
  { name: 'B. & O. Railroad', type: 'railroad', price: 200 }
];

class Player {
  constructor(name) {
    this.name = name;
    this.position = 0;
    this.money = 1500;
    this.properties = [];
  }

  move(spaces) {
    this.position = (this.position + spaces) % board.length;
    console.log(`${this.name} moved to ${board[this.position].name}`);
  }

  buyProperty(property) {
    if (this.money >= property.price) {
      this.money -= property.price;
      this.properties.push(property);
      console.log(`${this.name} bought ${property.name} for $${property.price}`);
    } else {
      console.log(`${this.name} doesn't have enough money to buy ${property.name}`);
    }
  }
}

class Game {
  constructor(playerNames) {
    this.players = playerNames.map(name => new Player(name));
    this.currentPlayerIndex = 0;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  nextTurn() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const roll = this.rollDice();
    console.log(`${currentPlayer.name} rolled a ${roll}`);
    currentPlayer.move(roll);

    const currentSpace = board[currentPlayer.position];
    if (currentSpace.type === 'property' && !currentPlayer.properties.includes(currentSpace)) {
      rl.question(`Do you want to buy ${currentSpace.name} for $${currentSpace.price}? (y/n) `, (answer) => {
        if (answer.toLowerCase() === 'y') {
          currentPlayer.buyProperty(currentSpace);
        }
        this.endTurn();
      });
    } else {
      this.endTurn();
    }
  }

  endTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.displayGameState();
    this.promptNextTurn();
  }

  displayGameState() {
    console.log('\nCurrent game state:');
    this.players.forEach(player => {
      console.log(`${player.name}: Position: ${board[player.position].name}, Money: $${player.money}, Properties: ${player.properties.map(p => p.name).join(', ')}`);
    });
    console.log('');
  }

  promptNextTurn() {
    rl.question('Press Enter for next turn...', () => {
      this.nextTurn();
    });
  }

  start() {
    console.log('Welcome to 6x6 Monopoly!');
    this.displayGameState();
    this.promptNextTurn();
  }
}

// Start the game
const game = new Game(['Player 1', 'Player 2']);
game.start();