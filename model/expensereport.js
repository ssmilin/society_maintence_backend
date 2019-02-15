
const mongoose = require('mongoose');
const Expensedetails = require('../model/expensedetails');
const Incomedetails = require('../model/incomedetails');

const ExpenseReport = new mongoose.Schema({
	month: {type:String, trim:true, default:''}, 
	expensedetails:[Expensedetails.schema],
	incomedetails: {type:Incomedetails.schema,  default:{}},
	totalincome: {type:Number, default:0},
    totalexpense: {type:Number, default:0},
    totalsubscription: {type:Number, default:0},
    subscriptionpaid: {type:Number, default:0},
    createdby: {type:String, default: 'ADMIN'},
    created:{ type: Date, default: Date.now },
    Lastupdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ExpenseReport', ExpenseReport);