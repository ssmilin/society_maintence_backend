const mongoose = require('mongoose');


const Subscriptiondetails = new mongoose.Schema({
    subscriberName: {type:String, default:''},
    amount: {type:Number, default:0},
    remarks:{type:String, default:''},
    created:{ type: Date, default: Date.now },
    lastupdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SubscriptionDetails', Subscriptiondetails);