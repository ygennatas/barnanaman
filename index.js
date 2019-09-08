// required files and collections
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// link to database
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();

// helper methods for database
Reflect.defineProperty(currency, 'add', {
    value: async function add(id, amount) {
        const user = currency.get(id);
        if (user) {
            user.balance += Number(amount);
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, balance: amount });
        currency.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(currency, 'getBalance', {
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance: 0;
    },
});

// handle commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    // sync database
    const storedBalances = Users.findAll();
    Array.prototype.forEach.call(storedBalances, b => currency.set(b.user_id, b));
    console.log('Ready to party!');
    //message.channel.send('Ready to party!');
});

// login to Discord with your app's token
// this event can trigger several times
client.on('message', message => {
    // add currency to users when they write
    if (message.author.bot) return;
    currency.add(message.author.id, 1);

    // set up command and arguments
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)){
        message.reply('I did not understand that over the music!');
        return;
    }

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Sorry but they seemed to be an error in your order!');
    }

});

client.login(token);