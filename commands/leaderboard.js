const { currency } = require('../index.js');

module.exports = {
	name: 'leaderboard',
	description: 'display the leaderboard',
	execute(message, args) {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance} :moneybag:`)
				.join('\n'),
			{ code: true }
		);		
	},
};