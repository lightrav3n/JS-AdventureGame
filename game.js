// ---- HTML STUFF --------------------------------
function printStory(text) {
  storyElement.innerHTML += `<p>${text}</p>`;
  storyElement.scrollTop = storyElement.scrollHeight;
}

const storyElement = document.getElementById("story");
const userInputElement = document.getElementById("userInput");

const levelElement = document.getElementById("level");
const experienceElement = document.getElementById("experience");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const healthElement = document.getElementById("health");
const weaponElement = document.getElementById("weapon");
const armorElement = document.getElementById("armor");

function updateStats() {
  levelElement.textContent = playerLevel;
  experienceElement.textContent = playerExperience;
  attackElement.textContent = playerAttackPower;
  defenseElement.textContent = playerDefense;
  healthElement.textContent = playerHealth;
  weaponElement.textContent = equippedWeapon ? equippedWeapon.name : "None";
  armorElement.textContent = equippedArmor ? equippedArmor.name : "None";
}

/// Player's Variable Declarations

let playerHealth = 100;
let playerExperience = 0;
let playerLevel = 1;
let playerAttackPower = 5;
let playerDefense = 3;
let enemyHealth = 0;
let enemyAttackPower = 0;
let enemyDefense = 0;
let playerGold = 0;
let isPlayerTurn = true;
let playerInventory = [];
let equippedWeapon = null;
let equippedArmor = null;
let healthPotion = {
  name: "Health Potion",
  type: "potion",
  healing: 30,
  uses: 1,
};
let scroll = {
  name: "Scroll of Teleportation",
  type: "quest item",
  uses: "Quest item. Deliver to Adria",
};
////----- MISCELLANEOUS -----

function checkEnter(event) {
  if (event.key === "Enter") {
    processInput();
  }
}

// Function to check if specific items are equipped
function checkAndPromptEquippedItems() {
  if (
    equippedWeapon &&
    equippedWeapon.name === "Shiny Sword" &&
    equippedArmor &&
    equippedArmor.name === "Leather Armor"
  ) {
    printStory(
      `Congratulations, valiant warrior! You now stand adorned with the mighty <strong>Shiny Sword</strong> and shielded by the resilient <strong>Leather Armor</strong>. Feel the power coursing through your veins as you prepare for an epic adventure!

      The shadows of Tristram await your arrival. To proceed further into the unknown, type <strong>'proceed'</strong> and embrace the destiny that beckons. The town's fate hangs in the balance, and you, the chosen one, hold the key to unraveling the mysteries that shroud Sanctuary. May your every step be guided by courage and purpose.`
    );
  } else {
    printStory(
      `Equip the Shiny Sword and Leather Armor to embark on your adventure!`
    );
  }
}

function startGame() {
  const healthPotion = {
    name: "Health Potion",
    type: "potion",
    healing: 30,
    uses: 1,
  };
  const LeatherArmor = {
    name: "Leather Armor",
    type: "armor",
    defense: 3,
    life: 5,
  };
  const ShinySword = { name: "Shiny Sword", type: "weapon", attackPower: 10 };

  playerInventory = [ShinySword, LeatherArmor, healthPotion];

  printStory(
    `To forge your destiny, you must first learn the arcane commands that govern your existence. In the dim glow of a flickering torch, a mysterious inscription appears before you:
    <br><br>
    "Welcome, adventurer, to a Diablo inspired text-based adventure! Before embarking on the perilous odyssey that awaits, embrace the wisdom of the ancients. To don the armor of survival and wield the weapons of legend, type <strong>'equip'</strong> followed by the name of the item.
    <br><br>
    The shadows may obscure your path, but with each keystroke, you unravel the threads of destiny. The epic unfolds, and the echoes of your choices resonate through the eternal night of Tristram. Are you ready to face the unknown and carve your legend in the annals of Sanctuary?"
    <br><br>
    Type <strong>'done'</strong> when you are finished getting you equipment on.`
  );

  printInventory();
  printEquippedItems();

  // Check if specific items are equipped and display a congratulatory message
  checkAndPromptEquippedItems();
}

function equipDone() {
  printStory(
    `In the realm of Sanctuary, a lone adventurer, haunted by the shadows of a tragic past, seeks redemption amidst the looming darkness that envelops the town of Tristram. His name is Aric, a warrior whose life was once shattered by a demonic invasion that claimed the lives of his loved ones. Tormented by the memories of that fateful night, he now embarks on a perilous journey to confront the very creatures that wrought havoc upon his existence.<br> Aric's tale begins in the desolate streets of Tristram, a town gripped by an eternal night, plagued by demons and malevolent forces. The air is thick with an otherworldly chill as he wanders through the eerie alleys, haunted by the echoes of his past. The townsfolk speak in hushed tones of an ancient prophecy, foretelling of a chosen hero who would rise to face the Queen of Darkness, Andariel, and bring an end to the town's suffering.`
  );

  printStory(
    "Navigating the desolate streets of Tristram, a sense of foreboding permeates the air. Amidst the haunting silence, Adria's presence, shrouded in mystery, beckons you. Her eyes, a reflection of ancient wisdom, meet yours. Tristram's woes echo in the subtle tremor of her voice as she hints at the peril befalling the town. With a nod, she gestures toward her humble abode, inviting you to unravel the secrets that may hold the key to dispelling the encroaching darkness. <br> <br> You decide to <strong>`follow`</strong> her."
  );
}

