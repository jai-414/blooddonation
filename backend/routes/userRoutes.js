const express = require('express');
const router = express.Router();
const { registerUser, loginUser, searchDonors } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', searchDonors);

module.exports = router;
