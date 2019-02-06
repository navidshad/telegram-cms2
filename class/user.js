module.exports = class User 
{
    constructor(dbObject)
    {
        this._dbObject = dbObject;

        // sperate section

    }

    get detail()    { return this._dbObject; };
    get sections()  { return this.detail.sections; };
    get id()    { return this.detail.id; }

    addSection(section)
    {
        this._cutSection(section);
        this._dbObject.sections.put(section);
    }

    _cutSection(from)
    {
        for(let i; i < this.sections.length; i++)
        {
            let Tempsection = this.sections[i];
            if(Tempsection == from) {
                this._dbObject.sections.splice(i, this._dbObject.sections.length - i);
                break;
            }
        }
    }

    checkValidSection(index, section)
    {
        let isValid = false;
        
        try {
            if(this.sections[index] == section) isValid = true;
        } catch (error) {
            //consolelog(error);
        }

        return isValid;
    }
}