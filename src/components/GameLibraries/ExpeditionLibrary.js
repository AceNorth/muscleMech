const startingExpeditions = [
  {
    type: 'Expedition',
    faction: 'Special',
    uid: 'Expedition',
    factionKey: 'Special',
    factionColor: '#fffb1e',
    title: 'Explore the planet!',
    description: 'Maybe find something COOL on the PLANET!',
    missions: [{
      maxStrength: 50,
      currentStrength: 50,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Hunt for Power Crystals!',
      description: 'Search the dangerous wilds for valuable POWER CRYSTALS!!',
      missionCompleteActions: [{
        type:'GAIN_POWER',
        payload: 100,
        message: 'You find crystals worth 100 power!!'
      }],
    },
    {
      maxStrength: 100,
      currentStrength: 100,
      specialAbilities: [{ type: "NOTHING" }],
      title: 'Go on patrol!',
      description: 'Patrol the area!! Makes all other factions like you a little better.',
      missionCompleteActions: [
      {
        type: 'ALL_FACTION_ATTITUDES_UP',
        factionLiked: 'Player',
        amount: 5,
        message: 'Community policing makes us all safer! Sometimes!'  
      }],
    }]
  },
]

export default startingExpeditions;