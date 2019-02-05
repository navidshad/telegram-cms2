class ModuleManager
{
    constructor(detail)
    {
        // mongo db path
        this._dbpath = detail['dbpath'];
        // plugin folders
        this._pluginFolder = detail['pluginFolder'];

        this.moduleString = {};
        this.module = {};

        // connect to db
        this.database = new DataBase(this._dbpath);
    }

    settingUp()
    {
        return new Promise(async (resolve, reject) => 
        {
            // event runafterstart
            global.fn.eventEmitter.on('runafterstart', (params, callback) => {
                let task = {'patams': params, 'callback': callback};
                global.afterStart.push(task)
            });

            //get built in modules
            await getModuleStrings().then();
            await getModules().then();
            await getFunctions().then();

            //get user modules
            await getModuleStrings(global.config.modulespath).then().catch(e => {console.log(e);});;
            await getModules(global.config.modulespath).then().catch(e => {console.log(e);});

            // start schedule
            let schedule = require('./base/schedule');
            schedule.runcCycle();

            //get built-in models
            await getDbModels().then();
            //get user models
            await getDbModels(global.config.modulespath).then();

            // function
            global.fn.strArr = global.fn.convertObjectToArray(fn.str, {'nested': true});
            global.fn.mstrArr = global.fn.convertObjectToArray(fn.mstr, {'nested': true});

            // start robot
            let bot = await create();
            // runafterstart
            runafterstart();

            resolve(bot);
        });
    }
}

// let runafterstart = function()
// {
//     global.afterStart.forEach(element => {
//         element.callback(element.params);
//     });
// }

function getModuleStrings(path)
{
    return new Promise((resolve, reject) => 
    {
        let dir = path;
        let option = {'filter':['.js'], 'name':'mstr'};

        if(!global.fn.mstr) global.fn.mstr = {};
        //get Mstr file paths
        filWalker.walk(dir, option, (e, list) => 
        {
            if(e) reject(e);
            else {
                //console.log(list);
                list.forEach(mstr => {
                    global.fn.mstr = extend(global.fn.mstr, require(mstr));
                });
                resolve();
            }
        });

    });
}

let getModules = function(path)
{
    return new Promise((resolve, reject) => 
    {
        let dir = (path) ? path : require('path').join( global.appRoot , 'moduls');
        let option = {'filter':['.js'], 'name':'admin'};

        if(!global.fn.m) global.fn.m = {};
        //get Mstr file paths
        filWalker.walk(dir, option, (e, list) => 
        {
            if(e) reject(e);
            //console.log(list);
            list.forEach(m =>
            {
                let emodule = require(m);
                //console.log(emodule.name)
                global.fn.m[emodule.name] = emodule;
                
                //get module route functions
                let route = {}
                route.name      = emodule.name;
                route.admin     = emodule.checkRoute;

                if(emodule.user){
                    route.user       = emodule.user.checkRoute;
                    route.getButtons = (emodule.user.getButtons) ? emodule.user.getButtons : null;
                    route.searchRoute= (emodule.user.searchRoute) ? emodule.user.searchRoute : null;
                }

                route.upload    = (emodule.upload) ? emodule.upload.checkUpload : null;
                route.query     = (emodule.query) ? emodule.query.checkQuery : null;
                global.moduleRouters.push(route);
            });
            resolve();
        });
    });
}

let getFunctions = function()
{
    return new Promise((resolve, reject) => {
        let fn = require('./functions');
        global.fn = extend(global.fn, fn);
        resolve();
    });
}

let getDbModels = function(path)
{
    return new Promise((resolve, reject) => 
    {
        let dir =  (path) ? path : require('path').join( global.appRoot , 'moduls');
        let option = {'filter':['.js'], 'name':'db'};
        //get Mstr file paths
        filWalker.walk(dir, option, (e, list) => {
            if(e) reject(e);
            //console.log(list);
            list.forEach(db => {
                //console.log(db)
                let model = require(db);
                global.fn.db = extend(global.fn.db, model);
            });
            resolve();
        });

    });
}

function extend(obj, src) 
{
    for (let key in src) {
        if (src.hasOwnProperty(key)) 
            obj[key] = src[key];
    }
    return obj;
}

let filWalker = require('../lib/filewalker');
