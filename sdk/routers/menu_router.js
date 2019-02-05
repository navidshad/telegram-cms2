async function route(cms, user, message)
{
    
}

async function goToMainMenu(cms, user)
{
    let option = {
        text: 'welcome',
    };

    openMenu(cms, user, option);
}

async function openMenu(cms, user, option={})
{
    let text = option['text'] ? option['text'] : '-';

    cms.bot.sendMessage(user.userid, text);
}

module.exports = {
    route,
    goToMainMenu,
}