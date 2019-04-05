let Keyboard = require('./../../class/keyboard');
let Language = require('../../service/language_service');

/*
    -   this is a router for user side of the cms.
    -   methods:
    -   route:  this is a the main method being called through other routers.
                it should analyzes message and navigate the use into a menu.

    -   openMenu: it will navigate a user into a menu.

    -   goToMainMenu: it is a shortcut for going into the main menu.
*/

async function route(cms, user, message)
{
    
}

async function goToMainMenu(cms, user)
{
    // keybard options
    let keyboardOptions = { returnMarkup: true };

    // admin option
    if(cms.isAdminThisUser(user.id))
        keyboardOptions.buttomRow = [Language.getStr('system', cms.lang, 'gotoAdmin')];

    // messageOptions
    let messageOptions = {
        text: 'welcome',
        reply_markup: Keyboard.create(['gsdfg', 'fasdfas', 'fasdf', 'sdfasdf', 'fasdfas'], 3, keyboardOptions)
    };

    openMenu(cms, user, messageOptions);
}

async function openMenu(cms, user, options={})
{
    let text = options['text'] ? options['text'] : '-';
    delete options.text;

    cms.bot.sendMessage(user.id, text, options);
}

module.exports = {
    route,
    goToMainMenu,
}