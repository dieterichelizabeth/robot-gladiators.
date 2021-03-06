/* GAME FUNCTIONS */

// Function generating random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// Fight or Skip Function
var fightOrSkip = function () {
  // Ask player if they'd like to fight or run
  var promptFight = window.prompt(
    'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
  );

  // Validate prompt answer
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    // Use return to call it again and stop the rest of this function from running
    return fightOrSkip();
  }

  // Convert promptFight to all lowercase so we can check with less options
  promptFight = promptFight.toLowerCase();

  // If player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // Confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // If yes (true)- Leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // Subtract money from playerMoney for skipping but don't let them go into the negative
      playerInfo.playerMoney = playerInfo.money - 10;
      // Stop while() loop using break; and enter next fight

      // return true if player wants to leave
      return true;
    }
  }
  return false;
};

// Fight Function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function (enemy) {
  // Keep track of who goes first
  var isPlayerTurn = true;

  // Randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // Ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // If true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // Remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // Award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // Leave while() loop since enemy is dead
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      // Player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // Remove enemy's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // Leave while() loop if player is dead
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    }
    // Switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// Start Game Function
var startGame = function () {
  // Reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // Check player stats
    console.log(playerInfo);

    // If player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // Let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // Pick new enemy to fight based on the index of the enemy.name array
      var pickedEnemyObj = enemyInfo[i];

      // Set enemy health for the picked enemy
      pickedEnemyObj.health = randomNumber(40, 60);

      // Pass the picked enemy.name variable's value into the fight function, where it will assume the value of the enemy parameter
      fight(pickedEnemyObj);

      // If player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // Ask if player wants to use the store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );

        // If yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }

    // if player isn't alive, stop the game
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
  endGame();
};

// Function to end the entire game
var endGame = function () {
  window.alert("The game has now ended. Let's see how you did!");

  // Check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // If player has more money than the high score, player has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(
      playerInfo.name + " now has the high score of " + playerInfo.money + "!"
    );
  } else {
    alert(
      playerInfo.name +
        " did not beat the high score of " +
        highScore +
        ". Maybe next time!"
    );
  }

  // Ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  // If yes- start game...else- say goodbye
  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// Go to shop between battles function
var shop = function () {
  // Ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  // Convert answer from prompt to an actual number
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // Use switch case to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert(
        "You did not pick a valid option. Please enter 1, 2, or 3 based on the menu. Try again."
      );
      shop();
      break;
  }
};

// Set Player Name
var getPlayerName = function () {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

// Log player name/stats
var playerInfo = {
  // Properties
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  // Refill Health Method
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      // increase health and decrease money
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  // Upgrade Attack Method
  upgradeAttack: function () {
    if (playerInfo.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");

      // increase attack and decrease money
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
};

// Enemy Information
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

/* RUN GAME ON PAGE LOAD */
startGame();
