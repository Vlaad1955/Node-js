const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const fs = require('node:fs/promises');
const path = require('path');

const UsersFolderPath = path.join(__dirname, `db`, `users.json`);

app.get(`/users`,  async (req, res) => {
    const usersData = await fs.readFile(UsersFolderPath, `utf-8`);
    let users = JSON.parse(usersData);
    res.json(users);
});

app.post(`/users`, async (req, res) =>{
    const usersData = await fs.readFile(UsersFolderPath, `utf-8`);
    let users = JSON.parse(usersData);
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    users.push(newUser);
    await fs.writeFile(UsersFolderPath, JSON.stringify(users));
    res.status(201).json(newUser);
})


app.get(`/users/:userID`, async (req,res)=>{
    const usersData = await fs.readFile(UsersFolderPath, `utf-8`);
    let users = JSON.parse(usersData);
    const user = users.find(user => user.id === Number(req.params.userID));
    res.json(user);
})

app.delete('/users/:userId', async (req, res) => {
    const usersData = await fs.readFile(UsersFolderPath, `utf-8`);
    let users = JSON.parse(usersData);
    users = users.filter(user => user.id !== Number(req.params.userId));
    await fs.writeFile(UsersFolderPath, JSON.stringify(users));
    res.sendStatus(204);
});

app.put(`/users/:userId`, async (req, res)=>{
    const usersData = await fs.readFile(UsersFolderPath, `utf-8`);
    let users = JSON.parse(usersData);
    const userIndex = users.findIndex(user => user.id === Number(req.params.userId));
    users[userIndex] = {
        ...users[userIndex],
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    await fs.writeFile(UsersFolderPath, JSON.stringify(users));
    res.json(users[userIndex]);
});

app.listen(3000);