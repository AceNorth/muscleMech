export const allFactions = [
  'Fighters',
  'Builders',
  'Diplomats',
];

export const Player = {
	displayName: 'New Playerville',
  factionKey: 'Player',

  possibleActions: ["ATTACK", "BUILD", "DIPLOMACY"],
  availableBuildings: ["attackUp", "defenseUp", "hpUp"],
  startingBuildings: {
    attackUp: false,
    defenseUp: false,
    hpUp: false,
  },
  startingAttackLevel: 1,
  startingDefenseLevel: 0,
  startingHP: 3,

	factionColor: '#96a4ff',

  armyNames: [
    "our doughty lads and lasses"
  ],

  baseNames: [
  	"New Playerville"
  ],

  bossPiece: {
    type: 'Boss',
    faction: 'Player',
    factionKey: 'Player',
    factionColor: '#96a4ff',
    title: 'A power pylon!',
    description: 'A pylon supplying us with extra POWER PER DAY!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'GAIN_POWER',
      payload: 1000,
      message: 'The power pylon discharges 1000 power into our stores!'
    }
    ],
    missions: [{
      maxStrength: 3000,
      currentStrength: 3000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Destroy the power pylon!',
      description: 'Why would you want to do this?!',
      missionCompleteActions: [{
        type:'REMOVE_PIECE',
        payload: '',
        message: 'You destroyed the power pylon! Uh. Good job I guess?'
      }],
    }],
  }
}

export const Fighters = {
  displayName: 'Turtaloids',
  factionKey: 'Fighters',

  possibleActions: ["ATTACK", "ATTACK", "BUILD", "DIPLOMACY"],
  availableBuildings: ["attackUp", "defenseUp", "hpUp"],
  startingBuildings: {
    attackUp: false,
    defenseUp: false,
    hpUp: false,
  },
  startingAttackLevel: 1,
  startingDefenseLevel: 0,
  startingHP: 3,

  factionColor: '#ff2b2b',

  armyNames: [
    "spike-shelled Turtaloid berserkers"
  ],

  baseNames: [
    "Rough Boys Base"
  ],

  bossPiece: {
    type: 'Boss',
    faction: 'Fighterville',
    factionKey: 'Fighters',
    factionColor: '#ff2b2b',
    title: 'King Turtle Berserker!',
    description: 'A giant monster created by the battle-mages of Fighterville!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'ATTACK_RANDOM_OPPONENT',
      payload: 3,
      message: 'King Turtle Berskerker SMASHES!'
    }
    ],
    missions: [{
      maxStrength: 3000,
      currentStrength: 3000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Destroy King Turtle Berserker!',
      description: 'Aaaaargh!!',
      missionCompleteActions: [
      {
        type:'GAIN_POWER',
        payload: 2000,
        message: "You earn 2000 bonus power!"
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: "You destroyed King Turtle Berserker! You're a legend!"
      }
      ],
    }],
  }
};

export const Builders = {
  displayName: 'Builderville',
  factionKey: 'Builders',

  possibleActions: ["ATTACK", "BUILD", "BUILD", "DIPLOMACY"],
  availableBuildings: ["attackUp", "defenseUp", "hpUp"],
  startingBuildings: {
    attackUp: false,
    defenseUp: false,
    hpUp: false,
  },
  startingAttackLevel: 1,
  startingDefenseLevel: 0,
  startingHP: 3,

  factionColor: '#7f7575',

  armyNames: [
    "little robot guys"
  ],

  baseNames: [
    "Robot Base"
  ],

  bossPiece: {
    type: 'Boss',
    faction: 'Builderville',
    factionKey: 'Builders',
    factionColor: '#7f7575',
    title: 'A GIANT ROBOT!',
    description: 'Builderville built a giant robot!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'DEFENSE_UP',
      payload: 1,
      message: "The Giant Robot reinforces the walls of BUILDERVILLE!"
    },
    {
      type: 'ATTACK_UP',
      payload: 1,
      message: "The armies of Builderville are inspired by the Giant Robot!"
    },
    {
      type: 'ATTACK_MOST_HATED_OPPONENT',
      payload: 1,
      message: "The Giant Robot smashes Builderville's most HATED OPPONENT!"
    },
    ],
    missions: [{
      maxStrength: 3000,
      currentStrength: 3000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Destroy the giant robot!',
      description: 'Aaaaargh!!',
      missionCompleteActions: [
      {
        type:'GAIN_POWER',
        payload: 2000,
        message: "You earn 2000 bonus power!"
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: "You destroyed the giant robot! You're a legend!!!"
      }],
    }],
  }
};

export const Diplomats = {
  displayName: 'The Flower Folk',
  factionKey: 'Diplomats',

  possibleActions: ["ATTACK", "BUILD", "DIPLOMACY"],
  availableBuildings: ["attackUp", "defenseUp", "hpUp"],
  startingBuildings: {
    attackUp: false,
    defenseUp: false,
    hpUp: false,
  },
  startingAttackLevel: 1,
  startingDefenseLevel: 0,
  startingHP: 3,

  factionColor: '#66d184',

  armyNames: [
    "big rough dudes with flowers in they beards",
    "ladies with linen skirts and enormous biceps"
  ],

  baseNames: [
    "The Tree House"
  ],

  bossPiece: {
    type: 'Boss',
    faction: 'Flower Folk',
    factionKey: 'Diplomats',
    factionColor: '#66d184',
    title: 'A GIANT WALKING TREE!',
    description: 'The Flower Folk built a Giant Walking Tree!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'DEFENSE_UP',
      payload: 1,
      message: "The Giant Walking Tree reinforces the Flower Folk's Walls!"
    },
    {
      type: 'ATTACK_UP',
      payload: 1,
      message: "The Flower Folk's armies are inspired by the Giant Walking Tree!"
    },
    {
      type: 'ATTACK_MOST_HATED_OPPONENT',
      payload: 1,
      message: "The Giant Walking Tree smashes The Flower Folk's most HATED OPPONENT!"
    },
    ],
    missions: [{
      maxStrength: 3000,
      currentStrength: 3000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Destroy the Giant Walking Tree!',
      description: 'Aaaaargh!!',
      missionCompleteActions: [
      {
        type:'GAIN_POWER',
        payload: 2000,
        message: "You earn 2000 bonus power!"
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: "You destroyed the giant walking tree! You're a legend!"
      }],
    }],
  }
};
