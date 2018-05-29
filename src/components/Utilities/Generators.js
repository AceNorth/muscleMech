import * as FactionLibrary from '../GameLibraries/FactionLibrary';

export const generateBase = function(factionObj, baseName) {
    let newBase = {
        displayName: factionObj.displayName,
        factionKey: factionObj.factionKey,
        possibleActions: factionObj.possibleActions,
        availableBuildings: factionObj.availableBuildings,
        attackLevel: factionObj.startingAttackLevel,
        defenseLevel: factionObj.startingDefenseLevel,
        HP: factionObj.startingHP,
        buildingsConstructed: factionObj.startingBuildings,
        currentCountdown: 86400,
        maxCountdown: 86400,
        countdownActions: [{type: 'NOTHING'}],
        title: baseName || factionObj.baseNames[Math.floor(Math.random() * factionObj.baseNames.length)],
        description: 'This is the ' + factionObj.displayName + ' base!',
        factionColor: factionObj.factionColor,
        type: 'Base'
    };

    return newBase;
}

export const buildBoss = factionKey => {
  const faction = FactionLibrary[factionKey];
  return ({
    type: 'Building',
    displayName: faction.displayName,
    factionKey: faction.factionKey,
    factionColor: faction.factionColor,
    title: 'A secret project!!',
    description: faction.displayName + ' is working on something BIG!',
    currentCountdown: 604800,
    maxCountdown: 604800,
    countdownActions: [
    {
      type: 'DISAPPEAR',
      payload: '',
      message: 'Uh-oh!'
    },
    {
      type: 'SPAWN_NEW_PIECE',
      payload: faction.bossPiece,
      message: faction.displayName + ' have completed their project!!'
    },
    ],
    missions: [{
      maxStrength: 1000,
      currentStrength: 1000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Attack the construction site!',
      description: "Whatever these guys are up to, it can't be good! Disrupt the secret project!",
      missionCompleteActions: [
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: 'The facility lies in ruins! Whatever ' + faction.displayName + " were working on, you've put and end to it!"
      }
      ],
    }],
  })
}

export const generateDiplomacy = function(initiatorKey, recipientKey) {
  const initiator = FactionLibrary[initiatorKey];
  const recipient = FactionLibrary[recipientKey];

  return ({
    type: 'Diplomacy',
    displayName: initiator.displayName,
    factionKey: initiator.factionKey,
    factionColor: initiator.factionColor,
    title: 'A diplomatic summit!!',
    description: initiator.displayName + ' and ' + recipient.displayName + ' are meeting for peace talks!',
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'FACTION_ATTITUDE_UP',
      factionLiked: initiatorKey,
      amount: 10,
      factionDoingTheLiking: recipientKey,
      message: initiator.displayName + ' likes ' + recipient.displayName + ' better!'  
    },
    {
      type: 'FACTION_ATTITUDE_UP',
      factionLiked: recipientKey,
      amount: 10,
      factionDoingTheLiking: initiatorKey,
      message: recipient.displayName + ' likes ' + initiator.displayName + ' better!'  
    },
    {
      type: 'MAKE_ACTION_MORE_LIKELY',
      payload: 'DIPLOMACY',
      message: initiator.displayName + ' becomes more diplomatic!!'
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: 'The talks have concluded! A great day... for PEACE!'
    },
    ],
    missions: [{
      maxStrength: 500,
      currentStrength: 500,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Stop the peace talks!',
      description: 'This diplomacy must not be allowed! Disrupt the peace talks!',
      missionCompleteActions: [
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: 'The diplomats run screaming in all directions! Diplomacy DISRUPTED!'
      }
      ],
    }],
  })
}

export const generateAttack = function(attackerKey, defenderKey, attackLevel, defenseLevel) {
    const attacker = FactionLibrary[attackerKey];
    const defender = FactionLibrary[defenderKey];

    const attackingArmyName = attacker.armyNames[Math.floor(Math.random() * attacker.armyNames.length)];
    const defendingArmyName = defender.armyNames[Math.floor(Math.random() * defender.armyNames.length)]
    const location = locationLibrary[Math.floor(Math.random() * locationLibrary.length)]

    const descriptionLibrary = [
      `A platoon of ${attackingArmyName} have ambushed a squad of ${defendingArmyName} ${location}!`,
    ]

    const description = descriptionLibrary[Math.floor(Math.random() * descriptionLibrary.length)]

    return ({
            type: 'Attack',
            displayName: attacker.displayName,
            factionKey: attacker.factionKey,
            factionColor: attacker.factionColor,
            title: attacker.displayName + ' is attacking ' + defender.displayName + '!',
            description,
            currentCountdown: 259200,
            maxCountdown: 259200,
            countdownActions: [
            {
              type: 'DISAPPEAR',
              payload: '',
              message: 'The battle is concluded!'
            },
            {
              type: 'FACTION_ATTITUDE_DOWN',
              factionHated: 'Player',
              amount: 10,
              factionDoingTheHating: defender.factionKey,
              message: 'Thanks for nothing! says ' + defender.displayName + ' !'  
            },
            {
              type: 'DAMAGE_TARGET',
              payload: attackLevel,
              loserKey: defenderKey,
              winnerKey: attackerKey,
              message: attacker.displayName + ' smashes ' + defender.displayName + '!'
            }
            ],
            missions: [{
              maxStrength: defenseLevel * 1000,
              currentStrength: defenseLevel * 1000,
              specialAbilities: [{ type: "NOTHING" }],
              title: 'Help ' + attacker.displayName,
              description: 'Join in the attack against ' + defender.displayName + '!',
              missionCompleteActions: [
              {
                type:'REMOVE_PIECE',
                payload: '',
                message: ''
              },
              {
                type: 'FACTION_ATTITUDE_UP',
                factionLiked: 'Player',
                amount: 10,
                factionDoingTheLiking: attacker.factionKey,
                message: attacker.displayName + ' is grateful to you for helping!'  
              },
              {
                type: 'FACTION_ATTITUDE_DOWN',
                factionHated: 'Player',
                amount: 10,
                factionDoingTheHating: defender.factionKey,
                message: defender.displayName + ' is pretty peeved at you!'  
              },
              {
              type: 'DAMAGE_TARGET',
              payload: attackLevel + 1,
              loserKey: defenderKey,
              winnerKey: attackerKey,
              message: attacker.displayName + ' smashes ' + defender.displayName + 'with your help!'
              }
              ],
            },
            {
              maxStrength: attackLevel * 1000,
              currentStrength: attackLevel * 1000,
              specialAbilities: [{ type: "NOTHING" }],
              title: 'Help ' + defender.displayName,
              description: 'Leap to the defense of ' + defender.displayName + '!',
              missionCompleteActions: [
              {
                type:'REMOVE_PIECE',
                payload: '',
                message: ''
              },
              {
                type: 'FACTION_ATTITUDE_UP',
                factionLiked: 'Player',
                amount: 10,
                factionDoingTheLiking: defender.factionKey,
                message: defender.displayName + ' is extremely grateful!' 
              },
              {
                type: 'FACTION_ATTITUDE_DOWN',
                factionHated: 'Player',
                amount: 10,
                factionDoingTheHating: attacker.factionKey,
                message: attacker.displayName + ' is pretty peeved at you!' 
              }],
            }]
          })
};

const locationLibrary = [
  "at the Crack of Sass",
  "in the Swamp of Doom",
]