// Initial prompt
printStory(`In the realm of Sanctuary, a lone adventurer, haunted by the shadows of a tragic past, seeks redemption amidst the looming darkness that envelops the town of Tristram. Your name is Aric, a warrior whose life was once shattered by a demonic invasion that claimed the lives of your loved ones. Tormented by the memories of that fateful night, you now embarks on a perilous journey to confront the very creatures that wrought havoc upon your existence.
<br><br>
Your tale begins in the desolate streets of Tristram, a town gripped by an eternal night, plagued by demons and malevolent forces. The air is thick with an otherworldly chill as you wander through the eerie alleys, haunted by the echoes of the past. The townsfolk speak in hushed tones of an ancient prophecy, foretelling of a chosen hero who would rise to face the Queen of Darkness, Andariel, and bring an end to the town's suffering. <br><br> Type <strong>'start'</strong> to begin your adventure.`);

////---- INVENTORY MANAGEMENT-----

function printInventory() {
  const inventoryText =
    playerInventory.length > 0
      ? playerInventory.map((item) => item.name).join(", ")
      : "Empty";
  printStory(`Inventory: ${inventoryText}`);
  printEquippedItems();
  updateInventory();
}

function updateInventory() {
  const inventoryElement = document.getElementById("inventory");
  inventoryElement.innerHTML = playerInventory
    .map((item) => {
      if (item.type === "armor") {
        return `<p>${item.name} (Defense: +${item.defense}, Life: +${item.life})</p>`;
      } else if (item.type === "weapon") {
        return `<p>${item.name} (Damage: +${item.attackPower})</p>`;
      } else if (item.type === "potion") {
        return `<p>${item.name} (Uses: ${item.uses})</p>`;
      } else if (item.type === "scroll") {
        return `<p>${item.name} (uses: ${item.uses})</p>`;
      }
    })
    .join("");

  // playerInventory.forEach((item) => {
  //   const itemElement = document.createElement("p");
  //   let itemDetails = `<strong>${item.name}:</strong>`;

  //   if (item.type === "potion") {
  //     itemDetails += ` Uses: ${item.uses}`;
  //   } else if (item.type === "armor") {
  //     itemDetails += ` Defense: ${item.defense}, Life: ${item.life}`;
  //   } else if (item.type === "weapon") {
  //     itemDetails += ` Attack Power: ${item.attackPower}`;
  //   } else if (item.type === "Scroll of Teleportation") {
  //     itemDetails += `${item.use}`;
  //   }
  //   itemElement.innerHTML = itemDetails;
  //   inventoryElement.appendChild(itemElement);
  // });
}

function printEquippedItems() {
  document.getElementById("equippedWeapon").textContent = equippedWeapon
    ? `${equippedWeapon.name} (+${equippedWeapon.attackPower} Attack)`
    : "None";
  document.getElementById("equippedArmor").textContent = equippedArmor
    ? `${equippedArmor.name} (+${equippedArmor.defense} Defense, +${equippedArmor.life} Life)`
    : "None";
}

function equipItem(item) {
  // let unequippedItem;

  if (item.type === "weapon") {
    unequippedItem = equippedWeapon;
    equippedWeapon = item;
    playerAttackPower += equippedWeapon.attackPower;
  } else if (item.type === "armor") {
    unequippedItem = equippedArmor;
    equippedArmor = item;
    playerDefense = equippedArmor.defense;
    playerHealth += equippedArmor.life;
  } else {
    printStory(`Cannot equip item of type '${item.type}'.`);
    return;
  }

  // Remove the new item from the inventory
  const newItemIndex = playerInventory.indexOf(item);
  if (newItemIndex !== -1) {
    playerInventory.splice(newItemIndex, 1);
  }

  // Add the previously equipped item back to the inventory
  if (unequippedItem) {
    playerInventory.push(unequippedItem);
  }

  printStory(`You have equipped ${item.name}.`);
  updateStats();
  printEquippedItems();
  updateInventory();
}

function useHealthPotion() {
  const potionIndex = playerInventory.findIndex(
    (item) =>
      item.type === "potion" && item.name.toLowerCase() === "health potion"
  );

  if (potionIndex !== -1 && healthPotion.uses > 0) {
    playerHealth += healthPotion.healing;
    healthPotion.uses--;
    printStory(
      `You used a Health Potion and gained ${healthPotion.healing} health.`
    );

    // Remove the used potion from the inventory
    playerInventory.splice(potionIndex, 1);
    printInventory(); // Update the inventory display
  } else {
    printStory("You don't have any usable Health Potions.");
  }
}

////----COMMANDS ------

function handleNonCombatCommands(command) {
  switch (command) {
    case "inventory":
      printInventory();
      break;
    case "use health potion":
      useHealthPotion();
      break;
    default:
      printStory("----- Invalid command. -----");
  }
}

