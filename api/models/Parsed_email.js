/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var async = require('async');

module.exports = {

	attributes: {
		extracted_data: {
			type: 'json',
			required: true,
		},
		email:{
			type:'text',
		},
		user: {
			model: 'user',
			required: true
		},
		type: {
			type: 'text',
			required: true,
			// enum:[
			// 	'credit_card_alert','credit_card_statement','bank_transaction_alert','bank_statement'
			// ]
		},
		body_parser_used:{
			type:'text',

		},
		message_id:{
			type:'text',
			required:true,
			unique:true,
		},
		transaction:{ // the accociated transaction
			model:'transaction',
			// required is true, but when initially created, it is created without a ref to transaction.
		}
	},
	afterCreate: function(pe, cb) {

		// find or create transaction
		// update accociated transaction on this this table
		// console.log('parsed_email after create #1');
		async.auto({
			getAccount:function(callback){
				// console.log('parsed_email after create #2');
				var filter ={}
				if(pe.type=='IciciCreditCardTransactionAlertFilter'|| pe.type=='IciciCreditCardRefundFilter'){
					filter = {
						acc_number:pe.extracted_data.credit_card_last_4_digits
					};
				}else if(pe.type=='IciciInternetBankingFilter' || pe.type=='IciciDebitCardFilter'){
					filter = {
						like:{
							acc_number:'%'+pe.extracted_data.account_last_4_digits,
						}
					}
				}
				Account.findOne(filter).exec(callback);
			},	
			findOrCreateTransaction:['getAccount',function(results,callback){
				// console.log('parsed_email after create #3');
				const fx = require('money');
				fx.base='INR';
				fx.rates={
					'EUR':0.0125660,
					'USD':0.0146289,
					'MYR':0.0595751,
					'IDR':211.557,
					'INR':1,
					'CZK':0.320764,
					'HUF':4.03376,

				}
				var findFilter={
					createdBy:'user',
					original_currency:pe.extracted_data.currency,
					original_amount:pe.extracted_data.amount,
					// needs a bit more filtering
				};
				var t={
					original_currency:pe.extracted_data.currency,
					createdBy:'parsed_email',
					type:'income_expense',
					account:results.getAccount.id,
					third_party:pe.extracted_data.whom_you_paid?pe.extracted_data.whom_you_paid:pe.extracted_data.third_party,
				}
				if(pe.type=='IciciCreditCardRefundFilter')
					t.original_amount=pe.extracted_data.amount; // this is an income, so positive
				else 
					t.original_amount=-(pe.extracted_data.amount); // this in an expense, so negative
				t.amount_inr=fx.convert(t.original_amount, {from: pe.extracted_data.currency, to: "INR"});
				
				if(pe.extracted_data.date && pe.extracted_data.time){
					t.occuredAt= new Date(pe.extracted_data.date+' '+pe.extracted_data.time+'+5:30');
					if(t.occuredAt=='Invalid Date')
						t.occuredAt=pe.extracted_data.email_received_time;
				}
				else
					t.occuredAt=pe.extracted_data.email_received_time;

				// console.log('\n\n\nbefore transaction find or create');

				Transaction.create(t).exec(function(err,result){
					if(err){
						console.log('Attempt to create a transaction failed');
						console.log('transaction:')
						console.log(t);
						console.log('extracted_data');
						console.log(pe.extracted_data);
					}
					callback(err,result);

				});
				
			}],
			updateParsedEmail:['findOrCreateTransaction',function(results,callback){
				// console.log('update parsed email');
				Parsed_email.update({id:pe.id},{transaction:results.findOrCreateTransaction.id}).exec(callback);
			}],
			createSnapshotIfPossible:['getAccount',function(results,callback){
				// console.log('create snapshot');
				if(pe.extracted_data.balance_currency && pe.extracted_data.balance_amount){
					var ss={
						account:results.getAccount.id,
						createdBy:'parsed_email',
						takenAt: new Date(pe.extracted_data.date+' '+pe.extracted_data.time+'+5:30'),
						balance_currency:pe.extracted_data.balance_currency,
						balance:pe.extracted_data.balance_amount,
					}
					if(pe.extracted_data.date && pe.extracted_data.time){
						ss.takenAt= new Date(pe.extracted_data.date+' '+pe.extracted_data.time+'+5:30');
						if(ss.takenAt=='Invalid Date')
							ss.takenAt=pe.extracted_data.email_received_time;
					}
					else
						ss.takenAt=pe.extracted_data.email_received_time;
					Snapshot.create(ss).exec(callback);
				}else{
					callback(null);
				}
			}]
		},cb)

		// Transaction.findOrCreate({},)
	}
};

