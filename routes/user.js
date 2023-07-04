const express = require('express')

const userController = require('../controllers/user')

const router = express.Router();

router.get('/get-users', userController.getUsers)

router.post('/add-user', userController.postUser)

router.delete('/delete-user/:userID', userController.deleteUser)

module.exports = router