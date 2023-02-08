// Asynchronous function that uses a callback as a parameter
// Uses the error-first callback pattern
"use strict";

const doWorkCallback = (a, b, willSucceed, callback) => {

    // Simulate an asychronous operation (such as a database query)
    setTimeout(() => {
        //check to see if function should succeed
        if (willSucceed) {
            let sum = a + b;
            callback(null, sum);
        } else {
            callback("Something went wrong.", null);
        }
    }, 2000);
};

// Call the asynchronous function and pass in an error-first callback function
doWorkCallback(5, 7, true, (err, result) => {
    if (err){
        return console.log("Error!! ", err);
    } 
    console.log("Result is: ", result);
});
