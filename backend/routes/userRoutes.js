const express = require('express');
const {signupUser, loginUser, logoutUser, getAllUsers} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser)

module.exports = router;