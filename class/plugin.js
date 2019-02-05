module.exports = class Plugin 
{
    constructor (detail)
    {
        if(detail['name']) this.name = detail['name'];
        else {
            console.log('found a plugin without name');
            return;
        }
        
        // setup route buttons
        if(detail['adminSectionButtons'])
            this._adminSectionBtns = detail['adminSectionButtons'];
        
        if(detail['userSectionButtons'])
            this._userSectionBtns = detail['userSectionButtons'];

        // setup routers
        if(detail['adminSectionRouter'])
            this._adminSectionRouter = detail['adminSectionRouter'];
        
        if(detail['userSectionRouter'])
            this._userSectionRouter = detail['userSectionRouter'];
    }

    checkAdminSectionRoute (routeOption)
    {
        return this._checkRoute(this._adminSectionBtns, 'admin', routeOption);
    }

    checkUserSectionRoute (routeOption)
    {
        return this._checkRoute(this._userSectionBtns, 'user', routeOption);
    }

    _checkRoute (btnsArr, section, option)
    {
        let result = {}
        
        let router;
        if(section == 'admin') router = this._adminSectionRouter;
        else if(section == 'user') router = this._adminSectionRouter;

        //check text message
        if(option.text) btnsArr.forEach(btn => 
        { 
            if(option.text === btn) 
            {
                result.status = true; 
                result.button = btn;
                result.routting = router;
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
                        result.button = btn;
                        result.routting = router;
                    }
                });
            });
        }
    
        //return
        return result;
    }

    getButtons (mName)
    {
        // var buttons  = fn.convertObjectToArray(fn.mstr[mName].btns_user,{});
        // return buttons;
    }
}