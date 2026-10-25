import { FrogStage, QuizQuestion, ObservationTarget } from '../types/frog';

export const POND_MAIN_IMAGE = '/src/assets/images/frog_lifecycle_magical_pond_1792904187753.jpg';

export const FROG_STAGES: FrogStage[] = [
  {
    id: 'oeufs',
    stepNumber: 1,
    name: 'Les Œufs Translucides',
    subtitle: 'La ponte en grappe protectrice',
    scientificTerm: 'Oviposition & Morula',
    duration: '6 à 21 jours',
    habitat: 'Sous l’eau, amarrés aux tiges aquatiques',
    respiration: 'Diffusion d’oxygène à travers la membrane gélatineuse',
    alimentation: 'Réserves vitellines (jaune d’œuf nutritif)',
    keyFeature: 'Une enveloppe gélatineuse qui gonfle dans l’eau pour amortir les chocs et réchauffer l’embryon au soleil.',
    description:
      'La grenouille femelle dépose des centaines, parfois des milliers d’œufs translucides dans les eaux calmes de l’étang. Chaque sphère contient un point noir : l’embryon qui grandit paisiblement à l’abri des prédateurs.',
    pin: { x: 14, y: 62 },
    zone: 'underwater',
    image: '/src/assets/images/frog_stage_eggs_1792904188599.jpg',
    didYouKnow:
      'La gelée entourant chaque œuf agit comme une minuscule serre solaire, retenant la chaleur de l’eau pour accélérer l’éclosion !',
  },
  {
    id: 'tetard_jeune',
    stepNumber: 2,
    name: 'Le Têtard Nageur',
    subtitle: 'Éclosion & respiration branchiale',
    scientificTerm: 'Larve aquatique (Branchies externes)',
    duration: '4 à 6 semaines',
    habitat: 'Herbiers sous-marins et rochers bioluminescents',
    respiration: 'Branchies externes en panache, puis internes',
    alimentation: 'Algue microscopique, débris végétaux et diatomées (herbivore)',
    keyFeature: 'Une longue queue propulsive dotée d’une nageoire fine pour zigzaguer entre les racines aquatiques.',
    description:
      'À l’éclosion, le têtard s’accroche aux plantes avec un disque buccal. Il commence à nager frénétiquement en quête de micro-algues. Ses branchies filtrent l’oxygène dissous dans l’étang.',
    pin: { x: 34, y: 74 },
    zone: 'underwater',
    image: '/src/assets/images/frog_stage_tadpole_1792904189567.jpg',
    didYouKnow:
      'À ce stade, le tube digestif du têtard est très long et enroulé en spirale, parfait pour digérer les fibres végétales !',
  },
  {
    id: 'tetard_pattes',
    stepNumber: 3,
    name: 'Le Têtard Métamorphe',
    subtitle: 'Apparition des pattes arrière & poumons',
    scientificTerm: 'Métamorphose intermédiaire',
    duration: '6 à 9 semaines',
    habitat: 'Eaux peu profondes, proche de la surface',
    respiration: 'Transition branchies internes vers poumons aériens',
    alimentation: 'Omnivore : algues et petits micro-invertébrés d’eau douce',
    keyFeature: 'Ses membres postérieurs apparaissent en premier pour propulser ses premiers sauts aquatiques.',
    description:
      'Une transformation fascinante s’opère : deux puissantes pattes arrière émergent, suivies peu après des pattes avant. À l’intérieur, de petits poumons se forment, incitant le têtard à venir gober l’air à la surface.',
    pin: { x: 58, y: 68 },
    zone: 'underwater',
    image: '/src/assets/images/frog_stage_tadpole_1792904189567.jpg',
    didYouKnow:
      'Les pattes avant se forment sous la peau du têtard et ne percent la membrane operculaire que quelques jours avant la sortie de l’eau !',
  },
  {
    id: 'grenouillette',
    stepNumber: 4,
    name: 'La Jeune Grenouillette',
    subtitle: 'Sortie sur la rive & résorption de la queue',
    scientificTerm: 'Grenouille subadulte',
    duration: '10 à 14 semaines',
    habitat: 'Berges moussues, galets humides et lisières aquatiques',
    respiration: 'Pulmonaire et cutanée (la peau doit rester humide)',
    alimentation: 'Petits insectes, moustiques, pucerons d’eau (carnivore)',
    keyFeature: 'Sa queue ne tombe pas : elle est absorbée de l’intérieur pour nourrir l’organisme durant la métamorphose.',
    description:
      'La jeune grenette grimpe pour la première fois hors de l’eau sur les pierres moussues. Sa queue rétrécit de jour en jour tandis que sa bouche s’élargit et que sa vue s’adapte à la chasse des insectes terrestres.',
    pin: { x: 84, y: 59 },
    zone: 'shore',
    image: '/src/assets/images/frog_stage_froglet_1792904189467.jpg',
    didYouKnow:
      'Pendant la résorption de la queue, la grenouillette n’a presque pas besoin de manger : les nutriments de sa queue sont recyclés par son métabolisme !',
  },
  {
    id: 'grenouille_adulte',
    stepNumber: 5,
    name: 'La Grenouille Adulte',
    subtitle: 'La reine amphibie de l’étang',
    scientificTerm: 'Anura (Ranidae)',
    duration: 'Plusieurs années (5 à 12 ans)',
    habitat: 'Grands nénuphars, étangs calmes, roseaux et sous-bois humides',
    respiration: 'Poumons et respiration par la peau (cutanée)',
    alimentation: 'Chasseresse carnivore : mouches, libellules, vers, coléoptères',
    keyFeature: 'Pattes palmées ultra-puissantes capables de sauter plus de 20 fois la longueur de son corps.',
    description:
      'Perchée majestueusement sur son nénuphar sous la lueur de la lune, la grenouille adulte maîtrise l’eau comme la terre. Ses sacs vocaux entonnent un concert nocturne pour attirer un partenaire et recommencer le cycle enchanté.',
    pin: { x: 77, y: 35 },
    zone: 'surface',
    image: '/src/assets/images/frog_stage_adult_1792904189843.jpg',
    didYouKnow:
      'Une grenouille peut boire de l’eau sans jamais ouvrir la bouche : elle l’absorbe directement à travers la peau perméable de son abdomen !',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Comment les têtards respirent-ils dès leur sortie de l’œuf ?',
    options: [
      'Par des branchies qui captent l’oxygène dans l’eau',
      'Avec des poumons comme les humains',
      'En retenant leur souffle sans arrêt',
      'Par le bout de leur longue queue',
    ],
    correctIndex: 0,
    explanation: 'Comme les poissons, les jeunes têtards possèdent des branchies pour respirer sous l’eau avant de développer des poumons.',
    funFact: 'Leurs branchies sont d’abord visibles à l’extérieur comme des petites plumes sur les côtés du cou !',
  },
  {
    id: 2,
    question: 'Que devient la queue du têtard quand il se transforme en grenouillette ?',
    options: [
      'Elle se détache et tombe au fond de l’eau',
      'Elle est absorbée de l’intérieur pour nourrir son corps',
      'Elle se transforme en troisième patte arrière',
      'Elle s’enroule autour de son ventre',
    ],
    correctIndex: 1,
    explanation: 'C’est un phénomène cellulaire incroyable appelé autophagie : le corps recycle entièrement la matière de la queue en énergie.',
    funFact: 'Ce recyclage évite à la grenouillette de mourir de faim le temps que sa bouche s’adapte à la chasse !',
  },
  {
    id: 3,
    question: 'Quel changement d’alimentation s’opère au cours de la métamorphose ?',
    options: [
      'Le têtard est carnivore et la grenouille devient végétarienne',
      'Le têtard herbivore (algues) devient une grenouille carnivore (insectes)',
      'La grenouille ne se nourrit que d’eau de pluie',
      'Ils ne mangent que des graines tombées des arbres',
    ],
    correctIndex: 1,
    explanation: 'Le têtard broute les algues microscopiques, puis son estomac change totalement pour devenir un prédateur carnivore d’insectes.',
    funFact: 'La langue de la grenouille adulte est fixée à l’avant de sa bouche et peut se déployer en un éclair collant !',
  },
  {
    id: 4,
    question: 'À quoi sert la gelée transparente qui entoure chaque œuf ?',
    options: [
      'Uniquement à faire flotter l’œuf très haut dans l’air',
      'À protéger des chocs, des bactéries et à capter la chaleur du soleil',
      'À fabriquer de la confiture magique pour les fées',
      'À cacher les œufs sous la boue sans lumière',
    ],
    correctIndex: 1,
    explanation: 'La substance gélatineuse gonfle au contact de l’eau et protège l’embryon des prédateurs tout en créant un mini effet de serre.',
    funFact: 'Certains poissons refusent de manger la ponte à cause du goût désagréable de la gélatine.',
  },
  {
    id: 5,
    question: 'Quels membres apparaissent en premier chez le têtard ?',
    options: [
      'Les pattes avant (avec les doigts)',
      'Les pattes arrière (pour nager et sauter)',
      'Les petites oreilles externes',
      'Les quatre pattes en même temps',
    ],
    correctIndex: 1,
    explanation: 'Les pattes postérieures (arrière) sortent en premier à la base de la queue, permettant au têtard d’apprendre la propulsion.',
    funFact: 'Les pattes avant se développent discrètement sous la peau operculaire avant de percer soudainement !',
  },
];

