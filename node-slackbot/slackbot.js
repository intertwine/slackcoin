/* bot.js - Runner script for coinbot */
'use strict';

const CoinBot    = require('./lib/coinbot.js');
const slackToken = process.env.SLACK_BOT_API_TOKEN || 'MY_API_TOKEN';
const botName    = process.env.SLACK_BOT_NAME || 'CoinBot';

const bot = new CoinBot({
	token: slackToken,
	name : botName
});

bot.run();
