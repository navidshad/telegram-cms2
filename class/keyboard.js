class Keyboard 
{
    static create(keybordItems=[], defaultColumns=2, options={})
    {
        // option parameters
        // - customRows     | array , for for generate deffrent columns from default.
        // - returnMarkup   | bool  , return result with "reply_markup.keyboard" format
        // - topRow         | array
        // - buttomRow      | array

        let keys = [];
        let row = [];
        let rowNumber = 0;
        let tempColumns = defaultColumns;

        // topRow
        if(options.topRow != null) keys.push(options.topRow);
        
        // make grid
        // loop per each row
        for (var i = 0; i < keybordItems.length; i) 
        {
            // customRows
            if(options.customRows)
            {
                options.customRows.rows.forEach(r => 
                {
                    if(r['rowNumber'] == rowNumber) tempColumns = r['totalColumns'];
                });
            }
            
            // for loop for columns of this row
            for(let i2 =0; i2 < tempColumns; i2++)
            {
                const btn = keybordItems[i];
                if(btn) row.push(btn);
                i++;
            }

            keys.push(row);
            row = [];
            
            rowNumber++;
            tempColumns = defaultColumns;
        }

        // buttomRow
        if(options.buttomRow != null) keys.push(options.buttomRow);

        // returnMarkup
        let returnMarkup =  { keyboard: keys };
        if(options.returnMarkup) 
            return returnMarkup;
        
        // return only keies array
        else return keys;
    }
}

module.exports = Keyboard;