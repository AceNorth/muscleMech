import SidequestLibrary from './SidequestLibrary';

const SidequestPacks = {
  dimensionalArk: {
    purchased: false,
    title: 'Dimensional Ark',
    cost: 10000,
    description: "Open a portal to the Dark Dimension and discover the source of the Nightmare Invasion!",
    sidequests: [],
    buildEffects: [{
      type: 'SPAWN_PIECE',
      payload: SidequestLibrary.dimensionalArk
    }]
  },
  dimensionalBlaster: {
    purchased: false,
    title: 'Dimensional Blaster',
    cost: 1000,
    description: "Our scientists have uncovered the secret of dimensional hopping, and can upgrade your suit with a Dimensional Blaster! Send your blasts through other dimensions, bypassing the enemy's armor entirely! Dr. Vanderbilt assures us that this is the best possible use for this technology.",
    sidequests: ['dimensionalBlaster1'],
    buildEffects: [{
      type: 'INCREASE_STAT',
      target: 'bonusDamage',
      value: 1
    }]
  },
  experimentalPylon: {
    purchased: false,
    title: 'Experimental Pylon',
    cost: 300,
    description: "Dr. Vanderbilt has designed an Experimental Pylon which will give us 10 power per day! 'Amongst other potential effects,' he adds under his breath, every time someone mentions it. Exciting!",
    sidequests: ['experimentalPylon1'],
    buildEffects: [{
      type: 'INCREASE_STAT',
      target: 'powerPerDay',
      value: 10
    }]
  },
  
};

export default SidequestPacks;