function processInput() {
  const userInput = userInputElement.value.toLowerCase();
  if (userInput.includes("start")) {
    startGame();
  } else if (userInput.includes("done")) {
    checkAndPromptEquippedItems();
  } else if (userInput.includes("proceed")) {
    equipDone();
  } else if (userInput.includes("follow")) {
    if (isQuestAccepted()) {
      printStory(
        "You've already accepted the quest. Type 'engage' to begin the battle."
      );
    } else {
      startQuest();
    }
  } else if (userInput.includes("accept")) {
    acceptQuest();
  } else if (userInput.includes("engage")) {
    if (isQuestAccepted()) {
      startFight();
    } else {
      printStory(
        "Navigating the desolate streets of Tristram, a sense of foreboding permeates the air. Amidst the haunting silence, Adria's presence, shrouded in mystery, beckons you. Her eyes, a reflection of ancient wisdom, meet yours. Tristram's woes echo in the subtle tremor of her voice as she hints at the peril befalling the town. With a nod, she gestures toward her humble abode, inviting you to unravel the secrets that may hold the key to dispelling the encroaching darkness.<br><br> Type <strong>'follow`</strong> to see what Adria has to tell you."
      );
    }
  } else if (userInput.includes("yes")) {
    acceptAndarielQuest();
  } else if (userInput.includes("defeat andariel")) {
    startAndyFight();
  } else if (userInput.includes("decline")) {
    declineQuest();
  } else if (
    userInput.includes("attack") ||
    userInput.includes("defend") ||
    userInput.includes("cast spell")
  ) {
    handleFightCommands(userInput);
  } else if (userInput.includes("strike") || userInput.includes("evade")) {
    handleAndyFightCommands(userInput);
  } else if (
    userInput.includes("back to tristram") ||
    userInput.includes("retreat") ||
    userInput.includes("back to tristram")
  ) {
    returnToTristram();
  } else if (userInput.includes("return to town")) {
    returnToTown();
  } else if (
    userInput.includes("talk to adria") ||
    userInput.includes("decipher the scroll")
  ) {
    talkToAdria();
  }

  // Player asks Adria what to do with the scroll
  else if (userInput.includes("ask adria")) {
    printStory(
      "'The Scroll of Teleportation holds ancient power,' Adria explains. 'I will decipher its secrets, delving into the arcane mysteries. Your patience will be rewarded. Meanwhile, stay vigilant on your quest.'"
    );
    adriaToAndy();
  } else if (userInput.includes("express gratitude")) {
    printStory(
      "'Ah, gratitude warms the heart like the sun's rays. The Scroll of Teleportation is a key to realms untold. I will unlock its secrets, but time is our companion. Stay vigilant on your quest, dear adventurer.'"
    );
    adriaToAndy();
  } else if (userInput.includes("inquire")) {
    printStory(
      "'Inquire and you shall receive insights. The Scroll of Teleportation conceals ancient truths. I embark on the journey of deciphering its enigmatic runes. Stay vigilant on your quest, and the answers will unfold like petals in the dawn.'"
    );
    adriaToAndy();
  } else if (userInput.includes("reset")) {
    resetGameState();
  } else if (userInput.includes("speak with adria")) {
    speakToAdria();
  } else if (userInput.startsWith("equip")) {
    const itemName = userInput.substring(5).trim();
    const selectedItem = playerInventory.find(
      (item) => item.name.toLowerCase() === itemName
    );

    if (selectedItem) {
      equipItem(selectedItem);
    } else {
      printStory("Item not found in the inventory.");
    }
  } else {
    handleNonCombatCommands(userInput);
  }

  userInputElement.value = ``;
}

function help() {
  const helpMessage = `
  Available Commands:
  - 'start': Begin your adventure.
  - 'done': Check and prompt equipped items.
  - 'proceed': Equip items and proceed.
  - 'follow': Follow Adria to start the quest.
  - 'accept': Accept the quest from Adria.
  - 'engage': Start a fight against demonic forces.
  - 'defeat Andariel': Begin the battle against Andariel.
  - 'decline': Decline the quest from Adria.
  - 'attack', 'defend', 'cast spell': Combat commands during fights.
  - 'back to tristram': Return to Tristram during a quest.
  - 'return to town': Return to town.
  - 'talk to Adria', 'decipher the scroll': Interact with Adria.
  - 'ask Adria', 'express gratitude', 'inquire': Speak with Adria for guidance.
  - 'reset': Reset the game state.
  - 'speak with Adria': Initiate conversation with Adria.
  - 'equip [item]': Equip a specific item from your inventory.
  `;

  printStory(helpMessage);
}

function speakToAdria() {
  printStory(
    "Adria's eyes meet yours with a knowing glint, acknowledging your triumph over the Queen of Darkness. The weight of victory and the echoes of battles won linger in the air. The very essence of Tristram seems to respond to your heroic presence."
  );
  printStory(
    "As the Queen of Darkness falls, a new chapter unfolds in your journey. The tapestry of fate is vast, and more adventures await on the horizon. The challenges ahead are shrouded in mystery, and the echoes of your triumph resonate with the promise of greater quests. The tale of Tristram continues, and your role as its hero is far from concluded."
  );
  printStory(
    `For now, this is it adventurer! But fear not more will come soon.`
  );
  printStory(
    `Type <strong>'reset'</strong> to start over, and you can choose a different path.`
  );
}
function talkToAdria() {
  printStory(
    "Wandering the desolate streets of Tristram, you feel an eerie pull towards Adria's hidden abode. The moon casts long shadows, and the whispers of unseen forces beckon you forward. The air is thick with an otherworldly energy, guiding you towards the enigmatic witch's dwelling."
  );
  const hasScroll = playerInventory.some(
    (item) =>
      item.name === "Scroll of Teleportation" && item.type === "quest item"
  );

  if (hasScroll) {
    printStory(
      "Adria's gaze lingers on the Scroll of Teleportation. 'Ah, you've found it! Well done, adventurer.' Her voice carries a mixture of approval and ancient wisdom. The runes on the scroll seem to glow brighter in response to her recognition."
    );
    printStory(
      "In gratitude, she bestows upon you the Enchanted Amulet—an ethereal shield against Andariel's vicious poisoning attacks. The amulet gleams with arcane energy, promising protection in the face of impending challenges. Adria's words, imbued with magical resonance, guide you through the unfolding destiny."
    );
    playerInventory.push({
      name: "Enchanted Amulet",
      type: "amulet",
      enchantment: "poison immunity",
    });

    printStory("<strong>Ask Adria</strong> what to do with the scroll."),
      printStory(
        "<strong>Express gratitude</strong> and await further instructions."
      ),
      printStory(
        "<strong>Inquire </strong>about the mysteries of the Frigid Highlands."
      );
  } else {
    printStory(
      "Adria nods mysteriously. 'Your path is intertwined with fate, adventurer. Seek what you desire.' The words linger in the air, leaving you with a sense of both mystery and destiny. The town of Tristram hums with an unseen energy, and your journey through its enigmatic streets has only just begun."
    );
    startQuest();
  }
}

