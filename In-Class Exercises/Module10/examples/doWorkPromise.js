const doWorkPromise = (a, b, willSucceed) => {
  //return a promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willSucceed) {
        let sum = a + b;
        resolve(sum); //promise fulfilled
      } else {
        reject("Oops, something went wrong!");
      }
    }, 2000);
  });
};

//Use the promise returned by doWorkPromise

doWorkPromise(5, 7, true)
  .then((sum) => {
    console.log("Result is: ", sum);
    return doWorkPromise(sum,10,true);
  })
  .then((value2) => {
    console.log("result2 is: ", value2)
    return doWorkPromise(value2, 11, true);
  }) //handle previous returned promise
  .then((value3)=>{
    console.log("result3 is: ", value3);
  })
  .catch((err) => {
    console.log(err);
  });
