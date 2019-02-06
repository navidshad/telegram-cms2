let _strPackages = {
    'sys' : require('./str_system')
};

class StringService 
{
    static getStr(packageName, languageCode, lable)
    {
        let packageMember={};
        let str = lable;

        // find the packe of lable
        if(_strPackages.hasOwnProperty(packageName))
        {
            _strPackages[packageName].forEach((member, i) => {
                if(member.name == lable) packageMember = _strPackages[packageName][i];
            });
        }

        // extract str from found package
        if(packageMember.hasOwnProperty(languageCode)) str = packageMember[languageCode];
        else str = `${languageCode}-${lable}`;

        // add icon if it exists
        if(packageMember.hasOwnProperty('icon'))
            str = `${packageMember.icon} ${str}`;

        return str;
    }

    static addPackage(name, stringList)
    {
        if(!_strPackages.hasOwnProperty(name))
            _strPackages[name] = stringList;
        else console.error(`the string package of ${name} was added already`);
    }
}

module.exports = StringService;