function adriaToAndy() {
  printStory("Days pass, marked by the chill winds of the highlands.");

  printStory(
    "Adria returns with a knowing smile. 'The scroll's secrets are unveiled...'"
  );

  printStory(
    "With a sense of impending challenge, Adria urges you to use the scroll, open a portal to Andariel's Lair, and face the ultimate evil! The gravity of the situation hangs in the air, and the path ahead is fraught with danger. The ethereal amulet pulsates with newfound power, a beacon in the encroaching darkness."
  );
  printStory(
    "Will you accept? Type <strong>'defeat Andariel'</strong> to confront Andariel or <strong>'decline'</strong> to contemplate your choices. The very fabric of fate seems to await your decision."
  );
}
function returnToTown() {
  printStory(
    "You return to Tristram, a hero bathed in the cheers of the townsfolk, celebrating your triumph over Andariel!"
  );
  printStory(
    "The flickering torches illuminate the path ahead, beckoning you towards the heart of the town."
  );
  printStory("Options:");
  printStory(
    "- <strong>'speak with Adria'</strong> to share your victory and seek guidance."
  );
  printStory("- 'visit Wirt's Black Market' to explore mysterious offerings.");
  printStory("- 'check the town notice board' for rumors and quests.");
}
function returnToTristram() {
  printStory("You cautiously return to the desolate streets of Tristram.");
  printStory(
    "The wind whispers tales of both sorrow and resilience through the abandoned buildings."
  );
  printStory("Options:");
  printStory(
    "- Perhaps you should <strong>'talk to Adria'</strong> for guidance."
  );
  printStory(
    "- 'investigate the abandoned cathedral' to uncover hidden secrets."
  );
  printStory("- 'visit Wirt's Black Market' to explore mysterious offerings.");
}

function isQuestAccepted() {
  return playerExperience > 0;
}

////-------------- QUESTS ---------------------

function acceptQuest() {
  if (isQuestAccepted()) {
    printStory(
      "The Frigid Highlands, once a battleground against demonic forces, now echo with the eerie stillness of victory. The demons that plagued this desolate realm lie vanquished, their grotesque forms dissolving into the cold, unforgiving snow."
    );
    printStory(
      "As you catch your breath in the aftermath of the battle, a fleeting sense of accomplishment washes over you. Yet, the howling wind serves as a haunting reminder that the Queen of Darkness, Andariel, awaits deeper within the shadows, her presence casting a perpetual pall over your quest for redemption."
    );
    printStory(
      "The path forward is clear, extending into the heart of the Frigid Highlands. Type 'proceed' to continue your journey and face the looming darkness that still envelopes the land."
    );
  } else {
    printStory(
      "Embarking on a perilous journey from the warmth of Tristram to the foreboding Frigid Highlands, guided by Adria's cryptic words, the once-friendly terrain transforms into an expanse of ice and snow. <br>The wind howls through the desolate Frigid Highlands, whipping up flurries of snow that obscure your vision. The air is bone-chilling, and the ominous peaks of distant mountains loom above, their icy slopes foreboding and treacherous."
    );
    printStory(
      "As you navigate the unforgiving terrain, the ground beneath your boots crunches with each step, a stark contrast to the eerie silence that surrounds you. Suddenly, demonic forms emerge from the swirling snow, their malevolent eyes fixated on you. The minions of Andariel have found you, and the impending clash is inevitable."
    );
    printStory(
      "The demonic horde advances, their grotesque forms silhouetted against the pale, ghostly light. Adrenaline courses through your veins as you ready your weapon, the metallic ring echoing through the desolation. The time has come to face the forces that haunt Tristram."
    );
    printStory(
      "Type <strong>'engage'</strong> to confront the demons in battle, or <strong>'retreat'</strong> to strategically plan your approach. The fate of the Frigid Highlands and your quest for redemption hangs in the balance."
    );

    playerExperience = 1;
    playerAttackPower = 10;
    playerDefense = 5;
    updateStats();
  }
}

function declineQuest() {
  if (isQuestAccepted()) {
    printStory(
      "Within the mystical confines of Adria's abode, a heavy silence hangs in the air. Adria, her eyes betraying a depth of knowledge, regards you with a mix of understanding and disappointment."
    );
    printStory(
      "In a voice tinged with ancient wisdom, she speaks, 'It is not an easy path you choose, my child. To decline a quest once undertaken is to navigate treacherous waters.'"
    );
    printStory(
      "Type '<strong>engage</strong>' to embrace the challenge that destiny has laid upon you."
    );
  } else {
    printStory(
      "You gracefully decline the quest within the sanctum of Adria's abode. The mystic energies seem to ripple in acknowledgement, as if the very walls hold the whispers of countless decisions made within."
    );
    printStory(
      "Continue your journey by typing '<strong>start</strong>' or delve into the mystical by typing '<strong>return to town</strong>'."
    );
  }
}

let andarielQuestAccepted = false;
let andarielDefeated = false;

