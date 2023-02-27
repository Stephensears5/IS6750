// Write the code for Question 3 here
const friends = [
  {
    firstName: "Michael",
    lastName: "Sears",
    birthDate: "3/24/1994",
    favoriteFoods: ["Mcdonalds", "Muffins"],
  },
  {
    firstName: "Tyson",
    lastName: "Holmstead",
    birthDate: "4/10/1994",
    favoriteFoods: ["Chicken Wings", "Betos"],
  },
  {
    firstName: "Karissa",
    lastName: "Sears",
    birthDate: "1/3/1996",
    favoriteFoods: ["Kambucha", "Acaii Bowls"],
  },
];

const friendFunction = (friendsArray) => {
  //   console.log(friendsArray);
  friendsArray.forEach((x) => {
    let birthDate = new Date(x.birthDate);
    let age = calcAge(birthDate);
    let foodsStringArray = x.favoriteFoods.join();

    //<<firstName>> <<lastName>> is <<age>> years old and enjoys the following foods:  <<favoriteFoods>>.
    console.log(`${x.firstName} ${x.lastName} is ${age} years old and enjoys the following foods: ${foodsStringArray}`)

  });
  //   console.log(age);
};

const calcAge = (date) => {
  let ageDiff = Date.now() - date.getTime();
  //convert date
  let ageDate = new Date(ageDiff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const olderFriends = (date, friends) => {
    const dateConv = new Date(date)
    const olderFriends = [];
    friends.forEach(x => {
        let birthDate = new Date(x.birthDate);
        let older = isOlderThan(dateConv,birthDate)
        if(older){
            olderFriends.push({firstName: x.firstName, lastName: x.lastName, birthDate: x.birthDate, favoriteFoods: x.favoriteFoods})
        }
    })
    console.log(olderFriends);
    
}

const isOlderThan = (date, birthDate) => {
    if(birthDate > date){
        return false;
    }else{
        return true;
    }
}

friendFunction(friends);
olderFriends("1/1/1995", friends)