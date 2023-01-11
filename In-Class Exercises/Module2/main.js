const myPersons = require("./person-data")

const myself = myPersons.me;
const friendsArray = myPersons.friendsArray;

console.log(myself)

const [myFirstName, myLastName] = myself;
const myBirthDate = myself.myBirthdate;
console.log(myBirthDate);

console.log(`My full name is ${myFirstName} ${myLastName}`)

const youngerFriends = friendsArray.filter(y => y.birthDate < myBirthDate)

 console.log("younger Friends ", youngerFriends)
 console.log(myPersons.calculateAverageAge(friendsArray))
myPersons.printFriends(myPersons.friendsArray)

