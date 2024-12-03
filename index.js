const http = require(`http`);

const server = http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Сервер працює!\n');
})

const PORT = 1213;
server.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
