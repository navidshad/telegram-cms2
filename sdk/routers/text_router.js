let Language = require('../../service/language_service');
let UserService = require('../../service/user_service');
let router_admin = require('./admin_router');

module.exports = async function route(cms,  message)
{
    let text = message.text;
    let userid = message.from.id;
    let user = await UserService.get(cms.me.username, userid);

    // go to admin router
    let isAdminRequest = Language.isValidText('system', cms.lang, 'gotoAdmin', text);
    if(isAdminRequest || cms.isAdminThisUser(user.id))
        router_admin(cms,  user, message);

    // go to menu router
    // go to module routers
}