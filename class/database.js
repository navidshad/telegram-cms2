let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(schema => { schema.options.usePushEach = true });
mongoose.set('debug', false);

async function createDatabase(stringConnection)
{
  let _mongoose = await mongoose.connect(stringConnection, { useNewUrlParser: true }).then();
  _mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  _mongoose.connection.once('open', function() { console.log('db was connected'); });

  //create schemas
  modules = {};
  let Schema = _mongoose.Schema;
  
  let UserSchema = new Schema({
      id          : Number,
      username    : String,
      first_name	: String,
      last_name	  : String,
      language_code:String,
  
      sections    : {type: [String], default: []},
      date        : Date,
      botUsername : String,
  });
  
  let ConfigSchema = new Schema({
    username      : String,
    firstmessage  : String,
    domain        : String,
    moduleOptions:[{
      name:String, 
      category:String, 
      active: Boolean,
      btn_order:Number,
      detail : Object,
    }]
  });
  
  let lastMessageSchema = new Schema({
    userid: Number,
    text  : String,
    chatid: Number,
    messageid: Number,
  });
  
  modules.user     = _mongoose.model('users', UserSchema);
  modules.config   = _mongoose.model('config', ConfigSchema);
  modules.lastMess = _mongoose.model('lastMessages', lastMessageSchema);

  console.log('database connected.')
  return modules;
}

module.exports = createDatabase;
