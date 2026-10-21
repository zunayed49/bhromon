// All photography is hot-linked from Unsplash (free to use under the Unsplash License).
// `photo(id, width)` builds a resized, auto-format URL so each slot loads only what it needs.
export const photo = (id, width = 800, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75${extra}`

export const avatar = (id) => photo(id, 120, '&h=120&crop=faces')

export const IMG = {
  heroHills: '1715922808700-f707baae4bb5',
  seaOfClouds: '1658383898607-6b92e8196e33',
  sajekVillage: '1658383895221-173f07c6a9d0',
  greenValley: '1673632417072-b1366fda0e22',
  hillView: '1639330484340-38edb3d8ee9d',
  nilgiri: '1624485871361-65454b13edfa',
  bandarbanFalls: '1730877870263-9df7b1c6c239',
  coxBoats: '1587222318667-31212ce2828d',
  coxLoneBoat: '1608958435020-e8a7109ba809',
  coxSunset: '1711077470004-cb6a7258c082',
  coxWaves: '1609501285437-4eb001f82684',
  mangroveMist: '1549300461-11c5b94e8855',
  spottedDeer: '1706459671568-9809c9d13430',
  mangroveForest: '1607441078533-77ba814b1e5d',
  forestTrail: '1540018177157-957400dbd08a',
  teaField: '1706444326115-6a659b5cfda5',
  teaShade: '1702898539404-14364aca16ad',
  teaHill: '1667120205301-a2a3a886886e',
  jaflongRiver: '1643001607577-0a0332e79aab',
  jaflongHills: '1634962546038-b7eddb268dd7',
  ratargulBoat: '1723997014511-6cb608841628',
  ratargulRoots: '1715979021606-67799c6e9668',
  stMartinShore: '1677252368287-7796ef96f387',
  stMartinPalms: '1608922962250-66b89f5deb06',
  kaptaiLake: '1642179335770-82d5ffc4b439',
  kaptaiHills: '1645985926275-d2184d7c2d5c',
  kuakataBoat: '1710411592496-e9ee76b47806',
  lalbaghFort: '1642752970033-dcf85e55cc7c',
  ahsanManzil: '1693585172757-b9e057feb878',
  sixtyDome: '1667069254957-bf6961fd3fb5',
  hillTrain: '1644770633699-5129770e0404',
  riverSunset: '1712801285167-acaa4b89fbf3',
  harbourBoats: '1714418903796-addc2facacd3',
  rickshaw: '1762347130011-ce984d75bf81',
  packing: '1502301197179-65228ab57f78',
  villageSunset: '1679029524057-7065d479da5c',
  paddyPalms: '1642832520839-a30ac9bcadd9',
}

export const PEOPLE = {
  nusrat: '1775486101687-1950422dbca7',
  tanvir: '1774437676976-655ad890b6ff',
  farhana: '1759840278361-f1adc75529a1',
  arif: '1609770653328-a4d1dd377970',
  sadia: '1771507213365-c6047b40e2e1',
  imran: '1713173922799-42c38fc7359c',
}
