const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.get('/me', auth, controller.getProfile);
router.put('/update', auth, controller.updateProfile);

module.exports = router;