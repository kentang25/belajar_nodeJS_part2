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

// async function myFunction()
        // {
        //     return "Hello World";
        // }

        // const result = myFunction();
        // console.log(result);

        // myFunction()
        // .then(result => console.log(result))
        // .catch(error => console.error(error))

        // const util = require("util");
        // const fs   = require("fs");

        // const readFile = util.promisify(fs.readFile);

        // async function readMyFile()
        // {
        //     try{
        //         const data = await readFile("hehe.txt", "utf-8");
        //         console.log(data);
        //     }catch(error){
        //         console.error(error);
        //     }
        // }

        // readMyFile();

// const http = require('http');
// const { URL }  = require('url');
// const querystring = require('querystring');

const fs = require('fs').promises;
// const { pipeline } = require('stream/promises');
// const { Readable } = require('stream');

// const PORT = 3000;

// fs.readFile('hehe.txt', 'utf8', (err, data) => {
//     if(err){
//         console.error('error reading file:'. err);
//         return;
//     }
//     console.log('file content:', data);
// });

// async function readFileExample()
// {
//     try{
//         const data = await fs.promises.readFile('hehe.txt', 'utf8');
//         console.log('file content:', data);
//     }catch(error){
//         console.error('error reading file:', error);
//     }
// }

// readFileExample();

// const { promisify } = require('util');
// const readFileAsync = promisify(fs.readFile);

// async function readFileExample2()
// {
//     try{
//         const data = await readFileAsync('hehe.txt', 'utf8');
//         console.log('file content:', data);
//     }catch(error){
//         console.error('error reading file:', error);
//     }
// }

// readFileExample2();

// async function writeFileExample()
// {
//     try{
//         await fs.writeFile('hehe.txt', 'Hello World', 'utf8');
//         console.log('file written successfully');

//         const data = {name : 'john Doe', age: 30 , city : 'New York'};
//         await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');
//         console.log('data file written successfully');

//     }catch(error){
//         console.error('error writing file:', error);
//     }
// }

// writeFileExample();

// async function appendFileExample()
// {
//     try{
//         const logEntry = `log entry at ${new Date().toISOString()}: Application started\n`;
//         await fs.appendFile('app.log', logEntry, 'utf8');

//         console.log('log entry appended successfully');
//     }catch(error){
//         console.error('error appending to file:', error);
//     }
// }

// appendFileExample();

// async function writeWithFileHandle()
// {
//     let fileHandle;

//     try{
//         fileHandle = await fs.open('hehe.txt', 'w');

//         await fileHandle.writeFile('Hello World', 'utf8');
        
//         console.log('file written successfully using FileHandle');
//     }catch(error){
//         console.error('error writing file with FileHandle:', error);        
//     }finally{
//         if(fileHandle){
//             await fileHandle.close();
//         }
//     }
// }

// writeWithFileHandle();

// async function writeLargeFile()
// {
//     const data = Array(10).fill('This is a line in a large file.').map((_,i) => `Line ${i + 1} ${'hello'.repeat(100)}\n`);

//     const readable = Readable.from(data);

//     const writable = fs.createWriteStream('hehe.txt');

//     try{
//         await pipeline(readable, writable);
//         console.log('large file written successfully');
//     }catch(error){
//         console.error('error writing large file:', error);
//     }
// }

// writeLargeFile();

async function deleteFile()
{
    const filePath = 'hehe.txt';

    try{
        await fs.access(filePath);

        await fs.unlink(filePath);
        console.log('file deleted successfully');
    }catch(error){
        if(error.code === 'ENOENT'){
            console.log('file does not exist, nothing to delete');
        }else{
            console.error('error deleting file:', error);
        }
    }
}

deleteFile();

// const server = http.createServer((req, res) => {

    
//     const baseUrl = 'http://' + req.headers.host + '/';
//     const parsedUrl = new URL(req.url, baseUrl);

//     const params = Object.fromEntries(parsedUrl.searchParams.entries());

//     const queryObject = {
//         name : 'John Doe',
//         age : 30,
//         city : 'New York'
//     };

//     const queryStr = querystring.stringify(queryObject);

//     res.writeHead(200, {'Content-Type' : 'application/json'});
//     res.end(JSON.stringify({
//         path : parsedUrl.pathname,
//         query : params,
//         exampleQueryString : queryStr
//     }, null , 2));



//  });

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });

