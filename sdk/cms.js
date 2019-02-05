let telegramBot = require('node-telegram-bot-api');
let events = require('events');
let DataBase = require('../class/database');

let routingText = require('./routers/text_router');
let routingCommand = require('./routers/command_router');

/*
    cms bot should have a light object in terms of memory
    and all modules shoud be seperated system that each cms would have collaboration with.
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

        // must be declear first
        this.eventEmitter = new events.EventEmitter();

        // a list of functions wich being performed affter started the bot.
        this._afterStart = [];

        // create
        this._create();
    }

    async _create()
    {
        // create bot
        this._bot = new telegramBot(this._token, {polling: true});

        // user detail of bot
        this.me = await this._bot.getMe();

        // add listeners
        //Message
        this._bot.on('message', (msg) => {
            //console.log(msg.text);
            this._bot.sendChatAction(msg.chat.id, 'typing');
        });

        //text
        this._bot.on('text', (msg) => 
        {
            // get user
            let user;

            routingText(this, user, msg);
        });

        this._bot.onText(/\/start/, (msg) => 
        {
            routingCommand.route(this, msg);
        });
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