const http      = require('http');
const { URL }   = require('url');

const PORT = 3000;

// membuat todo

let todos = [
    {id : 1 , task : "Belajar NodeJs", status : "Belum Selesai"},
    {id : 2 , task : "Belajar Framework NodeJs", status : "Belum Selesai"}
];

const server = http.createServer((req, res) => {
    const { method , url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(method === 'OPTIONS'){
        res.writeHead(204);
        res.end();
        return;
    }

    if(method === 'GET' && pathname === '/todos'){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(todos));
    }

    else if(method === 'POST' && pathname === '/todos'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
                todos.push(newTodo);
                res.writeHead(201, {'Content-Type' : 'application/json'});
                res.end(JSON.stringify(newTodo, null, 2));
            } catch (error) {
                res.writeHead(400, {'Content-Type' : 'application/json'});
                res.end(JSON.stringify({error : "Invalid JSON format"}, null, 2));
            }
        });

        return;
    }

    else if (method === 'PUT' && pathname.startsWith('/todos/')){
        const id = parseInt(pathname.split('/')[2]);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const updateTodo = JSON.parse(body);
                const index = todos.findIndex(todo => todo.id === id);

                if(index === -1){
                    res.writeHead(404, {'Content-Type' : 'application/json'});
                    res.end(JSON.stringify({error : "Todo not found"}, null, 2));
                }else{
                    todos[index] = {...todos[index], ...updateTodo};
                    res.writeHead(200, {'Content-Type' : 'application/json'});
                    res.end(JSON.stringify(todos[index]));
                }
            }catch (error) {
                    res.writeHead(400, {'Content-Type' : 'application/json'});
                    res.end(JSON.stringify({error : "Invalid JSON format"}));
                }
        });
        return;
    }

    else if(method === 'DELETE' && pathname.startsWith('/todos/')){
        const id = parseInt(pathname.split('/')[2]);
        const index = todos.findIndex(todo => todo.id === id);

        if(index === -1){
            res.writeHead(404, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({error : "Todo not found"}));
        }else{
            todos = todos.filter(todo => todo.id !== id);
            res.writeHead(204);
            res.end();
        }
    }

    else{
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({error : "EndPoint not Found"}));
    }

});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});