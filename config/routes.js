/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'MainController.landingPage',
  'GET /dashboard':'MainController.dashboard',
  'GET /debug':'MainController.debug',
  
  'GET /emails':'MainController.listEmails',
  'GET /email/create':'MainController.createEmail',
  'POST /email/create-manual':'MainController.createEmailManual',
  'GET /email/create-manual':'MainController.createEmailManual',
  'GET /oauth2callback':'MainController.oauth2callback',
  'GET /email/:id/edit':'MainController.editEmail',
  'POST /email/:id/edit':'MainController.editEmail',
  'GET /email/:id':'MainController.viewEmail',
  
  'GET /accounts':'MainController.listAccounts',
  'GET /account/create':'MainController.createAccount',
  'POST /account/create':'MainController.createAccount',
  'GET /account/:id':'MainController.viewAccount',
  'GET /account/:id/edit':'MainController.editAccount',
  'POST /account/:id/edit':'MainController.editAccount',
  // 'GET /account/:id/delete':'MainController.deleteAccount',
  // 'POST /account/:id/delete':'MainController.deleteAccount',

  
  'GET /transactions':'MainController.listTransactions',
  'GET /transaction/create':'MainController.createTransaction',
  'POST /transaction/create':'MainController.createTransaction',
  'GET /transaction/:id/edit':'MainController.editTransaction',
  'POST /transaction/:id/edit':'MainController.editTransaction',
  'PUT /transaction/:id':'MainController.putTransaction',
  'GET /transaction/:id/delete':'MainController.deleteTransaction',
  'POST /transaction/:id/delete':'MainController.deleteTransaction',


  'GET /snapshots':'MainController.listSnapshots',
  'GET /snapshot/create':'MainController.createSnapshot',
  'POST /snapshot/create':'MainController.createSnapshot',
  'GET /snapshot/:id/edit':'MainController.editSnapshot',
  'POST /snapshot/:id/edit':'MainController.editSnapshot',
  'GET /snapshot/:id/delete':'MainController.deleteSnapshot',
  'POST /snapshot/:id/delete':'MainController.deleteSnapshot',

  'GET /categories':'MainController.listCategories',
  'GET /category/create':'MainController.createCategory',
  'POST /category/create':'MainController.createCategory',
  'GET /category/:id':'MainController.viewCategory',
  'GET /category/:id/edit':'MainController.editCategory',
  'POST /category/:id/edit':'MainController.editCategory',
  'GET /category/:id/delete':'MainController.deleteCategory',
  'POST /category/:id/delete':'MainController.deleteCategory',

  'GET /tags':'MainController.listTags',
  'GET /tag/create':'MainController.createTag',
  'POST /tag/create':'MainController.createTag',
  'GET /tag/:id':'MainController.viewTag',
  'GET /tag/:id/edit':'MainController.editTag',
  'POST /tag/:id/edit':'MainController.editTag',


  'GET /rules':'MainController.listRules',
  'GET /rule/create':'MainController.createRule',
  'GET /rule/:id':'MainController.viewRule',
  'GET /rule/:id/edit':'MainController.editRule',
  'POST /rule/:id/edit':'MainController.editRule',
  'GET /rule/:id/delete':'MainController.deleteRule',
  'POST /rule/:id/delete':'MainController.deleteRule',

  'GET /documents':'MainController.listDocuments',
  'GET /document/create':'MainController.createDocument',
  'POST /document/create':'MainController.createDocument',
  'GET /document/:id':'MainController.viewDocument',
  'GET /document/:id/edit':'MainController.editDocument',
  'POST /document/:id/edit':'MainController.editDocument',
  'GET /document/:id/delete':'MainController.deleteDocument',
  'POST /document/:id/delete':'MainController.deleteDocument',
  

  'GET /pnls':'MainController.listPnLs',
  'GET /pnl/create':'MainController.createPnL',
  'POST /pnl/create':'MainController.createPnL',
  'GET /pnl/:id':'MainController.indexPnL',
  'GET /pnl/:id/view':'MainController.viewPnL',
  'GET /pnl/:id/edit':'MainController.editPnL',
  'POST /pnl/:id/edit':'MainController.editPnL',
  'GET /pnl/:id/delete':'MainController.deletePnL',
  'POST /pnl/:id/delete':'MainController.deletePnL',


  'GET /dt/:id':'MainController.viewDoubtfulTransaction',
  'POST /dt/:id/mark_as_unique':'MainController.markDTAsUnique', // api
  'POST /dt/:id/mark_as_duplicate_of/:orig_txn_id':'MainController.markDTAsDuplicate', // api


  'GET /rules':'MainController.listRules',
  // 'GET /rule/:id':'MainController.viewRule',
  'POST /rule/create':'MainController.createRule',
  'GET /rule/:id/edit':'MainController.editRule',
  'POST /rule/:id/edit':'MainController.editRule',
  'GET /rule/:id/delete':'MainController.deleteRule',
  'POST /rule/:id/delete':'MainController.deleteRule',
  
  
  '/test':'MainController.test',

  // api patterns needs rewrite later
  'POST /api/edit_desc':'MainController.editDescription',
  'POST /api/edit_tags':'MainController.editTags',

  'GET /email_test':'MainController.emailTest',
  'GET /uam_test':'MainController.testUAM',

  'GET /login': 'AuthController.login',
  'POST /login': 'AuthController.login',
  'GET /signup': 'AuthController.signup',
  'POST /signup': 'AuthController.signup',
  'GET /logout': 'AuthController.logout',
  'GET /forgot': 'AuthController.view_forgot',
  'POST /forgot': 'AuthController.forgot',
  'GET /reset': 'AuthController.view_reset',
  'POST /reset': 'AuthController.reset',


  'GET /background/deepCrawl':'Background.deepCrawl',
  'POST /background/surface_crawl':'Background.surfaceCrawl',
  'GET /background/test':'Background.test',
  'POST /background/send_weekly_emails':'Background.sendWeeklyEmails',
  'POST /background/send_monthly_emails':'Background.sendMonthlyEmails',
  'POST /background/calculate_uam':'Background.calculateUAM',
  'POST /background/delete_tasks':'Background.deleteTasks',

  'GET /bull':'BullController.index',
  'GET /bull/restartQueueConnection':'BullController.restartQueueConnection',
  'GET /bull/:state':'BullController.listItems',
  'POST /bull/retry':'BullController.retryJob',
  'POST /bull/delete':'BullController.deleteJob',
	'POST /bull/repeat/delete':'BullController.deleteRepeatJob',

  'GET /testBull':'MainController.testBull',



  'GET /curator/filter_test':'CuratorController.filterTest',
  'POST /curator/filter_test':'CuratorController.filterTest',

  //webhooks

  'POST /webhook/docparser':'WebhookController.docparser',
  'POST /webhook/mailgun-inbound-parser': 'WebhookController.mailgunInboudParser',


  'GET /privacy': { view: 'privacy' },
  'GET /terms':{view:'terms'}
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
