let xp = 0;
let health = 100;
let gold = 500;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let hasSoldier = false;
let soldierHealth = 100;
let soldierLevel = 1;
let soldierAttackPower = 30;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const soldierHealthText = document.querySelector("#soldierHealth");
const inventoryList = document.querySelector("#inventory");

const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Buy soldier (100 gold)", "Buy health potion (50 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, buySoldier, buyHealthPotion, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Defend", "Run"],
    "button functions": [attack, defend, run],
    text: "You are fighting a monster."
  },
  {
    name: "fight-dragon",
    "button text": ["Attack", "Defend", "Soldier Attack"],
    "button functions": [attackDragon, defendDragon, soldierAttack],
    text: "You are fighting the dragon."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = goTown;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
  updateInventory();
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      updateInventory();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function buySoldier() {
  if (gold >= 100) {
    gold -= 100;
    hasSoldier = true;
    soldierLevel = 1;
    soldierHealth = 100;
    goldText.innerText = gold;
    text.innerText = "You have hired a soldier to assist you in battles.";
  } else {
    text.innerText = "You do not have enough gold to hire a soldier.";
  }
}

function buyHealthPotion() {
  if (gold >= 50) {
    gold -= 50;
    inventory.push("health potion");
    goldText.innerText = gold;
    text.innerText = "You bought a health potion and added it to your inventory.";
    updateInventory();
  } else {
    text.innerText = "You do not have enough gold to buy a health potion.";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    updateInventory();
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFightDragon();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  if (hasSoldier) {
    soldierHealthText.innerText = soldierHealth;
  } else {
    soldierHealthText.innerText = "N/A";
  }
}

function goFightDragon() {
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  if (hasSoldier) {
    soldierHealthText.innerText = soldierHealth;
  } else {
    soldierHealthText.innerText = "N/A";
  }
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (hasSoldier) {
    text.innerText += " Your soldier also attacks the " + monsters[fighting].name + ".";
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1 + soldierAttackPower;
    soldierHealth -= getMonsterAttackValue(monsters[fighting].level);
    soldierHealthText.innerText = soldierHealth;
  } else {
    if (isMonsterHit()) {
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
      text.innerText += " You miss.";
    }
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    updateInventory();
  }
}

function attackDragon() {
  text.innerText = "The dragon attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (hasSoldier) {
    text.innerText += " Your soldier also attacks the dragon.";
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1 + soldierAttackPower;
    soldierHealth -= getMonsterAttackValue(monsters[fighting].level);
    soldierHealthText.innerText = soldierHealth;
  } else {
    if (isMonsterHit()) {
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
      text.innerText += " You miss.";
    }
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    winGame();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    updateInventory();
  }
}

function defendDragon() {
  text.innerText = "The dragon attacks, but you and your soldier defend.";
  if (hasSoldier) {
    soldierHealth -= getMonsterAttackValue(monsters[fighting].level) / 2;
    health -= getMonsterAttackValue(monsters[fighting].level) / 2;
    soldierHealthText.innerText = soldierHealth;
    healthText.innerText = health;
  } else {
    health -= getMonsterAttackValue(monsters[fighting].level);
    healthText.innerText = health;
  }
}

function soldierAttack() {
  text.innerText = "Your soldier attacks the dragon.";
  monsterHealth -= soldierAttackPower;
  soldierHealth -= getMonsterAttackValue(monsters[fighting].level);
  soldierHealthText.innerText = soldierHealth;
  monsterHealthText.innerText = monsterHealth;
  if (monsterHealth <= 0) {
    winGame();
  } else if (soldierHealth <= 0) {
    text.innerText += " Your soldier has fallen.";
    hasSoldier = false;
    soldierHealthText.innerText = "N/A";
  }
}

function defend() {
  text.innerText = "The " + monsters[fighting].name + " attacks, but your soldier blocks the attack.";
  if (hasSoldier) {
    soldierHealth -= getMonsterAttackValue(monsters[fighting].level) / 2;
    soldierHealthText.innerText = soldierHealth;
  } else {
    health -= getMonsterAttackValue(monsters[fighting].level) / 2;
    healthText.innerText = health;
  }
}

function run() {
  text.innerText = "You run away from the " + monsters[fighting].name + ".";
  update(locations[0]);
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[5]);
}

function lose() {
  update(locations[6]);
}

function winGame() {
  update(locations[7]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  hasSoldier = false;
  soldierHealth = 100;
  soldierLevel = 1;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  soldierHealthText.innerText = "N/A";
  updateInventory();
  goTown();
}

function updateInventory() {
  inventoryList.innerHTML = "Inventory: " + inventory.join(", ");
}
