/**
 * Email.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var async = require('async');

module.exports = {

	attributes: {
		parsed_data: {
			type: 'json',
		},
		user: {
			model: 'user',
			required: true
		},
		parser_used: {
			type: 'text',
		},
		type:{
			type:'text'
		},
		description:{
			type:'text'
		},
		details: {
			type: 'json',
		},
		accounts:{
			collection:'account',
			via:'docs',
		},
		statement_line_items:{
			collection: 'statement_line_item',
			via: 'document'
		}
	}
};

