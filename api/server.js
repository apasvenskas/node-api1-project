// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

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
    User.find(req.params.id)
        .then(users => {
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

// // post
// server.post('/api/users', async (req, res) => {
//     const user = await insert(req.body);
//     res.status(201).json(user);
// })

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
