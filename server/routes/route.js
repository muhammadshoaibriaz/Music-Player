const express = require('express');
const router = express.Router();

const {SignUp, Welcome} = require('../controllers/controllers');

router.route('/').get(Welcome);
router.route('/api/v1/signup').post(SignUp);
module.exports = router;
