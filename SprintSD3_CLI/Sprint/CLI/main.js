const fs = require("fs/promises");
const path = require("path");
const { DoublyLinkedList } = require("./doubleLinkedList");

const myArgs = process.argv.slice(2);
// const username = myArgs[2];

function searchApp() {
  switch (myArgs[1]) {
    case "username":
    case "u":
      main(myArgs[2]);
      break;
  }
}

async function main(username) {
  const pathName = path.join(__dirname, "tokens.json");
  console.log(pathName);
  const data = await fs.readFile(pathName);
  const parsedObjectArray = JSON.parse(data);
  let newDll = new DoublyLinkedList();
  for (let obj of parsedObjectArray) {
    newDll.pushBack(obj);
  }
  // newDll.pushBack(/* something goes here */);
  // newDll.consoleLogAllValues();
  const result = newDll.search(username);
  console.log(result);
}

// console.log(main("Team2")); // This is working to output the "paraneter" but not the <username>
// console.log(main("Team2"));

module.exports = {
  searchApp,
};
