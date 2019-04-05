require('datejs');
let CMS = require('./sdk/cms');
let DataBase = require('./class/database');
let PluginService = require('./service/plugin_service');

async function createCMS(option)
{
    // let option = {
    //     'token'         : '',
    //     'administrator' : 654654,
    // }

    // get approot path
    global.appRoot = __dirname;

    // connect to db
    global.database = await DataBase(option.mongo);

    // luanch modules
    global.plugins = new PluginService({});
    await global.plugins.settingUp().then();

    // luanch cms
    let newCMSbot = new CMS(option);

    //newCMSbot.registerModules(moduleList);
}

module.exports = {
    createCMS
}