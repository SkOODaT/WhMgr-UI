'use strict';

const Localizer = require('../services/locale.js');
const GeofenceService = require('../services/geofence.js');

const svc = new GeofenceService.GeofenceService();
const config = require('../config.json');

const getPokemonNameIdsList = async () => {
    let pokemon = [];
    for (let i = 1; i < config.maxPokemonId; i++) {
        const pkmnIcon = await Localizer.getPokemonIcon(i);
        pokemon.push({
            'id': i,
            'id_3': (i + '').padStart(3, '0'),
            'name': Localizer.getPokemonName(i),
            'image_url': pkmnIcon,
        });
    }
    return pokemon;
};

const buildCityList = (guilds) => {
    let cities = [];
    for (let i = 0; i < svc.geofences.length; i++) {
        const geofence = svc.geofences[i];
        const configGuilds = config.discord.guilds;
        for (let j = 0; j < configGuilds.length; j++) {
            const configGuild = configGuilds[j];
            if (guilds.includes(configGuild.id) && configGuild.geofences.includes(geofence.name)) {
                cities.push({
                    'name': geofence.name,
                    'guild': configGuild.id,
                });
            }
        }
    }
    return cities;
};

module.exports = {
    getPokemonNameIdsList,
    buildCityList
};