const mongoose = require('mongoose');
const SubscriptionDetails = require('../model/subscriptiondetails');
const OtherIncomeDetails = require('../model/otherincomedetails');

const Incomedetails = new mongoose.Schema({
	subscriptiondetails: [SubscriptionDetails.schema], 
    otherincomedetails: [OtherIncomeDetails.schema],
    created:{ type: Date, default: Date.now },
    lastupdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Incomedetails', Incomedetails);