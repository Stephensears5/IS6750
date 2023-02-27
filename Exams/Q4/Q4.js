// Write the code for Question 4 here''
const fs = require("fs");

const createFile = () => {
console.log("Creating File");
fs.writeFile("working.txt", "Creating New File", (err) => {
 if(err){
    console.log(err);
    return;
 }else{
    writeLines()
 }
}
    )
}

const writeLines = () => {
console.log("Writing Lines");
fs.appendFile("working.txt", "\r\n Hello World", (err) => {
    if(err){
        console.log(err);
        return;
    }
    else{
        printFile()
    }
})
}

const printFile = () => {
    console.log("printing file")
    fs.readFile("working.txt", (err) => {
        if(err){
            console.log(err);
            return;
        }else{
            changeFileName()
        }      
    })
}

const changeFileName = () => {
    console.log("Changing File Name");
    fs.rename("working.txt", "complete.txt", (err) => {
        if(err){
            console.log(err);
        }
    })
}


createFile();