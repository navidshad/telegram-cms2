let languageService = require('../service/language_service');

module.exports = class Plugin 
{
    constructor (options)
    {
        if(options['name']) this.name = options['name'];
        else {
            console.error('found a plugin without name');
            return;
        }
        
        // get admin section buttons
        if(options.hasOwnProperty('adminButtonLables'))
            this._adminBtns = options['adminButtonLables'];
        
        // get user  buttons
        if(options.hasOwnProperty('userButtonLables'))
            this._userBtns = options['userButtonLables'];

        // get admin route function
        if(options.hasOwnProperty('adminRouter'))
            this._adminRouter = options['adminRouter'];

        // get user route function
        if(options.hasOwnProperty('userRouter'))
            this._userRouter = options['userRouter'];

        // get admin setting options of this plugin
        if(options.hasOwnProperty('settingOptions'))
            this._settingOptions = options['settingOptions'];

        // get language string package
        if(options.hasOwnProperty('languageStringPackage'))
            languageService.addPackage(this.name, options['languageStringPackage']);

        // get db models
        if(options.hasOwnProperty('mongooseModels'))
        {
            let keys = Object.keys(options['mongooseModels']);

            keys.forEach(key => {
                let model = options['mongooseModels'][key];
                global.database.addModel(key, model);
            });
        }
    }

    _checkRoute (btnsArr, section, option)
    {
        let result = { status: false };
        
        let router;
        if(section == 'admin') router = this._adminSectionRouter;
        else if(section == 'user') router = this._adminSectionRouter;

        //check text message
        if(option.text) btnsArr.forEach(btn => 
        { 
            if(option.text === btn) 
            {
                result.status = true; 
                result.buttons = btn;
                result.route = router;
            }
        });
    
        //check seperate section
        if(option.speratedSection)
        {
            option.speratedSection.forEach(section => 
            {
                btnsArr.forEach(btn => 
                { 
                    if(section === btn){
                        result.status = true; 
                        result.buttons = btn;
                        result.route = router;
                    }
                });
            });
        }
    
        //return
        return result;
    }

    checkAdminSectionRoute (routeOption)
    {
        return this._checkRoute(this._adminSectionBtns, 'admin', routeOption);
    }

    checkUserSectionRoute (routeOption)
    {
        return this._checkRoute(this._userSectionBtns, 'user', routeOption);
    }

    getButtons ()
    {
        // var buttons  = fn.convertObjectToArray(fn.mstr[mName].btns_user,{});
        // return buttons;
    }
}