function startQuest() {
  if (andarielQuestAccepted) {
    printStory(
      "Adria, the enigmatic sorceress, fixates her gaze upon you, a glimmer of recognition in her eyes. 'Aric,' she whispers, 'you've already embarked on the perilous journey, accepting the sacred quest to confront the Queen of Darkness herself, Andariel. The fate of Tristram rests upon your shoulders. Type 'defeat Andariel' when you're ready to plunge into the abyss and face the looming shadow.'"
    );
  } else {
    printStory(
      "Her words dance on the edge of darkness as she reveals the ancient prophecy that foretells of a chosen hero – a hero destined to confront the malevolent forces that have plunged Tristram into eternal night. Adria extends an offer, a quest to banish the demonic presence that shrouds the town, promising not only a material reward but a chance for you to reclaim your honor and face the shadows that haunt your past."
    );
    printStory(
      "The flickering candlelight casts eerie shadows on the walls as Adria awaits your decision. Will you accept the quest and venture into the heart of darkness, or will you continue your journey through the haunted alleys of Tristram, your destiny yet to unfold?"
    );

    const hasScroll = playerInventory.some(
      (item) =>
        item.name === "Scroll of Teleportation" && item.type === "quest item"
    );

    if (hasScroll) {
      printStory(
        "Adria looks at you and acknowledges your possession of the Scroll of Teleportation. 'You've already obtained the means to transcend. Return to me when you're ready.'"
      );
      printStory(
        "Type <strong>'talk to Adria'</strong> to discuss your next steps."
      );
    } else {
      printStory(
        "Will you accept the quest? Type <strong>'accept'</strong> or <strong>'decline'</strong>."
      );
    }
  }
}

/////----FIGHTS--------------------------------------------------
let fightEnded = false;
let hasTeleportationScroll = false;
function startFight() {
  if (!isQuestAccepted()) {
    printStory(
      "You need to have the scroll of Teleportation. <strong> `talk to Adria`</strong>"
    );
    return;
  }
  fightEnded = false;
  if (fightEnded) {
    printStory(
      "The echoes of your previous skirmish linger in the frigid air. The demonic presence vanquished, leaving a haunting stillness. Yet, the highlands hold no respite. In the looming darkness, a new threat emerges. Ready your weapons and type <strong>'engage'</strong> to confront the next abyssal adversary that awaits in the shadows."
    );

    return;
  }

  enemyHealth = Math.floor(Math.random() * 50) + 20;
  enemyAttackPower = Math.floor(Math.random() * 3) + 1;
  enemyDefense = Math.floor(Math.random() * 2) + 1;

  // Randomly select encounter description
  const encounterDescriptions = [
    `Emerging from the shadows, a demonic silhouette materializes before you, its ghastly presence sending shivers down your spine. Steel yourself for the impending clash!  <br> Demon Stats: <strong>Health: ${enemyHealth}, Attack Power: ${enemyAttackPower}, Defense: ${enemyDefense}.</strong>`,

    `In the eerie silence of the highlands, a demon materializes with malevolent intent. The frigid air crackles with dark energy as you prepare to face this otherworldly foe.  <br> Demon Stats: <strong>Health: ${enemyHealth}, Attack Power: ${enemyAttackPower}, Defense: ${enemyDefense}.</strong>`,

    `A guttural growl announces the arrival of a demon, its eyes gleaming with malice. The hostile winds seem to echo your impending struggle. Ready your weapons, for battle is at hand! <br> Demon Stats: <strong>Health: ${enemyHealth}, Attack Power: ${enemyAttackPower}, Defense: ${enemyDefense}.</strong>`,
  ];

  const randomIndex = Math.floor(Math.random() * encounterDescriptions.length);
  const randomEncounterDescription = encounterDescriptions[randomIndex];

  printStory(randomEncounterDescription);

  printStory(
    `As you stand amidst the biting winds, facing a demonic foe, the distant echoes of growls amplify the weight of your decision. Now, in the freezing battlegrounds, you must choose your path—will you unleash a fierce attack, adopt a stalwart defense, or wield arcane forces to cast a spell? The destiny of Tristram rests on your choices. What path will you forge in this chilling adventure? <br> <br>Type <strong>'attack'</strong>, <strong>'defend'</strong>, or <strong>'cast spell'</strong>.`
  );
  isPlayerTurn = true;
  fightEnded = false;
}

function endFight(playerVictorious) {
  if (fightEnded) {
    // The fight has already ended, do nothing.
    return;
  }

  if (playerVictorious) {
    const experienceGain = Math.floor(Math.random() * 50) + 30;
    playerExperience += experienceGain;

    const victoryMessages = [
      `The demonic foe falls before your might, yielding ${experienceGain} experience. A triumphant surge courses through you.`,
      `In the frigid aftermath, the defeated demon crumbles, granting you ${experienceGain} experience. Victory echoes in the chilling highlands.`,
      `With a final strike, the demon succumbs. You gain ${experienceGain} experience, marking a hard-fought triumph in the desolate highlands.`,
    ];

    printStory(getRandomMessage(victoryMessages));

    if (playerExperience >= 100 * playerLevel) {
      playerLevel++;
      playerHealth = 100;
      playerAttackPower += 5;
      playerDefense += 2;
      printStory(
        `You ascend to level ${playerLevel}, fortified with newfound strength.`
      );
    }

    // Loot logic
    const lootChance = Math.random();
    if (lootChance > 0.5) {
      const lootType = Math.random() > 0.5 ? "armor" : "weapon";
      const loot = generateRandomLoot(lootType);
      const lootItem = { name: loot.name, type: loot.type, ...loot };
      playerInventory.push(lootItem);

      const lootMessages = [
        `From the defeated demon, you obtain ${lootType}: ${lootItem.name}.`,
        `A ${lootType} lies amidst the demonic remains—a reward for your valor.`,
        `The demon's spoils include a formidable ${lootType}: ${lootItem.name}.`,
      ];

      printStory(getRandomMessage(lootMessages));
      printInventory();
      if (!hasTeleportationScroll) {
        printStory(
          "As you search the demonic remains, you realize the Scroll of Teleportation is not among the spoils. The chilling winds urge you to <strong>'engage'</strong> once more and face the demonic forces."
        );
      }
    } else {
      // 50% chance for the loot to be a Scroll of Teleportation
      const lootType = Math.random() > 0.5 ? "quest item" : "weapon";
      const lootItem =
        lootType === "quest item"
          ? {
              name: "Scroll of Teleportation",
              type: lootType,
              uses: "Quest item. Deliver to Adria",
            }
          : generateRandomLoot(lootType);

      playerInventory.push(lootItem);

      const lootMessages =
        lootType === "quest item"
          ? [
              "The defeated demon drops a Scroll of Teleportation!",
              "Amongst the demonic remnants, you discover a Scroll of Teleportation.",
              "A mystical Scroll of Teleportation materializes from the defeated demon.",
            ]
          : [
              `From the defeated demon, you obtain ${lootType}: ${lootItem.name}.`,
              `A ${lootType} lies amidst the demonic remains—a reward for your valor.`,
              `The demon's spoils include a formidable ${lootType}: ${lootItem.name}.`,
            ];

      printStory(getRandomMessage(lootMessages));
      printStory(
        "The scroll in your hands bears the potential to unveil secrets and open new paths. Head back to Tristram, Have Adria <strong>decipher the scroll</strong> ."
      );
      printInventory(); // Update the inventory display
    }
  } else {
    const defeatMessages = [
      "Defeated, you lie amidst the cold highlands. The demon's laughter echoes in the desolation.",
      "The demonic force overpowers you. Game over. Tristram's fate remains uncertain.",
      "In the frigid expanse, the demon claims victory. The highlands bear witness to your defeat.",
    ];

    printStory(getRandomMessage(defeatMessages));
  }
  fightEnded = true;
  isPlayerTurn = true;
  updateStats();
}

function getRandomMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function handleFightCommands(userInput) {
  if (!isPlayerTurn) {
    printStory("Wait for the demon's attack before making another move.");
    return;
  }

  const command = userInput.trim().toLowerCase();
  switch (command) {
    case "attack":
      playerAttack();
      enemyTurn();
      break;
    case "defend":
      defend();
      enemyTurn();
      break;
    case "use health potion":
      useHealthPotion();
      enemyTurn();
      break;
    case "cast spell":
      castSpell();
      enemyTurn();
      break;
    default:
      printStory("Invalid command. Type a valid action or command.");
  }
}

function defend() {
  const defenseBonus = Math.floor(Math.random() * 5) + 3;
  playerDefense += defenseBonus;
  const defenseTextOptions = [
    "You brace yourself, adopting a solid defensive stance. The demon eyes you cautiously.",
    "A shield materializes in your hand as you prepare to deflect the demon's attacks.",
    "You take a step back, analyzing the demon's movements and preparing for a defensive maneuver.",
  ];
  const selectedText =
    defenseTextOptions[Math.floor(Math.random() * defenseTextOptions.length)];
  printStory(
    `${selectedText} You gain +${defenseBonus} defense until your next turn.`
  );
}

function playerAttack() {
  const playerDamage = Math.floor(Math.random() * 20) + 10 + playerAttackPower;
  enemyHealth -= playerDamage;
  const attackTextOptions = [
    "You swing your weapon with precision, striking the demon with a powerful blow.",
    "Channeling your inner strength, you unleash a devastating attack on the demon.",
    "A surge of energy courses through you as you land a fierce blow on the demon.",
  ];
  const selectedText =
    attackTextOptions[Math.floor(Math.random() * attackTextOptions.length)];
  printStory(`${selectedText} Your attack deals ${playerDamage} damage.`);

  if (enemyHealth <= 0) {
    endFight(true); // Player victorious
  }
}

function castSpell() {
  const spellDamage = Math.floor(Math.random() * 30) + 10;
  enemyHealth -= spellDamage;
  const spellTextOptions = [
    "Whispers of arcane incantations fill the air as you cast a spell, engulfing the demon in mystical energy.",
    "You harness the power of the elements, conjuring a spell that sends waves of energy toward the demon.",
    "With a focused mind, you cast a spell that manifests as a dazzling burst of magical force, striking the demon.",
  ];
  const selectedText =
    spellTextOptions[Math.floor(Math.random() * spellTextOptions.length)];
  printStory(`${selectedText} Your spell deals ${spellDamage} damage.`);

  if (enemyHealth <= 0) {
    endFight(true); // Player victorious
  }
}

function enemyTurn() {
  if (enemyHealth > 0) {
    const enemyDamage = Math.floor(Math.random() * 15) + 10;
    playerHealth -= enemyDamage;
    const enemyTurnTextOptions = [
      "The demon lunges at you with ferocity, claws slashing through the air.",
      "A sinister grin forms on the demon's face as it launches a relentless assault.",
      "Eyes glowing with malice, the demon delivers a swift and brutal counterattack.",
    ];
    const selectedText =
      enemyTurnTextOptions[
        Math.floor(Math.random() * enemyTurnTextOptions.length)
      ];
    printStory(`${selectedText} The demon deals ${enemyDamage} damage.`);
    printStory(`Your health: ${playerHealth}`);

    if (playerHealth <= 0) {
      endFight(false);
    } else {
      isPlayerTurn = true;
      const playerTurnText =
        "What will you do? Type <strong>'attack'</strong>, <strong>'defend'</strong>, <strong>'use health potion'</strong>, or <strong>'cast spell'</strong>.";
      printStory(playerTurnText);
    }
  } else if (enemyHealth <= 0 && !fightEnded) {
    endFight(true);
  }
}

