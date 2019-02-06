let Keyboard = require('./../../class/keyboard');
let StrService = require('./../../class/string_service/string_service');

async function route(cms, user, message)
{
    
}

async function goToMainMenu(cms, user)
{
    // keybard options
    let keyboardOptions = { returnMarkup: true };

    // admin option
    if(cms.isAdminThisUser(user.id))
        keyboardOptions.buttomRow = [StrService.getStr('sys', cms.lang, 'gotoAdmin')];

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