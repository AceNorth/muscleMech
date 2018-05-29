import { Builders } from '../FactionLibrary';

const BuilderBuildings = {
  attackUp: {
    type: 'Building',
    faction: 'Builders',
    factionKey: 'Builders',
    factionColor: Builders.factionColor,
    title: 'Builders are building a LIGHTNING SPIRE!!',
    description: 'The Builders are building a LIGHTNING SPIRE! If they succeed, their ATTACKS will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'attackUp',
      message: 'A mighty LIGHTNING SPIRE pierces the Builders skyline!' 
    },
    {
        type: 'ATTACK_UP',
        payload: 1,
        message: "The armies of the Builders become STRONGER!"
    },
    {
      type: 'UNLOCK_NEW_BUILDING',
      buildingKey: 'attackUp',
      message: ''
    },
    {
      type: 'MAKE_ACTION_MORE_LIKELY',
      payload: 'ATTACK',
      message: 'The Builders become more warlike!!'
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
        factionKey: 'Builders',
        message: 'The LIGHTNING SPIRE lies in ruins!!'
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
    faction: 'Builders',
    factionKey: 'Builders',
    factionColor: Builders.factionColor,
    title: 'Builders is building a NANOBOT MESH!',
    description: 'Builders is building a NANOBOT MESH! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'defenseUp',
      message: "A mighty NANOBOT MESH swarms around the Builders' Compound!" 
    },
    {
        type: 'DEFENSE_UP',
        payload: 1,
        message: "The walls of the Builders become STRONGER!"
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
        factionKey: 'Builders',
        message: 'The NANOBOT MESH lies in ruins!!'
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
    faction: 'Builders',
    factionKey: 'Builders',
    factionColor: Builders.factionColor,
    title: 'Builders are building a REINFORCED SHIELD WALL!',
    description: 'Builders are building a REINFORCED SHIELD WALL! If they succeed, their DEFENSES will be STRONGER!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'CONSTRUCT_BUILDING',
      buildingKey: 'hpUp',
      message: "A mighty REINFORCED SHIELD WALL surrounds the Builders' Compound!" 
    },
    {
        type: 'hp_UP',
        payload: 1,
        message: "The shields of the Builders become STRONGER!"
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
        factionKey: 'Builders',
        message: 'The REINFORCED SHIELD WALL lies in ruins!!'
      },
      {
        type:'REMOVE_PIECE',
        message: ''
      }
      ],
    }]
  },
};

export default BuilderBuildings;