export const OBSERVATION_TARGETS: ObservationTarget[] = [
  {
    id: 'eggs',
    title: 'La grappe d’œufs luminescents',
    clue: 'Cherche dans le monde sous-marin, tout à gauche, accroché aux tiges.',
    hitbox: { xMin: 6, xMax: 22, yMin: 50, yMax: 76 },
    found: false,
    discoveredText: 'Bravo ! Tu as repéré la ponte translucide. Des dizaines de futurs têtards y sont protégés !',
  },
  {
    id: 'tadpoles',
    title: 'Les têtards nageurs',
    clue: 'Observe le centre des eaux turquoise, parmi les algues brillantes.',
    hitbox: { xMin: 25, xMax: 65, yMin: 60, yMax: 88 },
    found: false,
    discoveredText: 'Superbe œil de naturaliste ! Les têtards zigzaguent joyeusement avec leur queue motrice.',
  },
  {
    id: 'froglet',
    title: 'La grenouillette sur son rocher',
    clue: 'Sur la berge moussue à droite, à la frontière entre l’eau et l’air.',
    hitbox: { xMin: 76, xMax: 92, yMin: 50, yMax: 72 },
    found: false,
    discoveredText: 'Magnifique ! La jeune grenette a encore sa petite queue, prête à faire son premier saut terrestre.',
  },
  {
    id: 'adult',
    title: 'La grande grenouille sur le nénuphar',
    clue: 'Perchée à la surface sur une grande feuille ronde illuminée.',
    hitbox: { xMin: 62, xMax: 89, yMin: 20, yMax: 46 },
    found: false,
    discoveredText: 'Extraordinaire ! La grenouille adulte veille sur l’étang étincelant sous la lune d’argent.',
  },
  {
    id: 'moon',
    title: 'Le croissant de lune & les lucioles',
    clue: 'Lève les yeux vers le ciel étoilé au-dessus de la canopée nocturne.',
    hitbox: { xMin: 58, xMax: 74, yMin: 2, yMax: 20 },
    found: false,
    discoveredText: 'Féerique ! La douce lune en croissant et les lucioles dorées baignent l’étang d’une aura enchantée.',
  },
];
