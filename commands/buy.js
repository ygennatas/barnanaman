module.exports = {
	name: 'buy',
	description: 'buy an item',
	execute(message, args) {
		const item = CurrencyShop.findOne({ where: { name: { [Op.like]: args } } });
		if (!item) return message.channel.send(`I don't have that in stock.`);
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You only have ${currency.getBalance(message.author.id)} and the ${item.name} costs ${item.cost}!`);
		}

		const user = Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		user.addItem(item);

		message.channel.send(`You've bought: ${item.name}. Enjoy your drink!`);
	},
};