//// -------------- ANDARIEL FIGHT -----------------
function startAndyFight() {
  if (!isQuestAccepted()) {
    printStory(
      `Before trying to defeat Andariel, you must get the Scroll of Teleport. Rumors have it that the demons in the Frigid Highlands have it. Would you like to go there? <br><br>
      Type <strong>'accept'</strong> if so, or go <strong>'back to tristram'</strong>`
    );
    return;
  }

  if (fightEnded) {
    printStory(
      "You stand victorious before the defeated Andariel, her malevolent presence vanquished. Yet, the shadows persist. As you catch your breath, a haunting stillness settles over the Lair. In the aftermath of battle, a new revelation awaits. What path will you choose, hero?"
    );

    printStory(
      "The echoes of your previous skirmish linger in the frigid air. The demonic presence vanquished, leaving a haunting stillness. Yet, the highlands hold no respite. In the looming darkness, a new threat emerges. Ready your weapons and type <strong>'engage'</strong> to confront the next abyssal adversary that awaits in the shadows."
    );

    return;
  }

  if (!andarielDefeated) {
    enemyHealth = Math.floor(Math.random() * 100) + 50;
    printStory(
      `With a sense of impending challenge, Adria urges you to use the scroll, open a portal to Andariel's Lair, and face the ultimate evil! The gravity of the situation hangs in the air, and the path ahead is fraught with danger. The ethereal amulet pulsates with newfound power, a beacon in the encroaching darkness.

      As you unravel the ancient scroll, arcane symbols illuminate the parchment. The air around you shimmers, and a portal materializes—a gateway to the heart of Andariel's domain. With determination in your eyes, you step through the portal, the fabric of reality warping around you.
      
      The transition is swift but disorienting. As you emerge on the other side, the Lair unfolds before you—a desolate landscape veiled in shadows. The Queen of Darkness awaits, her sinister presence palpable. Demonic entities prowl the periphery, their malevolent gazes fixated on the intruder who dared to breach the lair's defenses.
      
      Before you stands Andariel, the Queen of Darkness, with ${enemyHealth} health. Her malevolence casts a shadow over the Lair, and the air crackles with dark energy. The chilling winds carry whispers of impending doom, heightening the tension in the Lair. The ethereal amulet at your neck resonates, responding to the darkness that surrounds you.
      
      Prepare for the final battle, hero! The clash between light and shadow is imminent, and the fate of Tristram rests on your shoulders. Will you emerge victorious against the malevolent Queen, or will the Lair become your final resting place? The echoes of Adria's urging reverberate as you ready your weapon, and the demons around you stir in anticipation of the impending conflict. The ultimate evil awaits, and only you can stand against it.`
    );
    printStory(
      `Now, you stand amidst the biting winds, facing this demonic foe, and the distant echoes of growls amplify the weight of your decision. In the freezing battlegrounds of Andariel's Lair, you must choose your path—will you unleash a fierce attack, adopt a stalwart defense, or wield arcane forces to cast a spell? The destiny of Tristram rests on your choices. What path will you forge in this chilling adventure? <br> <br>Type <strong>'strike'</strong>, <strong>'evade'</strong>, or <strong>'use spell'</strong>.`
    );
    isPlayerTurn = true;
    fightEnded = false;
  } else {
    andarielDefeated = true;

    printStory(
      "Andariel has already been defeated. Return to town and celebrate your triumph, or venture forth into the unknown. The choice is yours."
    );
  }
}

function handleAndyFightCommands(userInput) {
  if (!isPlayerTurn) {
    printStory("Wait for the demon's attack before making another move.");
    return;
  }

  const command = userInput.trim().toLowerCase();
  switch (command) {
    case "strike":
      strike();
      enemyTurnAndy();
      break;
    case "evade":
      evade();
      enemyTurnAndy();
      break;
    case "use health potion":
      useHealthPotionAndy();
      enemyTurnAndy();
      break;
    case "use spell":
      castSpellAndy();
      enemyTurnAndy();
      break;
    default:
      printStory("Invalid command. Type a valid action or command.");
  }
}

// Add more immersive descriptions for player actions
function evade() {
  const defenseBonus = Math.floor(Math.random() * 5) + 3;
  playerDefense += defenseBonus;
  const defenseTextOptions = [
    "You brace yourself, adopting a solid defensive stance. The demon eyes you cautiously.",
    "A shield materializes in your hand as you prepare to deflect the demon's attacks.",
    "You take a step back, analyzing the demon's movements and preparing for a defensive maneuver.",
  ];
  const selectedText =
    defenseTextOptions[Math.floor(Math.random() * defenseTextOptions.length)];
  printStory(
    `${selectedText} You gain +${defenseBonus} defense until your next turn.`
  );
}

// Enhance the player attack description
function strike() {
  const playerDamage = Math.floor(Math.random() * 20) + 10 + playerAttackPower;
  enemyHealth -= playerDamage;
  const attackTextOptions = [
    "You swing your weapon with precision, striking the demon with a powerful blow.",
    "Channeling your inner strength, you unleash a devastating attack on the demon.",
    "A surge of energy courses through you as you land a fierce blow on the demon.",
  ];
  const selectedText =
    attackTextOptions[Math.floor(Math.random() * attackTextOptions.length)];
  printStory(`${selectedText} Your attack deals ${playerDamage} damage.`);

  if (enemyHealth <= 0) {
    endFightAndy(true);
  }
}
function castSpellAndy() {
  const spellDamage = Math.floor(Math.random() * 30) + 10;
  enemyHealth -= spellDamage;
  const spellTextOptions = [
    "Whispers of arcane incantations fill the air as you cast a spell, engulfing the demon in mystical energy.",
    "You harness the power of the elements, conjuring a spell that sends waves of energy toward the demon.",
    "With a focused mind, you cast a spell that manifests as a dazzling burst of magical force, striking the demon.",
  ];
  const selectedText =
    spellTextOptions[Math.floor(Math.random() * spellTextOptions.length)];
  printStory(`${selectedText} Your spell deals ${spellDamage} damage.`);

  if (enemyHealth <= 0) {
    endFightAndy(true);
  }
}

