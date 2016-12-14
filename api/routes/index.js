var express = require('express');
var router = express.Router();
var ctrlPottery = require('../controllers/pottery');

router.get('/pottery', ctrlPottery.potteryList);
router.post('/pottery', ctrlPottery.potteryCreate);
router.get('/pottery/:potteryid', ctrlPottery.potteryReadOne);

module.exports = router;
