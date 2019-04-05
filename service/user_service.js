let User = require('../class/user');

class UserManager {
    static async create(botUsername, detail)
    {
        let baseDetail = {
            sections    : [],
            date        : Date.today(),
            botUsername : botUsername,
        };

        let newUser = await new global.db.user(Object.assign(baseDetail, detail))
            .save().then();
        
        return new User(newUser);
    }

    static async get(botUsername, userid)
    {
        let _user = await global.db.user.findOne({'id': userid, 'botUsername': botUsername}).exec().then();

        if(_user != null) return new User(_user);
        else return null;
    }
}

module.exports = UserManager;