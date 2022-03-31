const myArgs = process.argv.slice(2);
const { newToken } = require("./token.js");
const { path } = require("path");
const { fs } = require("fs/promises");

function searchList(value) {
  newToken.username = value;
  dll.search("Team2");

  // if (DEBUG) console.log("searchList()");
  // myEmitter.emit("log", "token.searchList()", "INFO", `searchList was called by CLI.`);

  // switch (myArgs[1]) {
  //   case "search":
  //   case "s":
  //     search(myArgs[2]);
  //     break;
  // case "help":
  // case "h":
  // default:
  //   fs.readFile(__dirname + "/usage.txt", (error, data) => {
  //     if (error) throw error;
  //     console.log(data.toString());
  //   });
}

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// TO Do - <Value> may need to be changed to <person>?

class DoublyLinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
    this.tail = null;
  }
  pushFront(value) {
    if (this.head === null) {
      const node = new Node(value);
      this.head = node;
      this.tail = node;
    } else {
      const currentHead = this.head;
      const newHead = new Node(value);
      newHead.next = currentHead;
      currentHead.prev = newHead;
      this.head = newHead;
    }
    this.count += 1;
  }
  pushBack(value) {
    if (this.head === null) {
      const node = new Node(value);
      this.head = node;
      this.tail = node;
    } else {
      const currentTail = this.tail;
      const newTail = new Node(value);
      currentTail.next = newTail;
      newTail.prev = currentTail;
      this.tail = newTail;
    }
    this.count += 1;
  }

  consoleLogAllValues() {
    let current = this.head;
    while (current != null) {
      console.log(current.value);
      current = current.next;
    }
  }
  search(value) {
    let current = this.head;
    while (current != null) {
      if (value === current.value.username) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}

const dll = new DoublyLinkedList();
console.log(dll.search("Team2"));

module.exports = {
  DoublyLinkedList,
  Node,
  searchList,
};
