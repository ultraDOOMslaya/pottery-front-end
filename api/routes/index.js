var express = require('express');
var router = express.Router();
var ctrlPottery = require('../controllers/pottery');
var ctrlEvents = require('../controllers/events');

router.get('/pottery', ctrlPottery.potteryList);
//router.post('/pottery', ctrlPottery.potteryCreate);
//router.get('/pottery/:potteryid', ctrlPottery.potteryReadOne);

router.get('/events', ctrlEvents.eventsList);
router.get('/events/:eventId', ctrlEvents.eventsReadOne);
module.exports = router;
