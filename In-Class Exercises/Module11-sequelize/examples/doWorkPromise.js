const doWorkPromise = (a, b, willSucceed) => {

    //return a Promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willSucceed) {
                let sum = a + b;
                resolve(sum); // Promise fulfilled! Yay!
            } else {
                reject("Oops, something went wrong!");  //Promise rejected
            }
        }, 2000);
    })

}


//Use the promise returned by doWorkPromise


doWorkPromise(5, 7, true)
.then((value) => {
    console.log("Result is: ", value);
    return doWorkPromise(value, 10, true);
})
// Handle previously returned promise.
.then((value2) => {
    console.log("Result 2 is: ", value2);
    return doWorkPromise(value2, 25);
})
.then((value3) => {
    console.log("Result 3 is: ", value3);
})
.catch((err) => {
    console.log(err);
});