const express   = require('express');
const path      = require('path');
const app       = express();
const port      = 8080;

// --- Routing dan Routing multitaple ---

// app.get('/users/:userId', (req, res) => {
//     res.send(`User ID ${req.params.userId}`);
// });

// app.post('/', (req, res) => {
//     res.send('Hello Post');
// });

// app.get('/users/:userId/post/:postId', (req, res) => {
//     res.send(`
//             <h1>multiple params</h1>
//             <p>User ID: ${req.params.userId}</P>
//             <p> Post ID: ${req.params.postId}</p>
//         `);
// });

// app.get('/products/:category/:product', (req, res) => {
//     if(req.params.product){
//         res.send(`Viewing product ${req.params.product} in category ${req.params.category}`);
//     }else{
//         res.send(`Viewing all products in category ${req.params.category}`);
//     }
// });

// app.get('/html', (req, res) => {
//     res.send(`
//             <html>
//                 <head>
//                     <title>Belajar Express</title>
//                 </head>
//                 <body>
//                     <h1>Belajar Express</h1>
//                     <p>Ini adalah halaman HTML yang dikirim dari server Express</p>

//                     <a href="/">Home</a>
//                     <a href="/about">About</a>
//                     <a href="/html">HTML</a>
//                 </body>
//             </html>
//         `);
// });

// --- Routing dengan query parameter ---

// app.get('/search', (req, res) => {
//     const {q, category, limit} = req.query;
//     res.send(`Search results for query: ${q}, category ${category}, ${limit} limit}`);
// })

// app.get('/products', (req, res) => {
//     const page = parseInt(req.query.page || 1);
//     const pageSize = parseInt(req.query.pageSize || 10);

//     const products = [];
//     for (let i = 1; i <= pageSize; i++){
//         const productId = (page - 1) * pageSize + i;
//         products.push({id: productId, name: `Product ${productId}`});
//         };

//         res.send(`
//             <h1>Products Page ${page}</h1>
//             <ul>
//                 ${products.map(p => `<li>${p.name}</li>`).join('')}
//             </ul>
//             <a href="/products?page=${page - 1}&pageSize=${pageSize}">Previous</a>
//             <a href="/products?page=${page + 1}&pageSize=${pageSize}">Next</a>

//             `);
// });

// --- Middleware Express ---

// app.use(express.json());

// app.use(express.urlencoded({extended: true}));

// app.use(express.static('public'));

// app.post('/data', (req, res) => {
//     const data = req.body;
//     res.status(200).send(`Data received: ${JSON.stringify(data)}`);
// });


// --- Error handling di Express ---

// app.get('/error', (req, res) => {    
//     throw new Error('Something went wrong!');
// });

// async function nonExistentFunction(){
//     return "This function does not exist";
// }

// app.get('/async-error', async (req,res,next) => {
//     setTimeout(() => {
//         try{
//             const result = nonExistentFunction();
//             res.send(result);
//         }catch(error){
//             next(error);
//         }
//     }, 100);
// });

// Serve static files from the "public" directory ---

// app.use(express.static('public'));

// app.use('/image', express.static(path.join(__dirname, 'image')));

// app.get('/', (req, res) => {
//     res.send(`
//             <h1>Static Files Example</h1>
//             <p>This page demonstrates serving static files with Express.</p>
//             <img src="/image/gambar.png" alt="Example Image" width="300">
//         `);
// });

// Routing in separate files ---

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('Users Router accessed at: ' , Date.now());
    next();
});

userRouter.get('/user', (req, res) => {
    res.send(`
            <h2>Users List</h2>
            <ul>
                <li><a href="/users/1">User 1</a></li>
                <li><a href="/users/2">User 2</a></li>
                <li><a href="/users/3">User 3</a></li>
            </ul>
        `);
});

userRouter.get('/:id', (req, res) => {
    res.send(`
            <h2>User Profile</h2>
            <p>User ID: ${req.params.id}</p>
            <p><a href="/users">Back to user list</a></p>
        `);
});

const protuctsRouter = express.Router();

protuctsRouter.get('/', (req, res) => {
    res.send(`
            <h2>Products List</h2>
            <ul>
                <li><a href="/products/1">Product 1</a></li>
                <li><a href="/products/2">Product 2</a></li>
                <li><a href="/products/3">Product 3</a></li>
            </ul>
        `);
});

protuctsRouter.get('/:id', (req, res) => {
    res.send(`
            <h2>Product Details</h2>
            <p>Product ID: ${req.params.id}</p>
            <p><a href="/products">Back to product list</a></p>
          `);
});

app.get('/', (req, res) => {
    res.send(`
            <h1>Express Separate Routes Example</h1>
            <p>Navigate to different sections:</p>
                <ul>
                    <li><a href="/users">Users</a></li>
                    <li><a href="/products">Products</a></li>
                </ul>
        `);
});

app.use('/users', userRouter);
app.use('/products', protuctsRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});