export const generateRandomMission = function(lvl = 1) {
  let missionLevel = Math.floor(Math.random() * lvl) + 1;
  return {
    type: 'Sidequest',
    isActive: true,
    faction: 'Neutral',
    factionColor: '#ad49ff',
    title: 'LEVEL ' + missionLevel + ' NIGHTMARE INCURSION!',
    description: threatDescriptions[Math.floor(Math.random() * threatDescriptions.length)] + ' reported ' + areas[Math.floor(Math.random() * areas.length)],
    currentCountdown: 259200,
    maxCountdown: 259200,
    countdownActions: [{
        type: "DISAPPEAR",
        payload: '',
        message: 'A foe has escaped back into the Dark Dimension!!'
        }],
    missions: [
      {
        maxStrength: 100 * missionLevel,
        currentStrength: 100 * missionLevel,
        specialAbilities: [{type: "NOTHING"}],
        title: 'DEFEAT A LEVEL ' + missionLevel + ' NIGHTMARE INCURSION!',
        description: 'Defeat ' + opponents[Math.floor(Math.random() * opponents.length)] + '!!',
        missionCompleteActions: [{
          type:'REMOVE_PIECE',
          payload: '',
          message: 'NICE JOB!'
        }],
      }
    ]
  }
}

const threatDescriptions = [
'Puny force',
'Rabble',
'Unruly mob',
'Minor force',
'Terrifying assemblage',
'Shadowy mob',
'Mysterious group',
'Major force',
'Frightening multitude',
'Terrifying horde',
'Unexpected army',
'Apocalyptic force'
];

const opponents = [
	"an army of tiny skeletons",
	'a mob of disgruntled mutant spacemen',
  'previously-normal townsfolk now infused with NIGHTMARE POWER from the Dark Dimension, finally repaying years of petty slights from their neighbors through BLASTING THEM WITH DARK LIGHTNING',
  'Kevin again',
  'what looks like just tentacles but I mean a TON of tentacles',
  'a howling mob of Nightmare Shapes',
  'a floating, humming Kidnap Cube that keeps trying to pull people into its mysterious interior',
	'the unprecedented gathering of slimes, oozes, puddings, and jellies',
	'the refugees from a neighboring, even more poorly funded, recently overrun outpost',
  "one million snakes delivering cold vengeance as per the Serpent God's orders",
  "the Six-person crew of a crashed spaceship, seeking a sheltered spot to repair their escape craft, near-invulnerable in powered armor, death rays mowing down men-at-arms at will, zero regard for human life, they are just not interested",
  "fully half of our outpost's own forces, subject to destructive madness after consuming Dr. Vanderbilt's delicious experimental food products"
]

const areas = [ 
  'in the Swamp of Doom!',
  'past the Lizard Farms!',
  "near the Mad Turtaloid's experimental dirigible facility!",
  'beneath the Levitating Pyramid!',
  'menacing the camp of the lawful spiders!',
  "out by Otch the Star-Ogre's Lifepod Rental!",
  "in the guest caves of the man-ape philosopher king!",
  "at the Questing Knight's embattled sanctuary!",
  "near the Slime Lodge of the sympathetic slug-folk!",
  "pursuing the Worm-man nomads!",
  "preying on the Drone harem of the Antlion Queen!"
 ]