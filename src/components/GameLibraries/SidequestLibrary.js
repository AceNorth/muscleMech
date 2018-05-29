const Sidequests = {
  experimentalPylon1: {
    type: 'Sidequest',
    faction: 'Special',
    factionKey: 'Special',
    factionColor: '#f78c45',
    title: 'Some of our citizens have gone berserk with PYLON MADNESS!!!!',
    description: "'I told you the pylon might have side effects!' shouts Dr. Vanderbilt, through the reinforced door of his lab. A distant roaring exhoes through the streets, and you hear a window shatter.",
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'FACTION_HP_DOWN',
      payload: 1,
      targetKey: 'Player',
      message: 'New Playerville has been heavily damaged by its pylon-mad citizens!'
    },
    {
      type: 'FACTION_ATTITUDE_DOWN',
      factionHated: 'Player',
      amount: 10,
      factionDoingTheHating: 'Player',
      message: "'Thanks for nothing bud' say the citizens of New Playerville" 
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: 'The Pylon Madness has passed! New Playerville is calm once again.'
    },
    ],
    missions: [{
      maxStrength: 100,
      currentStrength: 100,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Calm the situation!',
      description: "Blast a few peeps until the citizens calm down! NON-LETHALLY of course. Listen it's not like your mech suit has a 'Let's all sit down and talk this over' button on it. You've basically got a blaster and that's it, and if all you've got is a hammer these Pylon-mad citizens look an awful lot like Pylon-mad nails",
      missionCompleteActions: [
      {
        type: 'FACTION_ATTITUDE_UP',
        factionLiked: 'Player',
        amount: 10,
        factionDoingTheLiking: 'Player',
        message: 'New Playerville is grateful to you for helping!'  
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: 'The Pylon maniacs lie peacefully unconscious in the streets! Hopefully when they wake up the madness will have passed. Good job!'
      }],
    }
    ]
  },
  dimensionalBlaster1: {
    type: 'Sidequest',
    faction: 'Special',
    factionKey: 'Special',
    factionColor: '#f78c45',
    title: "You've opened a LITTLE BITTY tear in reality!!",
    description: "A blast from your Dimensional Blaster has opened a small tear in the fabric of reality! As you watch, horrible shadow versions of your colony's citizens begin pulling themselves through the tear, crackling with dark energy.",
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [
    {
      type: 'FACTION_HP_DOWN',
      payload: 1,
      targetKey: 'Player',
      message: 'New Playerville has been devastated by the invaders from the Dark Dimension!'
    },
    {
      type: 'FACTION_ATTITUDE_DOWN',
      factionHated: 'Player',
      amount: 10,
      factionDoingTheHating: 'Player',
      message: "'Thanks for nothing bud' say the citizens of New Playerville." 
    },
    {
      type: 'DISAPPEAR',
      payload: '',
      message: 'The Dimensional Rift has closed! New Playerville is calm once again.'
    },
    ],
    missions: [{
      maxStrength: 500,
      currentStrength: 500,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Send them back into the rift!',
      description: "Jump right in and blast these interdimensional creeps!!",
      missionCompleteActions: [
      {
        type: 'FACTION_ATTITUDE_UP',
        factionLiked: 'Player',
        amount: 10,
        factionDoingTheLiking: 'Player',
        message: 'The citizens of New Playerville clap and cheer uncertainly as you blast their doppelgangers!'  
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: 'The shrieking invaders flee back into the Dark Dimension, closing the rift behind them!!'
      }],
    },
    {
      maxStrength: 800,
      currentStrength: 800,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Run into the rift and blast their town as payback!',
      description: "Shouldering aside the bewildered invaders, you leap through the rift into the Dark Dimension and come face to face with... YOUR OWN EVIL TWIN!",
      missionCompleteActions: [
      {
        type: 'GAIN_POWER',
        payload: 500,
        message: 'Your dark doppelganger topples over in defeat! You earn 500 bonus power!'
      },
      {
        type: 'FACTION_ATTITUDE_UP',
        factionLiked: 'Player',
        amount: 10,
        factionDoingTheLiking: 'Player',
        message: 'The citizens of New Playerville clap and cheer enthusiastically as you reappear through the rift!!'  
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: "The shrieking invaders flee back into the Dark Dimension, closing the rift behind them!! They'll think twice before trespassing in YOUR town again."
      }
      ],
    }
    ]
  },
  dimensionalArk: {
    type: 'Sidequest',
    faction: 'Special',
    factionKey: 'Special',
    factionColor: '#f78c45',
    title: "Invade the DARK DIMENSION!!",
    description: "The Dimensional Ark has opened a portal to the Dark Dimension! Nightmare creatures begin to pour through in a gibbering horde!!",
    currentCountdown: 86400,
    maxCountdown: 86400,
    countdownActions: [
    {
      type: 'FACTION_HP_DOWN',
      payload: 1,
      targetKey: 'Player',
      message: 'New Playerville is devastated by the invaders from the Dark Dimension!'
    },
    {
      type: 'FACTION_ATTITUDE_DOWN',
      factionHated: 'Player',
      amount: 10,
      factionDoingTheHating: 'Player',
      message: "The citizens of New Playerville do their best to hold off the invaders!" 
    },
    ],
    missions: [{
      maxStrength: 1000,
      currentStrength: 1000,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Into the breach!!',
      description: "Destroy the Nightmare Core to stop the invasion once and for all!!",
      missionCompleteActions: [
      {
        type: 'GAIN_POWER',
        payload: 2000,
        message: 'The fabric of reality begins to twist and shatter as you blast the Nightmare Core to smithereens! You leap back through the portal just as the Dark Dimension implodes!'
      },
      {
        type: 'WIN_GAME',
        message: "The rift closes shut behind you, hopefully for the last time. A cheer goes up as, untethered to any reality, the nightmarish invaders dissolve into howling mist! You've won!"  
      },
      {
        type:'REMOVE_PIECE',
        payload: '',
        message: 'CONGRATULATIONS!!'
      }],
    }]
  },
  
}

export default Sidequests;