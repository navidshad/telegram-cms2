let _strPackages = {
    'system' : require('../class/strings')
};

class StringService 
{
    static getPackageMember(packageName, lable)
    {
        let packageMember = {};

        if(!_strPackages.hasOwnProperty(packageName))
            return packageMember;

        for(let i=0; i < _strPackages[packageName].length; i++)
        {
            let member = _strPackages[packageName][i];
            if(member.name == lable) {
                packageMember = member;
                break;
            }
        }

        return packageMember;
    }

    static getStr(packageName, languageCode, lable)
    {
        let packageMember = this.getPackageMember(packageName, lable);
        let str = `${languageCode}-${lable}`;

        // extract str from found package
        if(packageMember.hasOwnProperty(languageCode)) 
            str = packageMember[languageCode];

        // add icon if it exists
        if(packageMember.hasOwnProperty('icon'))
            str = `${packageMember.icon} ${str}`;

        return str;
    }

    static isValidText(packageName, languageCode, lable, text)
    {
        // lable is string lable on packages
        // text is the string being sent from user.
        let isValid = false;

        let packageMember = this.getPackageMember(packageName, lable);
        
        if(packageMember[languageCode] == text) 
            isValid = true;

        return isValid;        
    }

    static addPackage(name, memberArray)
    {
        if(!_strPackages.hasOwnProperty(name))
            _strPackages[name] = memberArray;
        else console.error(`the string package of ${name} was added already`);
    }
}

module.exports = StringService;