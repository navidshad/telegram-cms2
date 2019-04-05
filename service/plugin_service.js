let filWalker = require('../class/filewalker');

module.exports = class PluginManager
{
    constructor(detail)
    {
        this._pluginFolder = detail['pluginFolder'];
    }

    settingUp()
    {
        return this._getPlugins();
    }

    async _getPlugins(path)
    {

        return new Promise(async (resolve, reject) => 
        {
            let dir = (path) ? path : require('path').join( global.appRoot , 'modules');
            let option = {'filter':['.js'], 'name':'module'};

            this._modules = {};

            //get Mstr file paths
            let list = await filWalker.walk(dir, option).catch(reject);

            try {

                list.forEach(modulePath => 
                {
                    let emodule = require(modulePath).initialize();

                    if(!this._modules.hasOwnProperty('name'))
                        this._modules[emodule.name] = emodule;

                    else console.error(`${emodule.name} module has already added. ${modulePath}`);

                    console.log(`${emodule.name} module has been added`);
                });

                resolve();

            } catch (error) 
            {
                reject(error);
            }
        });
    }

    get(name)
    {
        if(this._modules.hasOwnProperty(name))
            return this._modules[name];
        else Console.log(`the module of ${name} doesn't exist`);
    }
}
