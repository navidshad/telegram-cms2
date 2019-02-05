let User = require('./user');

class UserManager {
    static async create(botUsername, detail)
    {
        let newUser = await new global.db.user(detail).save().then();
        return new User(newUser);
    }

    static async get(botUsername, userid)
    {
        let _user = await global.db.user.findOne({'_id': userid}).exec().then();

        if(_user != null) return new User(_user);
        else return null;
    }
}

module.exports = UserManager;