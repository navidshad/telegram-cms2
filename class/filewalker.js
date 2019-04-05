const fs = require('fs');
const path = require('path');

function walk (dir, settings) 
{
    return new Promise((resolve, reject) => 
    {
        let results = [];

        //read director fild and folders
        fs.readdir(dir, function(err, list) 
        {
            // return error
            if (err) return reject(err);
    
            var pending = list.length;
            if (!pending) return resolve(results);
    
            list.forEach(function(file)
            {
                file = path.join(dir, file);
                fs.stat(file, async function(err, stat)
                {
                    // If directory, execute a recursive call
                    if (stat && stat.isDirectory()) 
                    {
                        // Add directory to array [comment if you need to remove the directories from the array]
                        //results.push(file);
                        let sublist = await walk(file, settings).then();
                        results = results.concat(sublist);
                        if (!--pending) resolve(results);
                    } 
                    else 
                    {
                        //file filter
                        var extension = path.extname(file);
                        var fileName = path.basename(file).split('.')[0];
                        var fileNameKey = true;
    
                        //name filter
                        if(settings.name && settings.name === fileName) fileNameKey = true;
                        else fileNameKey = false;
    
                        //extention filter
                        if(settings.filter && fileNameKey){
                            settings.filter.forEach(function(element) {
                                if(element.toLowerCase() === extension.toLowerCase()) 
                                    results.push(file);
                            }, this);
                        }
    
                        //push any file if no option
                        else if (fileNameKey) results.push(file);
    
                        if (!--pending) resolve(results);
                    }
                });
            });
        }); 
    });
};

module.exports = {walk}