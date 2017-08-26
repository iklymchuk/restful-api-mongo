let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8085;
let user = require('./app/routes/user');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our User Server!"}));

app.route("/user")
    .get(user.getUsers)
    .post(user.postUser);
app.route("/user/:id")
    .get(user.getUser)
    .delete(user.deleteUser)
    .put(user.updateUser);

//fixed error with mocha
if(!module.parent){ 
    app.listen(port); 
}

//app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing