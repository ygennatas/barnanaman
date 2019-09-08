module.exports = {
	name: 'shop',
	description: 'display the shop',
	execute(message, args) {
		const items = CurrencyShop.findAll();
		return message.channel.send(items.map(item => `${item.name}: ${item.cost} :moneybag:`).join('\n'), { code: true });
	},
};