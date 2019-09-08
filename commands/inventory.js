module.exports = {
	name: 'inventory',
	description: 'show user inventory',
	execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		const user = Users.findOne({ where: { user_id: target.id } });
		const items = user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${item.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};