function enemyTurnAndy() {
  if (enemyHealth > 0) {
    let enemyDamage;

    const isSpecialAttackTurn = Math.random() < 0.5;

    if (isSpecialAttackTurn) {
      const hasEnchantedAmulet = playerInventory.some(
        (item) => item.name === "Enchanted Amulet" && item.type === "amulet"
      );

      if (hasEnchantedAmulet) {
        printStory(
          "Andariel attempts a special poison attack, but the Enchanted Amulet protects you, rendering the poison ineffective."
        );
        enemyDamage = 0;
      } else {
        enemyDamage = Math.floor(Math.random() * 30) + 20;
        printStory(
          `Andariel unleashes a special poison attack, dealing ${enemyDamage} poison damage. The Enchanted Amulet could have protected you from this, but you don't have it!`
        );
      }
    } else {
      enemyDamage = Math.floor(Math.random() * 15) + 10;
      printStory(
        `Andariel retaliates with a swift and brutal attack, dealing ${enemyDamage} damage. The Lair resonates with the clash of demonic and heroic forces. Your health: ${playerHealth}`
      );
    }

    playerHealth -= enemyDamage;

    if (playerHealth <= 0) {
      endFightAndy(false);
    } else {
      isPlayerTurn = true;
      printStory(
        "What will you do? Type <strong>'strike'</strong> to unleash a powerful attack, <strong>'evade'</strong> to dodge her relentless assault, <strong>'use spell'</strong> or <strong>'use health potion'</strong> to restore your vitality."
      );
    }
  } else {
    endFightAndy(true);
  }
}

function endFightAndy(playerVictorious) {
  if (playerVictorious) {
    const experienceGain = Math.floor(Math.random() * 60) + 200;
    playerExperience += experienceGain;
    printStory(
      `Congratulations! You have vanquished Andariel, the Queen of Darkness, gaining ${experienceGain} experience. The lair trembles with the echoes of your victory.`
    );

    // Level up logic
    if (playerExperience >= 100 * playerLevel) {
      playerLevel++;
      playerHealth = 100;
      playerAttackPower += 5;
      playerDefense += 2;
      printStory(
        `As the Queen falls, you ascend to level ${playerLevel}, imbued with newfound strength and resilience. The Lair bears witness to your heroic ascent.`
      );
    }
    const lootOptions = [
      {
        name: "Doombringer",
        type: "weapon",
        attackBonus: 15,
        specialAttribute: "Cursed Blade",
      },
      {
        name: "Armor of Insight",
        type: "armor",
        defenseBonus: 8,
        specialAttribute: "Mind's Eye",
      },
    ];

    const randomLoot =
      lootOptions[Math.floor(Math.random() * lootOptions.length)];

    playerInventory.push(randomLoot);

    printStory(
      `In the aftermath of the battle, you discover ${randomLoot.name} among the spoils. This ${randomLoot.type} enhances your abilities.`
    );
    printStory(`Special Attribute: ${randomLoot.specialAttribute}`);
    printStory(
      "With Andariel defeated, the shadows that once gripped Tristram begin to recede. It's time to return to the familiar streets of the town and seek the guidance of Adria, the mysterious witch who played a crucial role in this harrowing quest."
    );
    printStory(`Type <strong>'return to town'</strong>.`);
    andarielDefeated = true;
  } else {
    printStory(
      "Defeated by the malevolent power of Andariel, the Lair falls silent. Your journey comes to an end. Options:"
    );
    printStory(
      "- Type <strong>'restart'</strong> to embark on a new journey and face the shadows once more."
    );
    printStory(
      "- Type <strong>'exit'</strong> to end the game and contemplate your fate."
    );
  }

  isPlayerTurn = true;
  updateStats();
}

// Reset game state for potential restart
// resetGameState();

// ...

// Reset game state function
function resetGameState() {
  playerHealth = 100;
  playerExperience = 0;
  playerLevel = 1;
  playerAttackPower = 0;
  playerDefense = 0;
  enemyHealth = 0;
  isPlayerTurn = true;
  playerInventory = [];
  equippedWeapon = null;
  equippedArmor = null;
  healthPotion = {
    name: "Health Potion",
    type: "potion",
    healing: 30,
    uses: 1,
  };
  andarielQuestAccepted = false;
  andarielDefeated = false;
  fightEnded = false;
  hasTeleportationScroll = false;

  // Clear HTML elements
  storyElement.innerHTML = "";
  updateStats();
  updateInventory();
}

const loot = generateRandomLoot("loot"); // or "weapon"
playerInventory.push({ ...loot }); // Create a new object with spread syntax

function generateRandomLoot(type) {
  const armorOptions = [
    { name: "Demonhide Vest", type: "armor", defense: 15, life: 25 },
    { name: "Hellforged Plate", type: "armor", defense: 20, life: 30 },
    { name: "Shadow Silk Robes", type: "armor", defense: 12, life: 18 },
    { name: "Bone Spiked Armor", type: "armor", defense: 18, life: 22 },
    { name: "Mystic Leather Cloak", type: "armor", defense: 10, life: 15 },
    { name: "Frozen Plate Mail", type: "armor", defense: 22, life: 28 },
    { name: "Obsidian Chainmail", type: "armor", defense: 16, life: 20 },
  ];
  const weaponOptions = [
    { name: "Doombringer Greatsword", type: "weapon", attackPower: 25 },
    { name: "Shadowbane Dagger", type: "weapon", attackPower: 20 },
    { name: "Soulreaper Scythe", type: "weapon", attackPower: 22 },
    { name: "Vampiric Blade", type: "weapon", attackPower: 17 },
    { name: "Stormcaller Staff", type: "weapon", attackPower: 23 },
    { name: "Hallowed Warhammer", type: "weapon", attackPower: 21 },
    { name: "Divine Scepter", type: "weapon", attackPower: 16 },
  ];

  const options = type === "armor" ? armorOptions : weaponOptions;
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
