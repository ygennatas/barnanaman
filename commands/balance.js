const { currency } = require('../index.js');

module.exports = {
	name: 'balance',
	description: 'show user balance',
	execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)} :moneybag:`);
	},
};