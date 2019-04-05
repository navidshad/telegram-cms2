let telegramBot = require('node-telegram-bot-api');
let events = require('events');
let DataBase = require('../class/database');

let routingText = require('./routers/text_router');
let routingCommand = require('./routers/command_router');


/*
    -   cms bot should have a light object in terms of memory
        and all modules shoud be a seperated system that each cms would have a collaboration with.

    -   each cms simple properties [token, bot user, bot object, moduleStatus, adminList, default lang]. 
        and this data will be accessed in all module's aspect.

    -   each cms registers some events to get telegram's message and pass it to routers.
    -   routers analyzes messages and send back a result message to telegram.

*/
module.exports = class CMS
{
    get bot() { return this._bot; }

    // constructor ========================================
    constructor(detail)
    {
        // bot token
        this._token = detail['token'];
        
        // activate modules
        this._moduleStatus = detail['moduleStatus'];

        // administrators
        this._adminMembers = detail.admins;

        // default language
        this.lang = detail.defaulLanguage;

        // create
        this._create();
    }

    async _create()
    {
        // create bot
        this._bot = new telegramBot(this._token, {polling: true});

        // get detail of bot
        this.me = await this._bot.getMe();

        // add listeners
        // Message
        this._bot.on('message', (msg) => {
            //console.log(msg.text);
            this._bot.sendChatAction(msg.chat.id, 'typing');
        });

        // text
        this._bot.on('text', async (msg) => 
        {
            routingText(this, msg);
        });
        
        // commands
        this._bot.onText(/\//, (msg) => 
        {
            routingCommand.route(this, msg);
        });
    }

    isAdminThisUser(userid)
    {
        let isAdmin = false;

        this._adminMembers.forEach(id => {
            if(id == userid) isAdmin = true;
        });

        return isAdmin;
    }

    // save load ==========================================
    async save()
    {
        // let update = {
        //     //update
        //     'username'    : global.robot.username,
        //     'firstmessage' : global.robot.config.firstmessage,
        //     'moduleOptions': global.robot.config.moduleOptions
        // }

        // let count = await global.fn.db.config.count({'username': this.username}).exec().then();
        // //update
        // if(count > 0)
        //     await global.fn.db.config.update({"username": this.username}, update).exec().then();
        // //creat
        // else await new global.fn.db.config(update).save();
    }

    async load()
    {
        // let conf = await global.fn.db.config.findOne({"username": this.username}).exec().then();
        // if(!conf) {
        //     this.save();
        //     return;
        // }

        // global.robot.config.moduleOptions = conf.moduleOptions;
        // global.robot.config.collectorlink = conf.collectorlink;
        // global.robot.config.firstmessage = conf.firstmessage;

        // //get main menu items
        // global.fn.updateBotContent();
    }

    // methods =================================================

}