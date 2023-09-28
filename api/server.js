// BUILD YOUR SERVER HERE
const express = require('express')
const nodemon = require('nodemon');


const server = express()

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

// post
server.post('/api/users', async (req, res) => {
    const user = await insert(req.body);
    res.status(201).json(user);
})

//get
server.get('/api/users', async (req, res) => {
    const users = await find();
    res.status(200).json(users);
})

//get/api/:id
server.get('api/users', async (req, res) => {
    const user = await findById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'})
    }
})

// delete
server.delete('/api/users/:id', async (req, res) => {
    const user = await(req.params.id)
    if (user){
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

// put
server.put('/api/users/:id', async (req, res) => {
    const user = await update(req.params.id, req.body);
    if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

module.exports = server; //exporting server. 
