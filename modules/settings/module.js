let Plugin = require('../../class/plugin');

let strings = require('./strings');

module.exports.initialize = function()
{
    let options = {
        'name'                  : 'settings',
        'adminButtonLables'     : [],
        'userButtonLables'      : [],
        'adminRouter'           : adminRoute,
        //'userRouter'            : userRoute,
        'settingOptions'        : {},
        'languageStringPackage' : strings,
        'mongooseModels'        : {},
    };

    return new Plugin(options);
}

async function adminRoute()
{

}

async function userRoute()
{
    
}