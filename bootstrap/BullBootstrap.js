/**
 * BullBootstrap.js
 * Bootstrap module that setups the queue and worker
 */ 
const async = require('async');
module.exports = function (callback) {

	var Bull = require('bull');
	// create our job queue
	var queue = new Bull('queue',{redis:sails.config.bull.redis});
	sails.config.queue=queue;
	
	 // Repeat check for hung charging sessions  once every hour
	 _.forEach(sails.config.bull.repeats, function (task) {
        if (task.active) {
            queue.add(task.name, task.data, { repeat: task.repeat });
            sails.log.info(`registered bull repeatable job: ${task.name}`);
        }
	});

	queue.process('clean_completed_jobs', 1, function(job,done){
		BackgroundService.deleteBullTasks(1000, 'completed')
		done();
	})
	
	queue.process('surface_crawl_all_users', 1,function(job,done){
		BackgroundService.surfaceCrawl({}, function(err, result){
			done(err,result);
		});
	});

	queue.process('send_weekly_email_all_users', 1,function(job,done){
		BackgroundService.sendWeeklyEmails({}, function(err, result){
			done(err,result);
		});
	});

	queue.process('calculate_uam_all_users', 1, function(job, done){
		User.find({}).exec(function(err, users){
			async.eachLimit(users, 1, function(u, cb){
				var data = {
					title:'calculate_uam, user ='+u.id+', name='+u.name,
					options:{ // this is used
						user:u.id
					},
					info:{ // this is for readability
						user:u.id
					}
				}
				var promise = queue.add('calculate_uam', data);
				GeneralService.p2c(promise,cb);
			}, done);
		});
	});

	queue.process('calculate_uam', 1, function(job, done){
		BackgroundService.calculateUAM(job.data.options, function(err){
			done(err);
		});
	});

	queue.process('surface_crawl',1,function(job,done){
		GmailService.getMessagesAndProcessEach(job.data.options,function(err,result){
			// if(err) // uncomment for debugging when the kue has errors
			// 	throw err;
			done(err,result);
		});
	});

	queue.process('send_email_report',1,function(job,done){
		NotificationService.sendEmailReport(job.data.options,function(err,result){
			// if(err) // uncomment for debugging when the kue has errors
			// 	throw err;
			done(err,result);
		})
	});


	queue.process('afterCreate_sli',1,function(job,done){
		CashflowyService.afterCreate_SLI(job.data,function(err,result){
		// CashflowyService.afterCreate_SLI(job.data.sli,function(err,result){
			// if(err) // uncomment for debugging when the kue has errors
			// 	throw err;
			done(err,result);
		})
	});
	
	
	// console.log('\n\n\n\n ******** bull setup ********');
	callback(null);
}