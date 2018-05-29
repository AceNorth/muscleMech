import { Fighters } from '../FactionLibrary';

const FighterBuildings = {
  attackUp: {
    type: 'Building',
    faction: 'Fighters',
    factionKey: 'Fighters',
    factionColor: Fighters.factionColor,
    title: 'The Turtaloids are building an ATOMIC BLADEFORGE!',
    description: 'The Turtaloids are building an ATOMIC BLADEFORGE! If they succeed, their ATTACKS will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'attackUp',
      message: 'A mighty ATOMIC BLADEFORGE pierces the Turtalon skyline!' 
    },
    {
        type: 'ATTACK_UP',
        payload: 1,
        message: "The Turtalon armies become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'attackUp',
      message: ''
    },
    {
      type: 'MAKE_ACTION_MORE_LIKELY',
      payload: 'ATTACK',
      message: "The Turtaloids become more warlike, if that's possible!!"
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: ''
    },
    ],
    missions: [{
      maxStrength: 100,
      currentStrength: 100,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Attack the construction site!',
      description: 'This building must not be completed!! Destroy the construction in progress!',
      missionCompleteActions: [
      {
        type: 'RETURN_BUILDING_TO_ARRAY',
        buildingKey: 'attackUp',
        factionKey: 'Fighters',
        message: 'The ATOMIC BLADEFORGE lies in ruins!!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
  defenseUp: {
    type: 'Building',
    faction: 'Fighters',
    factionKey: 'Fighters',
    factionColor: Fighters.factionColor,
    title: 'The Turtaloids are building a TITANIUM OVERSHELL!!',
    description: 'The Turtaloids are building a TITANIUM OVERSHELL! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'defenseUp',
      message: 'The TITANIUM OVERSHELL encases the Turtaloid compound!' 
    },
    {
        type: 'DEFENSE_UP',
        payload: 1,
        message: "The walls the Turtaloids become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'defenseUp',
      message: ''
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: ''
    },
    ],
    missions: [{
      maxStrength: 100,
      currentStrength: 100,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Attack the construction site!',
      description: 'This building must not be completed!! Destroy the construction in progress!',
      missionCompleteActions: [
      {
        type: 'RETURN_BUILDING_TO_ARRAY',
        buildingKey: 'defenseUp',
        factionKey: 'Fighters',
        message: 'The TITANIUM OVERSHELL lies in ruins!!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
  hpUp: {
    type: 'Building',
    faction: 'Fighters',
    factionKey: 'Fighters',
    factionColor: Fighters.factionColor,
    title: 'The Turtaloids are building a SHELL WALL!',
    description: 'The Turtaloids are building a SHELL WALL! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'hpUp',
      message: "A mighty SHELL WALL rises around the Turtaloids Compound!" 
    },
    {
      type: 'HP_UP',
      payload: 1,
      message: "The shields of the Turtaloids become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'hpUp',
      message: ''
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: ''
    },
    ],
    missions: [{
      maxStrength: 100,
      currentStrength: 100,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Attack the construction site!',
      description: 'This building must not be completed!! Destroy the construction in progress!',
      missionCompleteActions: [
      {
        type: 'RETURN_BUILDING_TO_ARRAY',
        buildingKey: 'hpUp',
        factionKey: 'Fighters',
        message: 'The SHELL WALL has been reduced to splinters!!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
};

export default FighterBuildings;
