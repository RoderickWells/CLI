/*************************
 * File Name: logEvents.js
 * Purpose: To provide a logging feature
 *
 * Created Date: 22 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 22 Jan 2022, PJR, File created
 * 25 Jan 2022, PJR, add date to log file name
 *      implement DEBUG global
 *
 *************************/

// NPM installed Modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Node.js common core global modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (event, level, message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
  if (DEBUG) console.log(logItem);
  try {
    // create log file if it does not exist
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      // include ./logs/yyyy/mmmm
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    // include ./logs/yyyy/mmmm/dd
    const fileName = `${format(new Date(), "yyyyMMdd")}` + "_events.log";
    await fsPromises.appendFile(path.join(__dirname, "logs", fileName), logItem + "\n");
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
