const express = require('express');
const {signupUser, loginUser, logoutUser, getAllUsers, editAccount} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/account', editAccount);


module.exports = router;