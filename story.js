const story = {
  act1: {
    scene1: {
      text: "You awaken in the ruins of an ancient temple, your powers flickering. A divine voice echoes...",
      background: "assets/img/Ruined_Temple.png",
      narration: "The time has come, child of heaven... choose your path, for destiny awaits.",
      choices: [
        { text: "Follow the celestial call", next: "godsPath" },
        { text: "Seek the humans in the village", next: "humansPath" },
        { text: "Walk into the shadows", next: "demonsPath" }
      ]
    },
    godsPath: {
      text: "Golden light bathes you as you ascend the celestial steps...",
      background: "assets/img/Celestial_Gate.png",
      narration: "Before you stand the guardians of the divine realm. Their eyes test your soul.",
      choices: [
        { text: "Step through the gate", next: "godsGate" },
        { text: "Challenge the guardians", next: "godsFight" },
        { text: "Return to earth", next: "scene1" }
      ]
    },
    humansPath: {
      text: "You walk into a humble village where whispers follow your every step...",
      background: "assets/img/Village_Square.png",
      narration: "The elder approaches, wary yet respectful. 'Are you the one foretold in the old songs?'",
      choices: [
        { text: "Speak to the elder", next: "humansElder" },
        { text: "Help the villagers", next: "humansHelp" },
        { text: "Leave silently", next: "scene1" }
      ]
    },
    demonsPath: {
      text: "The forest grows darker with every step, shadows dancing unnaturally...",
      background: "assets/img/Shadow_Forest.png",
      narration: "From the mist, monstrous forms emerge. The demons hunger for your soul.",
      choices: [
        { text: "Fight the demons", next: "demonsFight" },
        { text: "Hide in the shadows", next: "demonsHide" },
        { text: "Seek the dark altar", next: "demonsAltar" }
      ]
    },
    // placeholder deeper nodes so loadScene won't break
    godsGate: { 
      text: "You step through the gate into a cosmic, starry void.", 
      background: "assets/img/Cosmic_Void.png", 
      narration: "The gate is not a door, but a mirror to your soul. It asks: Why do you seek divinity? What is your purpose?", 
      choices: [
        { text: "To bring order to the mortal world.", next: "godsJustice" },
        { text: "To attain ultimate power for myself.", next: "godsAmbition" },
        { text: "I don't know. I am just following the light.", next: "godsDiscovery" }
      ] 
    },
    godsJustice: { 
      text: "The void coalesces into a vision. You see a starving man stealing bread to feed his family from a wealthy merchant who earned his gold through exploitation.", 
      background: "assets/img/Vision_of_Conflict.png", 
      narration: "The scales of justice are yours to command. What is your judgment?", 
      choices: [
        { text: "The thief must be punished. The law is absolute.", next: "justiceLaw" },
        { text: "The merchant is the true criminal. Justice is about equity.", next: "justiceEquity" },
        { text: "Punishment solves nothing. I will offer a path to resolution for both.", next: "justiceMercy" }
      ] 
    },
    justiceLaw: { text: "You have chosen the path of absolute law...", background: "assets/img/Vision_of_Conflict.png", narration: "The consequences unfold.", choices: [{text:"Continue", next:"scene1"}] },
    justiceEquity: { text: "You have chosen the path of equity...", background: "assets/img/Vision_of_Conflict.png", narration: "The consequences unfold.", choices: [{text:"Continue", next:"scene1"}] },
    justiceMercy: { text: "You have chosen the path of mercy...", background: "assets/img/Vision_of_Conflict.png", narration: "The consequences unfold.", choices: [{text:"Continue", next:"scene1"}] },
    godsAmbition: { text: "The path of ambition unfolds...", background: "assets/img/Cosmic_Void.png", narration: "Your journey continues.", choices: [{text:"Continue", next:"scene1"}] },
    godsDiscovery: { text: "The path of discovery unfolds...", background: "assets/img/Cosmic_Void.png", narration: "Your journey continues.", choices: [{text:"Continue", next:"scene1"}] },
    godsFight:{ text:"You dare fight...", background:"assets/img/Celestial_Gate.png", narration:"Battle begins.", choices:[{text:"Continue", next:"scene1"}] },
    humansElder:{ text:"The elder speaks...", background:"assets/img/Village_Square.png", narration:"Wisdom shared.", choices:[{text:"Continue", next:"scene1"}] },
    humansHelp:{ text:"You help the villagers...", background:"assets/img/Village_Square.png", narration:"Gratitude follows.", choices:[{text:"Continue", next:"scene1"}] },
    demonsFight:{ text:"You clash with shadows...", background:"assets/img/Shadow_Forest.png", narration:"Blood and storm.", choices:[{text:"Continue", next:"scene1"}] },
    demonsHide:{ text:"You hide and listen...", background:"assets/img/Shadow_Forest.png", narration:"Silence and scent.", choices:[{text:"Continue", next:"scene1"}] },
    demonsAltar:{ text:"The altar hums...", background:"assets/img/Shadow_Forest.png", narration:"Dark rites awaken.", choices:[{text:"Continue", next:"scene1"}] }
  }
};
