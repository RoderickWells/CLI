/* 

file name: app.js
This is the main routines to start the initialization app

commands:

app help                                                        displays a list of the available commands

app init make                                                   creates the folder structure and config files for
app init cat                                                    creates the config file with default settings

app config show                                                 displays a list of the current config settings
app config set <key> <new>                                      sets a specific config settings
app config reset                                                resets the config file with default settings

app token count                                                 displays a count of the token created
app token list                                                  displays a list of the token created
app token new <username>                                        generates a token for a given username, saves tokens to the json file 
app token update (phone/email) <username> <phone or email>      updates the phone or email for the user.
app token fetch <username>                                      fetches a token for a given username
app search <username>                                           creates a DLL and searches for a username.



created Date: 21 Feb 2022
Authors: Michael O'Reilly, Roderick Wells
Revision: 1.0 
Revisions:
date, Author, description; 
1. 21 Feb 2022 by Michael O'Reilly
   The first revision description should go here.
2. 22 Feb 2022 by Roderick Wells
3. 23 Feb 2022 by Michael O'Reilly

*/

// set to true to turn on, false to turn off
global.DEBUG = true;

const fs = require("fs");
const { initApp } = require("./init.js");
const { configApp } = require("./config.js");
const { tokenApp } = require("./token.js");
const { searchApp } = require("./main.js");

const myArgs = process.argv.slice(2);
if (DEBUG) if (myArgs.length > 1) console.log("the app.args: ", myArgs);

switch (myArgs[0]) {
  case "init":
  case "i":
    if (DEBUG) console.log(myArgs[0], " - init the app.");
    initApp();
    break;
  case "config":
  case "c":
    if (DEBUG) console.log(myArgs[0], " - display the config file.");
    configApp();
    break;
  case "token":
  case "t":
    if (DEBUG) console.log(myArgs[0], " - generate a user token.");
    tokenApp();
    break;
  case "search":
  case "s":
    if (DEBUG) console.log(myArgs[0], " - search for a username.");
    searchApp();
    break;
  case "help":
  case "h":
  default:
    fs.readFile(__dirname + "/usage.txt", (error, data) => {
      if (error) throw error;
      console.log(data.toString());
    });
}
