module.exports = {
	name: 'transfer',
	description: 'transfer currency to another user',
	execute(message, args) {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, I can't transfer that.`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you are too poor.`);
		if (transferAmount <= 0) return message.channel.send(`You can't transfer 0 :moneybag: ${message.author}.`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount} :moneybag: to ${transferTarget.tag}. Your now have ${currency.getBalance(message.author.id)} :moneybag:`);
	},
};