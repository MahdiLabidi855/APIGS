const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/productController');

router.get('/', auth, controller.getAll);
router.post('/', auth, controller.create);

module.exports = router;