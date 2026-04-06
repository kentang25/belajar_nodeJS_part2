// const { resolve } = require("node:dns");

// function getUserPromise(userId)
// {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve({ id : userId, name: "John Doe"});
//         }, 1000);
//     });
// }

// function getUserPostPromise(user)
// {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(["post 1", "post 2", "post 3"]);
//         }, 1000);
//     });
// }

// // using promise

// getUserPromise(1)

//     .then(user => {
//         console.log("User:", user);
//         return getUserPostPromise(user);
//     })

//     .then(posts => {
//         console.log("Posts:", posts);
//     })
    
//     .catch(error => {
//         console.log(error);
//     });
    
// // using async await

// async function getUserandPost()
// {
//     try{
//         const user = await getUserPromise(1);
//         console.log("User:", user);

//         const post = await getUserPostPromise(user);
//         console.log("Posts:", post);

//     }catch(error) {
//         console.error(error)
//     };
// }

// getUserandPost();


async function myFunction()
{
    return "Hello World";
}

const result = myFunction();
console.log(result);

myFunction()
.then(result => console.log(result))
.catch(error => console.error(error))

const util = require("util");
const fs   = require("fs");

const readFile = util.promisify(fs.readFile);

async function readMyFile()
{
    try{
        const data = await readFile("hehe.txt", "utf-8");
        console.log(data);
    }catch(error){
        console.error(error);
    }
}

readMyFile();