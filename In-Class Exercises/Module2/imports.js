const myExports = require("./exports")
const myPersons = require("./person-data")

console.log("my name is: " , myExports.myName);
console.log(myPersons.me)

myExports.printString("hello World!");

myPersons.printFriends(myPersons.friendsArray)
