const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const {app_port, node_env} = require("./src/config/config");

const app = express();

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


let destination = path.join('./transaction_reports');

function makeDirectories(){
    if(!fs.existsSync(destination)){
        fs.mkdirSync(destination)
    }
    return destination;
}

app.use(express.static(makeDirectories()));

// attach the routes to the app
require("./src/routes")(app);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send("Not Found")
});

app.listen(app_port, () => {
    console.log(`Express server listening on ${app_port}, in ${node_env} mode`);
  });