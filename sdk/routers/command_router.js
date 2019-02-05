let UserManager = require('./../../class/user_manager');
let router_menu = require('./menu_router');

async function route(cms, message)
{
    // get user 

    // commands
    if(message.text == '/start') startBot(cms, message);
}

async function startBot(cms, message)
{
    // get user
    let user = await UserManager.get(message.from.id);

    // create user if not exist
    if(user == null) 
    { 
        user = await UserManager.create(
            cms.me.username, Object.assign(
                {

                }, message.from));
    }

    // go to main menu
    router_menu.goToMainMenu(cms, user);
}

module.exports = {
    route,
}