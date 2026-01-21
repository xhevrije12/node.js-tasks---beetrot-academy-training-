

// const Person = require("person")
// const axios = require("axios")

// const personi1 = new Person("Filan", "Prishtine");

// personi1.getInfo();


// const path = require("node:path");

// // const filePath = "./new-path/file-test.txt";
// const filePath = "./folder-1/folder-2/folder-3/folder-4/file-4.txt"
// const filePathFile3 = "./folder-1/folder-2/folder-3/file-3.txt"
// const pathDir = path.dirname(filePath);
// const baseName = path.basename(filePath);
// const extName = path.extname(filePath);


// console.log(pathDir)
// console.log(baseName);
// console.log(extName);


// const name = "Filan";

// path.join('/', "users", name, "leternjoftimi.txt")

// console.log(path.resolve('leternjoftimi.txt'));


const fs = require("node:fs");
// let name = "TEST"

// console.log("Test1")
// let dataSaved = '';
// fs.readFile("./test.txt",'utf-8',(err, data)=> {
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
//     dataSaved = data;

// })

// console.log(dataSaved)

// console.log("test1")
// try {
//    const data =  fs.readFileSync("./test.txt","utf-8")
//     console.log(data)
// }catch(err){
//     console.log(err)
// }
// console.log("test2")

// const folderName = "./folder-ne2";
// try{
//     if(!fs.existsSync(folderName)){
//         fs.mkdirSync(folderName);
//     }
//     else{
//     console.log("Folderi ekziston!")
//     }


// }catch(err){
//     console.log(err)
// }



// fs.renameSync("./folder-ne3/folder-sdi", "./folder-sss", err =>{
//     if(err){
//         console.log(err)
//     }
// })




// fs.rmdir("./folder-sss", (err)=>{
//     if(err){
//         console.log(err)
//     }
// })

const dotenv = require("dotenv")
dotenv.config()
console.log(process.env.ENV_VALUE);