/* Coinbot - A Slack Bot to analyze and pay Slack
* chat participants with Slackcoin.
* Code adapted from tutorial at:
* https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
*/
'use strict';
const debug  = require('debug')('app');
const util   = require('util');
const Bot    = require('slackbots');

const CoinBot = function Constructor(settings) {
	this.settings = settings;
	this.settings.name = this.settings.name || 'CoinBot';
};

util.inherits(CoinBot, Bot);

CoinBot.prototype._onBotStartup = function _onBotStartup() {
	debug('CoinBot startup.');
	// load user, etc..
};

CoinBot.prototype._onBotMessage = function _onBotMessage(message) {
	debug('CoinBot message: %o', message);
	// validate message
		// run command
};

CoinBot.prototype.run = function () {
	CoinBot.super_.call(this, this.settings);
	this.on('start',   this._onBotStartup);
	this.on('message', this._onBotMessage);
};

module.exports = CoinBot;
