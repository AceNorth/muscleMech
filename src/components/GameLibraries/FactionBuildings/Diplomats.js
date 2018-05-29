import { Diplomats } from '../FactionLibrary';

const DiplomatBuildings = {
  attackUp: {
    type: 'Building',
    faction: 'Diplomats',
    factionKey: 'Diplomats',
    factionColor: Diplomats.factionColor,
    title: 'The Flower Folk are building a THORNWHIP ARMOR FORGE!!',
    description: 'The Flower Folk are building a THORNWHIP ARMOR FORGE! If they succeed, their ATTACKS will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'attackUp',
      message: "A mighty THORNWHIP ARMOR FORGE pierces the Flower Folk's skyline!"
    },
    {
        type: 'ATTACK_UP',
        payload: 1,
        message: "The armies of the Flower Folk become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'attackUp',
      message: ''
    },
    {
      type: 'MAKE_ACTION_MORE_LIKELY',
      payload: 'ATTACK',
      message: 'The Flower Folk grow more warlike!!'
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
        factionKey: 'Diplomats',
        message: 'The THORNWHIP ARMOR FORGE lies in ruins!!'
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
    faction: 'Diplomats',
    factionKey: 'Diplomats',
    factionColor: Diplomats.factionColor,
    title: 'The Flower Folk are building a LIVING WALL!!',
    description: 'The Flower Folk are building a LIVING WALL! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'defenseUp',
      message: 'A mighty LIVING WALL envelops the arboreal base of the Flower Folk!' 
    },
    {
        type: 'DEFENSE_UP',
        payload: 1,
        message: "The walls of the Flower Folk become STRONGER!"
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
        factionKey: 'Diplomats',
        message: 'The LIVING WALL lies in ruins!!'
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
    faction: 'Diplomats',
    factionKey: 'Diplomats',
    factionColor: Diplomats.factionColor,
    title: 'The Flower Folk are building a DEEPROOT TREEVINE!',
    description: 'The Flower Folk are building a DEEPROOT TREEVINE! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'hpUp',
      message: "A mighty DEEPROOT TREEVINE surrounds the Flower Folk's Compound!" 
    },
    {
      type: 'HP_UP',
      payload: 1,
      message: "The shields of the Flower Folk become STRONGER!"
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
        factionKey: 'Diplomats',
        message: 'The DEEPROOT TREEVINE has been reduced to splinters!!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
};

export default DiplomatBuildings;
