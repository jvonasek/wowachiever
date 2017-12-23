const Downloader = require('./Downloader');
const config = require('../src/config/local');
const { processAchData, processRealmData } = require('./dataProcessors');

const { API_KEY } = config;

// achievements.json
const achievementsEndpoint = `https://eu.api.battle.net/wow/data/character/achievements?locale=en_GB&apikey=${API_KEY}`;
const achievements = new Downloader(achievementsEndpoint, '/public/data/achievements.json', processAchData);
achievements.download();

// realms.json
const realmsEndpoint = [
  `https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=${API_KEY}`,
  `https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=${API_KEY}`,
];
const realms = new Downloader(realmsEndpoint, '/public/data/realms.json', processRealmData);
realms.download();
