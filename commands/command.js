module.exports = {
	name: 'help',
	description: 'empty command',
	execute(message, args) {
		message.channel.send('txt example');
	},
};