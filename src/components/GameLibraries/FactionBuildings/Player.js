import { Player } from '../FactionLibrary';

const PlayerBuildings = {
  attackUp: {
    type: 'Building',
    faction: 'Player',
    factionKey: 'Player',
    factionColor: Player.factionColor,
    title: 'New Playerville is building a BLASTER RESEARCH LAB!',
    description: 'New Playerville is building a BLASTER RESEARCH LAB to develop new weapons for our troops!!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'attackUp',
      message: 'A mighty BLASTER RESEARCH LAB pierces the New Playerville skyline!' 
    },
    {
        type: 'ATTACK_UP',
        payload: 1,
        message: "The armies of New Playerville become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'attackUp',
      message: ''
    },
    {
      type: 'MAKE_ACTION_MORE_LIKELY',
      payload: 'ATTACK',
      message: 'New Playerville becomes more warlike!!'
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
        factionKey: 'Player',
        message: 'The BLASTER RESEARCH LAB lies in ruins!!'
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
    faction: 'Player',
    factionKey: 'Player',
    factionColor: Player.factionColor,
    title: 'New Playerville is building a GUARD TOWER!',
    description: 'New Playerville is building a GUARD TOWER to better protect our colony!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'defenseUp',
      message: 'A mighty GUARD TOWER pierces the New Playerville skyline!' 
    },
    {
        type: 'DEFENSE_UP',
        payload: 1,
        message: "The defenses of New Playerville become STRONGER!"
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
        factionKey: 'Player',
        message: 'The GUARD TOWER lies in ruins!!'
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
    faction: 'Player',
    factionKey: 'Player',
    factionColor: Player.factionColor,
    title: 'The citizens of New Playerville are building a SHIELD GENERATOR!',
    description: 'The citizens of New Playerville are building a SHIELD GENERATOR to improve our defenses!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'hpUp',
      message: "A new SHIELD hums to life around New Playerville!" 
    },
    {
      type: 'HP_UP',
      payload: 1,
      message: "The defenses of New Playerville become STRONGER!"
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
        factionKey: 'Player',
        message: 'The SHIELD GENERATOR lies in ruins!! Everyone in New Playerville is pretty peeved!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
};

export default PlayerBuildings;
