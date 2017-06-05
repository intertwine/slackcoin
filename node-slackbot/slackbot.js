/* bot.js - Runner script for coinbot */
'use strict';

require('dotenv').config();
const debug = require('debug')('app');
const Bot   = require('slackbots');

const slackToken = process.env.SLACK_BOT_API_TOKEN || 'MY_API_TOKEN';
const botName    = process.env.SLACK_BOT_NAME || 'CoinBot';

const slackBot = new Bot({
	token: slackToken,
	name : botName
});

const _onBotStartup = function() {
	debug('CoinBot startup.');
	slackBot.getUsers().then(function(users) {
		debug('Got users: %o', users);
	})
};

const  _onBotMessage = function (message) {
	debug('CoinBot message: %o', message);
	// validate message
	// run command
};

slackBot.on('start',  _onBotStartup);
slackBot.on('message', _onBotMessage);
