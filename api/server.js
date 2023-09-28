// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()
server.use(express.json())

// post
server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio){
       res.status(400).json({
        message: "Please provide name and bio for the user"
       }) 
    } else {
        User.insert(user)
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error created user',
                err: err.message,
                stack: err.stack,
            })
        })
    }
})

//get
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
           res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack: err.stack,
            })
        })
})

//get/api/:id
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
           if (!user) {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist",
            })
           }
           res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting user',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})



// // delete
// server.delete('/api/users/:id', async (req, res) => {
//     const user = await(req.params.id)
//     if (user){
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({message: 'User not found'});
//     }
// });

// // put
// server.put('/api/users/:id', async (req, res) => {
//     const user = await update(req.params.id, req.body);
//     if(user){
//         res.status(200).json(user);
//     } else {
//         res.status(404).json({message: 'User not found'});
//     }
// });

module.exports = server; //exporting server. 
