let CMS = require('./sdk/cms');
let DataBase= require('./class/database');
require('datejs')

async function createCMS(option)
{
    // let option = {
    //     'token'         : '',
    //     'administrator' : 654654,
    // }

    // connect to db
    global.db = await DataBase(option.mongo);

    // luanch cms
    let newCMSbot = new CMS(option);

    //newCMSbot.registerModules(moduleList);
}

module.exports = {
    createCMS
}