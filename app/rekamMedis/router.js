var express = require('express');
var router = express.Router();
const {index, viewCreate, actionCreate, viewSingle, viewEdit,actionEdit} = require('./controller')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin);
/* GET home page. */
router.get('/', index);
router.get('/create',viewCreate);
router.get('/view/:id',viewSingle);
router.get('/edit/:id',viewEdit);
router.post('/create',actionCreate);
router.put('/edit/:id',actionEdit);
module.exports = router;
