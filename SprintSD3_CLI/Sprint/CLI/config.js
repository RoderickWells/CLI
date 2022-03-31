global.DEBUG = true;

const fs = require("fs");
const path = require("path");
const { configTemp } = require("./init");
const fileName = "/config.json";

// switch statement to help with config options
const myArgs = process.argv.slice(2);
function configApp() {
  if (DEBUG) if (myArgs.length > 1) console.log("the app.args: ", myArgs);
  switch (myArgs[1]) {
    case "set":
      if (DEBUG) console.log("Config.JSON has been updated.");
      configSet();
      break;
    case "reset":
      if (DEBUG) console.log("Config.JSON has been reset.");
      configReset();
      break;
    case "show":
    default:
      configShow();
  }
}

// updates data in the config.json file that you indicate.
function configSet() {
  fs.readFile(__dirname + "/config.json", (err, data) => {
    if (err) throw err;
    if (DEBUG) console.log(JSON.parse(data));
    let configKey = JSON.parse(data);
    for (let key of Object.keys(configKey)) {
      if (key === myArgs[2]) {
        configKey[key] = myArgs[3];
      }
    }
    if (DEBUG) console.log(configKey);
    data = JSON.stringify(configKey, null, 2);
    fs.writeFile(__dirname + "/config.json", data, (err) => {
      if (err) return console.log(err);
      if (DEBUG) console.log("writing to " + fileName);
    });
  });
}

// resets the config.json file to its original state.
function configReset() {
  let figdata = JSON.stringify(configTemp, null, 2);
  fs.writeFile(__dirname + "/config.json", figdata, (err) => {
    if (err) throw err;
    if (DEBUG) console.log("Config.JSON reset to default.");
  });
}

// shows the current information in the config.json file.
function configShow() {
  fs.readFile(__dirname + "/config.json", (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
}

module.exports = { configApp };
