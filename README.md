# Robot Gladiators

This module project uses JavaScript to build a browser-based video game using window alerts for a mock hackathon called the "Con Solo Game Jam".
The hackathon rules are as follows:

- The game must run in a web browser 💻
- The game must use the provided index.html file. Only the title element may be changed.
- No CSS Allowed 🚫
- All game code must be contained in the game.js JavaScript file 👾

[Click here to Play the Game!](https://dieterichelizabeth.github.io/robot-gladiators./)

  <img width="1135" alt="Screen Shot 2022-04-12 at 4 05 45 PM" src="https://user-images.githubusercontent.com/95142863/163054532-9700c452-be5e-4a3e-8e30-4d622b29b8e2.png">

The goal of this project was build a foundation in Javascript using core concepts like functions, loops, and conditional statements. During the guided building, we
wrote for loops to iterate over strings and arrays, fight functions using conditional statements (if/else), and created a shop using switch case to make decisions based on user input.

One of the things I learned through creating a "player" was JavaScript can create objects that contain both properties and methods (for example: "Refill Health" is a method of player which can be used to affect the player health and money properties!) I also learned about logical operators, which evaluate the value of multiple expressions.

Player method use:

```
var playerInfo = {
    health: 100,
    money: 10,
    refillHealth: function() {
        if (this.money >= 7) {
        this.health += 20;
        this.money -= 7;
        }
    }
}
```

Logical operator use:

```
while (playerInfo.health > 0 && enemy.health > 0){}
```

## Documentation

- [JS Object Properties](https://www.w3schools.com/js/js_object_properties.asp)
- [JS Object Methods](https://www.w3schools.com/js/js_object_methods.asp)
- [JS If...Else](https://www.w3schools.com/js/js_if_else.asp)
- [JS Switch Case](https://www.w3schools.com/js/js_switch.asp)
- [JS For Loop](https://www.w3schools.com/js/js_loop_for.asp)
- [JS comparison/logical operators](https://www.w3schools.com/js/js_comparisons.asp)
- [JS Function Declaration](https://www.w3schools.com/js/js_comparisons.asp)
- [JS Function Expression](https://www.w3schools.com/js/js_comparisons.asp)

## Blogs/Resources

- [Comparison vs. Logical operators](https://www.codecademy.com/article/fwd-js-comparison-logical)

---

- © 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
