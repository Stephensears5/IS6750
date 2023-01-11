const me =
{
    myFirstName: "Stephen",
    myLastName: "Sears",
    myBirthdate: new Date(2022,09,09),
    myMajor: "Master of Management Information Systems"
}

const friends = [
    {
        firstName: "Michael",
        lastName: "Sears",
        birthDate: new Date(1994,02,24),
        major: "Master of Management Information Systems"
    },
    {
        firstName: "Tyson",
        lastName: "Holmstead",
        birthDate: new Date(1994,05,11),
        major: "Outdoor Product Design"
    },
    {
        firstName: "Karissa",
        lastName: "Sears",
        birthDate: new Date(1996,00,03),
        major: "Diatetics"
    }
]

const printFriends = (array) => {
    array.map(x => console.log(`${x.firstName} ${x.lastName} was born on ${x.birthDate.toLocaleDateString()} and is majoring in ${x.major}`))
}

const calculateAverageAge=(cb) => {
    let totalAge = 0;
    let iterations = 0
    friends.forEach(friend => {
        let age = Math.floor((new Date() - new Date(friend.birthDate).getTime()) / 3.15576e+10)
        totalAge = totalAge + age;
        iterations = iterations + 1
    })
    return totalAge/iterations


}

module.exports = {
    me: me, 
    friendsArray: friends,
    printFriends: printFriends,
    calculateAverageAge: calculateAverageAge
}